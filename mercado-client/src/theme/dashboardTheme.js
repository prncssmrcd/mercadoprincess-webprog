import { createTheme } from '@mui/material/styles';

export const brand = {
  blush: '#ec4899',
  blushLight: '#fdf2f8',
  rose: '#be185d',
  cocoa: '#826a5f',
  ink: '#4c4038',
  muted: '#6c5d52',
  border: '#e5ddd3',
  surface: '#fbf7f4',
  cardShadow: '0 16px 32px rgba(130, 106, 95, 0.14)',
};

export const dashboardCardSx = {
  backgroundColor: '#fff',
  border: `1px solid ${brand.border}`,
  borderRadius: '18px',
  boxShadow: brand.cardShadow,
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 20px 36px rgba(130, 106, 95, 0.18)',
  },
};

export const dashboardPageTitleSx = {
  fontSize: { xs: 32, md: 40 },
  fontWeight: 800,
  color: brand.ink,
  letterSpacing: '-0.02em',
  lineHeight: 1.1,
  mb: 1,
};

export const dashboardSubtitleSx = {
  color: brand.muted,
  fontSize: 16,
  lineHeight: 1.6,
};

export const dashboardEyebrowSx = {
  fontSize: 11,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.28em',
  color: brand.rose,
  mb: 1,
};

export const dashboardTheme = createTheme({
  palette: {
    primary: {
      main: brand.cocoa,
      contrastText: '#fff',
    },
    secondary: {
      main: brand.blush,
    },
    text: {
      primary: brand.ink,
      secondary: brand.muted,
    },
    background: {
      default: brand.surface,
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: '"Inter", system-ui, "Segoe UI", Roboto, sans-serif',
    h4: { fontWeight: 800, color: brand.ink },
    h6: { fontWeight: 700, color: brand.ink },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
          textTransform: 'uppercase',
          letterSpacing: '0.18em',
          fontSize: 11,
          fontWeight: 700,
          padding: '10px 20px',
          boxShadow: 'none',
        },
        contained: {
          backgroundColor: brand.cocoa,
          '&:hover': {
            backgroundColor: '#6b5548',
          },
        },
        outlined: {
          borderWidth: 1,
          borderColor: brand.border,
          color: brand.ink,
          '&:hover': {
            borderColor: brand.rose,
            backgroundColor: brand.blushLight,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          ...dashboardCardSx,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          borderRadius: 9999,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '& fieldset': {
              borderColor: brand.border,
            },
            '&:hover fieldset': {
              borderColor: brand.cocoa,
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          border: `1px solid ${brand.border}`,
          borderRadius: 20,
          boxShadow: brand.cardShadow,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            backgroundColor: brand.blushLight,
            fontWeight: 800,
            color: brand.ink,
            borderBottom: `1px solid ${brand.border}`,
          },
        },
      },
    },
  },
});
