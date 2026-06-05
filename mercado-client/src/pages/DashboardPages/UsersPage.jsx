import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import {
  createUser,
  deleteUser as deactivateUser,
  fetchUsers,
  updateUser,
} from '../../services/UserService.js';
import {
  genders,
  labelize,
  loadUsers as loadSeedUsers,
  roles,
  statuses,
  userMatchesFilters,
} from '../../utils/adminUsers';

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  contactNumber: '',
  email: '',
  username: '',
  role: 'user',
  gender: 'female',
  isActive: true,
};

const normalizeUser = (user, index) => ({
  id: user._id || user.id || String(index + 1),
  _id: user._id || user.id || String(index + 1),
  firstName: String(user.firstName ?? '').trim(),
  lastName: String(user.lastName ?? '').trim(),
  age: String(user.age ?? '').trim(),
  contactNumber: String(user.contactNumber ?? '').trim(),
  email: String(user.email ?? '').trim().toLowerCase(),
  username: String(user.username ?? '').trim().toLowerCase(),
  role: roles.includes(String(user.role ?? user.type ?? '').trim().toLowerCase())
    ? String(user.role ?? user.type).trim().toLowerCase()
    : 'user',
  gender: genders.includes(String(user.gender ?? '').trim().toLowerCase())
    ? String(user.gender ?? '').trim().toLowerCase()
    : 'female',
  isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
});

const getUsersList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.users)) return data.users;
  return [];
};

const controlSx = {
  '& .MuiOutlinedInput-root': {
    height: 38,
    bgcolor: '#fff',
    borderRadius: 0.5,
  },
};

function UsersPage() {
  const [users, setUsers] = useState(loadSeedUsers());
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    gender: '',
    status: '',
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(blankForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const { data } = await fetchUsers();
      const nextUsers = getUsersList(data).map(normalizeUser);
      setUsers(nextUsers);
    } catch (loadError) {
      console.error('Error loading customers:', loadError);
      setError('Unable to load customers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(
    () => users.filter((user) => userMatchesFilters(user, filters)),
    [users, filters]
  );

  const updateFilter = (key) => (event) => {
    setFilters((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const openAddDialog = () => {
    setEditingId(null);
    setForm(blankForm);
    setError('');
    setDialogOpen(true);
  };

  const openEditDialog = (user) => {
    setEditingId(user.id);
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      contactNumber: user.contactNumber,
      email: user.email,
      username: user.username,
      role: user.role,
      gender: user.gender,
      isActive: user.isActive,
    });
    setError('');
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingId(null);
    setForm(blankForm);
    setError('');
  };

  const saveUser = async () => {
    if (!form.firstName?.trim() || !form.email?.trim() || !form.username?.trim()) {
      setError('First name, email, and username are required.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      if (editingId) {
        await updateUser(editingId, form);
      } else {
        await createUser({
          ...form,
          password: 'DefaultPass123!',
        });
      }

      await loadUsers();
      closeDialog();
    } catch (saveError) {
      console.error('Error saving customer:', saveError);
      setError(saveError.message || 'Unable to save customer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setLoading(true);
        setError('');
        await deactivateUser(id);
        await loadUsers();
      } catch (deleteError) {
        console.error('Error deleting customer:', deleteError);
        setError(deleteError.message || 'Unable to delete customer. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontFamily: 'Poppins, system-ui', fontSize: 40, fontWeight: 600, color: '#4c4038', letterSpacing: '-1px', mb: 1 }}>
          Customers
        </Typography>
        <Typography sx={{ color: '#6c5d52', fontSize: 16 }}>
          Review Mercado Princess users and account activity.
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={4}>
        <TextField
          placeholder="Search customers..."
          value={filters.search}
          onChange={updateFilter('search')}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <span style={{ color: '#6c5d52', fontWeight: 700 }}>Search</span>
              </InputAdornment>
            ),
          }}
          sx={controlSx}
        />
        <TextField select value={filters.role} onChange={updateFilter('role')} fullWidth sx={controlSx} SelectProps={{ displayEmpty: true }}>
          <MenuItem value="">Role</MenuItem>
          {roles.map((role) => (
            <MenuItem key={role} value={role}>{labelize(role)}</MenuItem>
          ))}
        </TextField>
        <TextField select value={filters.gender} onChange={updateFilter('gender')} fullWidth sx={controlSx} SelectProps={{ displayEmpty: true }}>
          <MenuItem value="">Gender</MenuItem>
          {genders.map((gender) => (
            <MenuItem key={gender} value={gender}>{labelize(gender)}</MenuItem>
          ))}
        </TextField>
        <TextField select value={filters.status} onChange={updateFilter('status')} fullWidth sx={controlSx} SelectProps={{ displayEmpty: true }}>
          <MenuItem value="">Status</MenuItem>
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>{labelize(status)}</MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          startIcon={<span aria-hidden="true">+</span>}
          onClick={openAddDialog}
          disabled={loading}
          sx={{ backgroundColor: '#826a5f', '&:hover': { backgroundColor: '#6b5548' } }}
        >
          Add User
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ borderRadius: 1 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#826a5f' }}>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>ID</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>First Name</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Last Name</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Email</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Username</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Role</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{labelize(user.role)}</TableCell>
                <TableCell>
                  <Chip
                    label={user.isActive ? 'Active' : 'Inactive'}
                    size="small"
                    color={user.isActive ? 'success' : 'error'}
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      size="small"
                      onClick={() => openEditDialog(user)}
                      sx={{ color: '#826a5f' }}
                      aria-label={`Edit ${user.firstName}`}
                    >
                      <span aria-hidden="true">Edit</span>
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => deleteUser(user.id)}
                      sx={{ color: '#b02a37' }}
                      aria-label={`Delete ${user.firstName}`}
                    >
                      <span aria-hidden="true">Delete</span>
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={closeDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: '#4c4038', fontWeight: 600 }}>
          {editingId ? 'Edit Customer' : 'Add New Customer'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="First Name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
            <TextField
              fullWidth
              label="Last Name"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <TextField
              fullWidth
              label="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <TextField
              fullWidth
              label="Age"
              type="number"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
            />
            <TextField
              fullWidth
              label="Contact Number"
              value={form.contactNumber}
              onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
            />
            <TextField select label="Role" fullWidth value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              {roles.map((role) => (
                <MenuItem key={role} value={role}>{labelize(role)}</MenuItem>
              ))}
            </TextField>
            <TextField select label="Gender" fullWidth value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
              {genders.map((gender) => (
                <MenuItem key={gender} value={gender}>{labelize(gender)}</MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={saveUser} disabled={loading} variant="contained" sx={{ backgroundColor: '#826a5f' }}>
            {editingId ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UsersPage;
