import { Link, Outlet } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

function DashLayout() {
  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: '#826a5f' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Poppins, system-ui', fontWeight: 600 }}>
            Mercado Princess Dashboard
          </Typography>
          <Button color="inherit" component={Link} to="/dashboard">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/dashboard/articles">
            Articles
          </Button>
          <Button color="inherit" component={Link} to="/dashboard/reports">
            Reports
          </Button>
          <Button color="inherit" component={Link} to="/dashboard/users">
            Users
          </Button>
          <Button color="inherit" component={Link} to="/auth/signin">
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
