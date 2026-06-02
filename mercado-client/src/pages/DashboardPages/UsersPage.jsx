import { useMemo, useState } from 'react';
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
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  genders,
  labelize,
  loadUsers,
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
  role: 'viewer',
  gender: 'female',
  isActive: true,
};

const controlSx = {
  '& .MuiOutlinedInput-root': {
    height: 38,
    bgcolor: '#fff',
    borderRadius: 0.5,
  },
};

function UsersPage() {
  const [users, setUsers] = useState(loadUsers());
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

  const saveUser = () => {
    if (!form.firstName?.trim() || !form.email?.trim() || !form.username?.trim()) {
      setError('First name, email, and username are required.');
      return;
    }

    if (editingId) {
      const userIndex = users.findIndex((u) => u.id === editingId);
      if (userIndex >= 0) {
        const updated = [...users];
        updated[userIndex] = { ...updated[userIndex], ...form };
        setUsers(updated);
      }
    } else {
      const newUser = {
        id: Math.max(...users.map((u) => u.id), 0) + 1,
        ...form,
        password: 'DefaultPass123!',
      };
      setUsers([...users, newUser]);
    }
    closeDialog();
  };

  const deleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((u) => u.id !== id));
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

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={4}>
        <TextField
          placeholder="Search customers..."
          value={filters.search}
          onChange={updateFilter('search')}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#6c5d52' }} />
              </InputAdornment>
            ),
          }}
          sx={controlSx}
        />
        <TextField select value={filters.role} onChange={updateFilter('role')} fullWidth sx={controlSx} displayEmpty>
          <MenuItem value="">Role</MenuItem>
          {roles.map((role) => (
            <MenuItem key={role} value={role}>{labelize(role)}</MenuItem>
          ))}
        </TextField>
        <TextField select value={filters.gender} onChange={updateFilter('gender')} fullWidth sx={controlSx} displayEmpty>
          <MenuItem value="">Gender</MenuItem>
          {genders.map((gender) => (
            <MenuItem key={gender} value={gender}>{labelize(gender)}</MenuItem>
          ))}
        </TextField>
        <TextField select value={filters.status} onChange={updateFilter('status')} fullWidth sx={controlSx} displayEmpty>
          <MenuItem value="">Status</MenuItem>
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>{labelize(status)}</MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openAddDialog}
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
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => deleteUser(user.id)}
                      sx={{ color: '#b02a37' }}
                    >
                      <DeleteIcon fontSize="small" />
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
          <Button onClick={saveUser} variant="contained" sx={{ backgroundColor: '#826a5f' }}>
            {editingId ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UsersPage;
