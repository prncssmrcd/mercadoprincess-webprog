import { Box, Card, CardContent, Stack, Typography, LinearProgress } from '@mui/material';

function DashboardPage() {
  const stats = [
    { label: 'Total Customers', value: 1248, growth: '+12%', color: '#826a5f' },
    { label: 'Active Sessions', value: 384, growth: '+8%', color: '#826a5f' },
    { label: 'Articles Published', value: 156, growth: '+24%', color: '#826a5f' },
    { label: 'Monthly Growth', value: '+18%', growth: 'Excellent', color: '#826a5f' },
  ];

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontFamily: 'Poppins, system-ui',
            fontSize: 40,
            fontWeight: 600,
            color: '#4c4038',
            letterSpacing: '-1px',
            mb: 1,
          }}
        >
          Dashboard
        </Typography>
        <Typography sx={{ color: '#6c5d52', fontSize: 16 }}>
          Welcome back! Here's your Mercado Princess overview.
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mb={4}>
        {stats.map((stat) => (
          <Card
            key={stat.label}
            sx={{
              flex: 1,
              backgroundColor: '#fff',
              border: '1px solid #e5ddd3',
              boxShadow: 'rgba(0, 0, 0, 0.1) 0 10px 15px -3px',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 'rgba(130, 106, 95, 0.15) 0 20px 25px -5px',
              },
            }}
          >
            <CardContent>
              <Typography
                sx={{
                  color: '#6c5d52',
                  fontSize: 13,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  mb: 1,
                }}
              >
                {stat.label}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
                <Typography
                  sx={{
                    fontFamily: 'Poppins, system-ui',
                    fontSize: 32,
                    fontWeight: 600,
                    color: '#4c4038',
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography sx={{ color: stat.color, fontSize: 14, fontWeight: 600 }}>
                  {stat.growth}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={75}
                sx={{
                  height: 4,
                  borderRadius: 2,
                  backgroundColor: '#e5ddd3',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#826a5f',
                  },
                }}
              />
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Welcome Card */}
      <Card sx={{ backgroundColor: '#f5f1ed', border: '1px solid #e5ddd3' }}>
        <CardContent>
          <Typography sx={{ fontSize: 18, fontWeight: 600, color: '#4c4038', mb: 2 }}>
            Getting Started
          </Typography>
          <Typography sx={{ color: '#6c5d52', lineHeight: 1.6 }}>
            Manage your articles, track customer engagement, and monitor business performance from this dashboard.
            Use the navigation menu to access articles management, detailed reports, and customer database.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DashboardPage;
