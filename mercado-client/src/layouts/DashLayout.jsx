import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material';

const dashboardNavItems = [
  { label: 'Home', path: '/dashboard', roles: ['admin', 'editor', 'user'] },
  { label: 'Articles', path: '/dashboard/articles', roles: ['admin', 'editor'] },
  { label: 'Reports', path: '/dashboard/reports', roles: ['admin', 'editor', 'user'] },
  { label: 'Users', path: '/dashboard/users', roles: ['admin'] },
];

function DashLayout() {
  const navigate = useNavigate();
  const firstName = localStorage.getItem('firstName');
  const role = localStorage.getItem('type');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    localStorage.removeItem('type');
    navigate('/auth/signin');
  };

  const visibleNavItems = dashboardNavItems.filter((item) =>
    role ? item.roles.includes(role) : false,
  );

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: '#826a5f' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Poppins, system-ui', fontWeight: 600 }}>
            Mercado Princess Dashboard
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            {visibleNavItems.map((item) => (
              <Button key={item.path} color="inherit" component={Link} to={item.path}>
                {item.label}
              </Button>
            ))}
            {firstName && (
              <Typography variant="body2" sx={{ px: 1, fontWeight: 600 }}>
                {firstName}
              </Typography>
            )}
          </Stack>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashLayout;
