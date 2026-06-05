import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Chip,
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
  genders,
  labelize,
  loadUsers,
  roles,
  statuses,
  userMatchesFilters,
} from '../../utils/adminUsers';

const allUsers = loadUsers();

const controlSx = {
  '& .MuiOutlinedInput-root': {
    height: 38,
    bgcolor: '#fff',
    borderRadius: 0.5,
  },
};

function ReportsPage() {
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    gender: '',
    status: '',
  });
  
  // Mercado Princess Dashboard - Reports Management

  const filteredUsers = useMemo(
    () => allUsers.filter((user) => userMatchesFilters(user, filters)),
    [filters]
  );

  const updateFilter = (key) => (event) => {
    setFilters((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box sx={{ maxWidth: 1280, mx: 'auto' }} id="reports-content">
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: 32, fontWeight: 800, color: '#4c4038', mb: 0.5 }}>
          Reports Dashboard
        </Typography>
        <Typography sx={{ color: '#6c5d52', fontSize: 15 }}>
          View and manage customer reports with advanced search and filtering
        </Typography>
      </Box>

      <Stack direction="row" spacing={1.5} sx={{ mb: 2.5 }}>
        <Button
          variant="contained"
          startIcon={<span aria-hidden="true">Print</span>}
          onClick={handlePrint}
          sx={{ backgroundColor: '#826a5f' }}
        >
          Print Report
        </Button>
      </Stack>

      <Paper elevation={1} sx={{ p: 2.5, mb: 2.5, borderRadius: 1 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#4c4038', mb: 2 }}>
          Search & Filter
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5}>
          <TextField
            placeholder="Search by name, email, or username"
            value={filters.search}
            onChange={updateFilter('search')}
            fullWidth
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
        </Stack>
        <Typography sx={{ mt: 1.5, fontSize: 12, color: '#6c5d52' }}>
          Results: {filteredUsers.length} of {allUsers.length} customers
        </Typography>
      </Paper>

      <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 1 }}>
        <Table sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#826a5f' }}>
              {['ID', 'First Name', 'Last Name', 'Email', 'Username', 'Age', 'Contact', 'Role', 'Gender', 'Status'].map((header) => (
                <TableCell key={header} sx={{ color: '#fff', fontWeight: 700 }}>
                  {header}
                </TableCell>
              ))}
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
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.contactNumber}</TableCell>
                <TableCell>{labelize(user.role)}</TableCell>
                <TableCell>{labelize(user.gender)}</TableCell>
                <TableCell>
                  <Chip
                    label={user.isActive ? 'active' : 'inactive'}
                    size="small"
                    color={user.isActive ? 'success' : 'error'}
                    sx={{ color: '#fff', fontWeight: 700, textTransform: 'lowercase' }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ReportsPage;
