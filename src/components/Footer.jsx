// import React from 'react';
// import { Box, Container, Typography, Grid, Link as MuiLink } from '@mui/material';
// import { Link } from 'react-router-dom'; // <-- FIX: Import Link component

// const Footer = () => (
//     <Box 
//         component="footer" 
//         sx={{ 
//             py: 6, 
//             backgroundColor: '#333333', 
//             color: 'white', 
//             borderTop: '5px solid',
//             borderColor: 'secondary.main',
//         }}
//     >
//         <Container maxWidth="xl">
//             <Grid container spacing={4}>
//                 <Grid item xs={12} sm={4}>
//                     <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
//                         ZIRVANAA
//                     </Typography>
//                     <Typography variant="body2">
//                         Modern marketplace — fast shipping, easy returns.
//                     </Typography>
//                 </Grid>
//                 <Grid item xs={6} sm={2}>
//                     <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>About</Typography>
//                     <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//                         {/* FIX APPLIED HERE: MuiLink uses the imported Link component */}
//                         <MuiLink component={Link} to="/about" color="inherit" variant="body2">About Us</MuiLink>
//                         <MuiLink component={Link} to="/terms" color="inherit" variant="body2">Terms</MuiLink>
//                         <MuiLink component={Link} to="/privacy" color="inherit" variant="body2">Privacy</MuiLink>
//                     </Box>
//                 </Grid>
//                 <Grid item xs={6} sm={2}>
//                     <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Support</Typography>
//                     <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//                         <MuiLink href="#" color="inherit" variant="body2">Help Center</MuiLink>
//                         <MuiLink href="#" color="inherit" variant="body2">Contact Us</MuiLink>
//                     </Box>
//                 </Grid>
//                 <Grid item xs={12} sm={4}>
//                     <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Stay Updated</Typography>
//                     <Typography variant="body2">
//                         Subscribe to offers and new arrivals.
//                     </Typography>
//                 </Grid>
//             </Grid>
//             <Box sx={{ textAlign: 'center', mt: 4, pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
//                 <Typography variant="caption">&copy; {new Date().getFullYear()} Zirvanaa Store. All rights reserved.</Typography>
//             </Box>
//         </Container>
//     </Box>
// );

// export default Footer;
















// src/components/Footer.jsx
import React from 'react';
import { Box, Container, Typography, Grid, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles'; // Import useTheme

const Footer = () => {
    const theme = useTheme(); // Access the theme

    return (
        <Box
            component="footer"
            sx={{
                py: { xs: 4, sm: 6 }, // Adjusted padding
                // Use a slightly more opaque dark background than paper for solidity
                backgroundColor: 'rgba(10, 25, 41, 0.95)',
                color: theme.palette.text.secondary, // Default text is secondary grey
                borderTop: '4px solid',
                borderColor: theme.palette.secondary.main, // Gold border
                flexShrink: 0 // Prevent footer from shrinking
            }}
        >
            <Container maxWidth="xl">
                <Grid container spacing={4} justifyContent="space-between">
                    {/* Brand Info */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: theme.palette.secondary.main /* Gold */ }}>
                            ZIRVANAA
                        </Typography>
                        <Typography variant="body2" sx={{ pr: 2 }}>
                            Your one-stop online destination for quality products, seamless shopping, and exceptional service. 
                        </Typography>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={6} sm={3} md={2}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 1 }}>
                            Quick Links
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <MuiLink component={Link} to="/products" color="inherit" variant="body2" sx={{ '&:hover': { color: theme.palette.primary.light } }}>Shop</MuiLink>
                            <MuiLink component={Link} to="/orders" color="inherit" variant="body2" sx={{ '&:hover': { color: theme.palette.primary.light } }}>My Orders</MuiLink>
                            <MuiLink component={Link} to="/vouchers" color="inherit" variant="body2" sx={{ '&:hover': { color: theme.palette.primary.light } }}>My Vouchers</MuiLink>
                        </Box>
                    </Grid>

                    {/* Company Info */}
                    <Grid item xs={6} sm={3} md={2}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 1 }}>
                            Company
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <MuiLink component={Link} to="/about" color="inherit" variant="body2" sx={{ '&:hover': { color: theme.palette.primary.light } }}>About Us</MuiLink>
                            <MuiLink component={Link} to="/terms" color="inherit" variant="body2" sx={{ '&:hover': { color: theme.palette.primary.light } }}>Terms</MuiLink>
                            <MuiLink component={Link} to="/privacy" color="inherit" variant="body2" sx={{ '&:hover': { color: theme.palette.primary.light } }}>Privacy</MuiLink>
                        </Box>
                    </Grid>

                     {/* Placeholder for Contact/Social */}
                     <Grid item xs={12} sm={6} md={3}>
                         <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 1 }}>
                             Connect With Us
                         </Typography>
                         <Typography variant="body2">
                             Follow us on social media for updates.
                         </Typography>
                         {/* Add Social Icons/Contact Info here */}
                     </Grid>

                </Grid>
                <Box sx={{ textAlign: 'center', mt: 4, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <Typography variant="caption">&copy; {new Date().getFullYear()} Zirvanaa. All rights reserved.</Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer;