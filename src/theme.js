// import { createTheme } from '@mui/material/styles';

// const primaryColor = '#667eea'; // Vibrant Blue/Purple
// const secondaryColor = '#ff6b6b'; // Red/Coral Accent

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: primaryColor,
//     },
//     secondary: {
//       main: secondaryColor,
//     },
//     background: {
//       default: '#f7f9fc', 
//       paper: '#ffffff',
//     },
//   },
  
//   typography: {
//     fontFamily: ['Poppins', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
    
//     // **CRITICAL FIX for Minified React error #130 / fontWeightBold issue:**
//     fontWeightLight: 300,
//     fontWeightRegular: 400,
//     fontWeightMedium: 600,
//     fontWeightBold: 700, 

//     h3: { fontWeight: 800 },
//     h5: { fontWeight: 700 },
//     button: { fontWeight: 600, textTransform: 'none' }
//   },

//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: { borderRadius: 12 },
//       },
//     },
//     MuiCard: {
//       defaultProps: { elevation: 0 },
//       styleOverrides: {
//         root: { border: '1px solid rgba(0, 0, 0, 0.05)', borderRadius: 16 }
//       }
//     },
//   },
// });

// export default theme;








import { createTheme } from '@mui/material/styles';

// ZIRVANAA BRAND COLORS from the PDF
const theme = createTheme({
  palette: {
    primary: {
      main: '#00bfa5', // Vibrant Green/Teal Accent
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffab00', // Gold/Amber for highlights
      contrastText: '#000000',
    },
    background: {
      default: '#001f3f', // Deep Navy Blue (like the PDF background)
      paper: 'rgba(10, 25, 41, 0.7)', // Semi-transparent dark blue for cards
    },
    text: {
      primary: '#e0e0e0', // Light grey for primary text on dark backgrounds
      secondary: '#b0bec5', // Lighter grey for secondary text
    },
    action: {
      active: '#00bfa5', // Green for active icons/tabs
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          // Glassmorphism effect
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            color: '#b0bec5', // Lighter grey label
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#00bfa5', // Green on focus
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.23)', // Subtle border
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00bfa5', // Green border on focus
            },
          },
          '& .MuiInputBase-input': {
            color: '#e0e0e0', // Light input text
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
        },
        containedPrimary: {
            boxShadow: '0 4px 15px 0 rgba(0, 191, 165, 0.4)',
            '&:hover': {
                boxShadow: '0 6px 20px 0 rgba(0, 191, 165, 0.5)',
            }
        }
      },
    },
  },
});

export default theme;
