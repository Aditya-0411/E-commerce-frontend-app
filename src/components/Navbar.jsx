
// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Typography, Box, IconButton, Badge, Button,
  Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon,
  Divider, Avatar, Menu, MenuItem, Container
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
  AccountCircle,
  Logout as LogoutIcon,
  Policy as PolicyIcon, // Keep for Privacy
  Info as InfoIcon,
  Receipt as ReceiptIcon,
  ConfirmationNumber as ConfirmationNumberIcon,
  Storefront as StorefrontIcon,
  LocationOn as LocationOnIcon,
  Dashboard as DashboardIcon,
  Gavel as GavelIcon // Icon for Terms
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext"; // Verify path is correct
import api from '../utils/api'; // Verify path is correct

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  // Link definitions
  const mainLinks = [ { name: 'Shop', path: '/products', icon: <StorefrontIcon /> } ];

  // ✅ VERIFY THIS ARRAY IN YOUR CODE
  const profileDropdownLinks = [
      { name: 'My Orders', path: '/orders', icon: <ReceiptIcon fontSize="small" /> },
      { name: 'My Vouchers', path: '/vouchers', icon: <ConfirmationNumberIcon fontSize="small" /> },
      { name: 'Buy Voucher', path: '/vouchers/purchase', icon: <ConfirmationNumberIcon fontSize="small" /> },
      { name: 'Manage Addresses', path: '/addresses', icon: <LocationOnIcon fontSize="small" /> },
      { name: 'About Us', path: '/about', icon: <InfoIcon fontSize="small" /> },
      { name: 'Terms & Conditions', path: '/terms', icon: <GavelIcon fontSize="small" /> },
      { name: 'Privacy Policy', path: '/privacy', icon: <PolicyIcon fontSize="small" /> },
      { name: 'Refund Policy', path: '/refund', icon: <ReceiptIcon fontSize="small" /> },
      { name: 'Return Policy', path: '/return', icon: <ReceiptIcon fontSize="small" /> },
      { name: 'Shipping Policy', path: '/shipping', icon: <StorefrontIcon fontSize="small" /> },
  ];

  // Links for mobile drawer only (if any specific ones are needed)
  // Currently empty as Terms/Privacy are in profileDropdownLinks
  const mobileOnlyLinks = [];


  // useEffect for cart count (no changes needed)
  useEffect(() => {
    const fetchCartCount = async () => {
        if (isAuthenticated) {
            try {
                const res = await api.get("/catalog/cart/");
                const cnt = res.data?.items?.reduce((t, i) => t + (i.qty || 0), 0) || 0;
                setCartCount(cnt);
            } catch (error) {
                if (error.response?.status !== 404) {
                    console.error("Failed to fetch cart count:", error);
                }
                setCartCount(0);
            }
        } else {
            setCartCount(0);
        }
    };
    fetchCartCount();
  }, [isAuthenticated]);

  // Handlers (no changes needed)
  const handleLogout = () => { handleProfileMenuClose(); logout(); navigate('/login'); };
  const handleProfileMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);
  const handleDropdownLinkClick = (path) => { handleProfileMenuClose(); navigate(path); };
  const handleMobileLinkClick = (path) => { setMobileOpen(false); navigate(path); };
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <>
      <AppBar position="fixed" color="primary" elevation={1}>
        <Container maxWidth="xl">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>

            {/* Logo and Mobile Menu */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: {xs: 1, md: 2}, flexShrink: 0 }}>
              <IconButton color="inherit" sx={{ display: { md: 'none' }}} onClick={handleDrawerToggle}><MenuIcon/></IconButton>
              <Typography component={Link} to="/" variant="h6" sx={{ color: 'white', textDecoration: 'none', fontWeight: 800 }}>
                ZIRVANAA
              </Typography>
            </Box>

            {/* Center Box */}
            <Box sx={{ flex: 1, display: { xs: 'none', md: 'flex' } }} />

            {/* Icons and Auth */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
              {/* Shop Button */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                {mainLinks.map((link) => (
                    <Button key={link.name} component={Link} to={link.path} color="inherit" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                      {link.name}
                    </Button>
                ))}
              </Box>
              {/* Cart Icon */}
              <IconButton component={Link} to="/cart" color="inherit">
                 <Badge badgeContent={cartCount} color="error"><ShoppingCartIcon/></Badge>
              </IconButton>
              {/* Auth Buttons / Profile Menu */}
              {isAuthenticated ? (
                <>
                  <IconButton onClick={handleProfileMenuOpen} color="inherit" sx={{ ml: 1 }}>
                    <Avatar sx={{ bgcolor: theme.palette.secondary.main, width: 36, height: 36 }}>
                        {user?.username?.[0]?.toUpperCase() || <AccountCircle sx={{ color: 'white' }} />}
                    </Avatar>
                  </IconButton>
                  {/* ✅ VERIFY THIS MENU SECTION */}
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleProfileMenuClose}
                    sx={{ '& .MuiPaper-root': { borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' } }}
                    >
                     <MenuItem onClick={()=> handleDropdownLinkClick('/profile')}><ListItemIcon><AccountCircle fontSize="small" /></ListItemIcon>Profile</MenuItem>
                     {user?.seller_status === 'approved' && <MenuItem onClick={()=> handleDropdownLinkClick('/seller/dashboard')}><ListItemIcon><DashboardIcon fontSize="small" /></ListItemIcon>Seller Dashboard</MenuItem>}
                     <Divider sx={{ my: 0.5 }} />
                     {/* This loop MUST contain Terms and Privacy from the array above */}
                     {profileDropdownLinks.map((link) => <MenuItem key={link.name} onClick={() => handleDropdownLinkClick(link.path)}><ListItemIcon>{link.icon}</ListItemIcon>{link.name}</MenuItem>)}
                     <Divider sx={{ my: 0.5 }} />
                     <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}><ListItemIcon><LogoutIcon fontSize="small" color="error" /></ListItemIcon>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                 <> {/* Login/Signup Buttons */}
                    <Button component={Link} to="/login" color="inherit" sx={{ display: { xs: 'none', sm: 'inline-flex' }}}>Login</Button>
                    <Button component={Link} to="/signup" variant="contained" sx={{ bgcolor: theme.palette.secondary.main, color: 'white', ml: 1, display: { xs: 'none', sm: 'inline-flex' } }}>Sign Up</Button>
                 </>
              )}
            </Box>

          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
         <Box sx={{ width: 260 }} role="presentation">
            <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}><Typography variant="h6" sx={{ fontWeight: 700 }}>Menu</Typography></Box>
            <List>
                {/* ✅ Combined links for mobile (includes Terms/Privacy) */}
                {[...mainLinks, ...profileDropdownLinks].map((link) => (
                    <ListItem key={link.name} disablePadding>
                        <ListItemButton onClick={() => handleMobileLinkClick(link.path)}>
                            <ListItemIcon>{link.icon || <Box sx={{ width: 24 }}/>}</ListItemIcon>
                            <ListItemText primary={link.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <Divider sx={{ my: 1 }} />
                {isAuthenticated ? (
                    <>
                         {/* ✅ mobileOnlyLinks should be empty now if Terms/Privacy moved */}
                        {mobileOnlyLinks.map((link) => ( /* Render any remaining mobile-only links */
                             <ListItem key={link.name} disablePadding>
                                 <ListItemButton onClick={() => handleMobileLinkClick(link.path)}>
                                     <ListItemIcon>{link.icon}</ListItemIcon>
                                     <ListItemText primary={link.name} />
                                 </ListItemButton>
                             </ListItem>
                         ))}
                         {/* Conditionally add divider if mobileOnlyLinks has items */}
                         {mobileOnlyLinks.length > 0 && <Divider sx={{ my: 1 }} />}

                        <ListItem disablePadding>
                            <ListItemButton onClick={() => { handleDrawerToggle(); handleLogout(); }}>
                                <ListItemIcon><LogoutIcon color="error" /></ListItemIcon>
                                <ListItemText primary="Logout" sx={{ color: 'error.main' }} />
                            </ListItemButton>
                        </ListItem>
                    </>
                ) : (
                    <> {/* Login/Signup */}
                        <ListItem disablePadding><ListItemButton onClick={() => handleMobileLinkClick("/login")}><ListItemText primary="Login" /></ListItemButton></ListItem>
                        <ListItem disablePadding><ListItemButton onClick={() => handleMobileLinkClick("/signup")}><ListItemText primary="Sign Up" /></ListItemButton></ListItem>
                    </>
                )}
            </List>
         </Box>
      </Drawer>

      {/* Spacer */}
      <Toolbar />

    </>
  );
};

export default Navbar;