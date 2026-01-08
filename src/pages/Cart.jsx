// // // src/pages/Cart.jsx - Mobile & Desktop Responsive
// // import React, { useState, useEffect } from 'react';
// // import {
// //   Container, Typography, Box, CircularProgress, Paper,
// //   List, ListItem, Button, IconButton, TextField, Divider,
// //   Avatar, ListItemAvatar, ListItemText
// // } from '@mui/material';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import api from '../api';
// // import { useNavigate } from 'react-router-dom';

// // const Cart = () => {
// //   const [cart, setCart] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();

// //   const fetchCart = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await api.get('/catalog/cart/');
// //       setCart(response.data);
// //     } catch (err) {
// //       console.error('Failed to fetch cart:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchCart();
// //   }, []);

// //   const handleUpdateQty = async (itemId, newQty) => {
// //     const qty = parseInt(newQty) || 0;
// //     if (qty < 0) return;

// //     try {
// //       await api.patch('/catalog/cart/update-item/', { item_id: itemId, qty: qty });
// //       fetchCart();
// //     } catch (err) {
// //       alert(err.response?.data?.detail || 'Failed to update cart quantity.');
// //     }
// //   };

// //   const handleClearCart = async () => {
// //     if (window.confirm('Are you sure you want to clear your cart?')) {
// //       try {
// //         await api.post('/catalog/cart/clear/');
// //         fetchCart();
// //       } catch (err) {
// //         alert('Failed to clear cart.');
// //       }
// //     }
// //   };

// //   const handleProceedToCheckout = () => {
// //     navigate('/checkout');
// //   };

// //   if (loading) return (
// //     <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
// //       <CircularProgress />
// //     </Box>
// //   );

// //   if (!cart || cart.items?.length === 0) return (
// //     <Container sx={{ textAlign: 'center', mt: 4 }}>
// //       <Typography variant="h4" gutterBottom>Your Cart is Empty</Typography>
// //       <Button variant="contained" onClick={() => navigate('/products')}>Continue Shopping</Button>
// //     </Container>
// //   );

// //   // Pre-booking totals
// //   const hasPrebookItems = cart.is_preorder_cart; 
// //   const totalDueNow = cart.total_deposit_due || cart.grand_total;
// //   const totalFullPrice = cart.total_full_price || cart.grand_total;
// //   const remainingDue = cart.total_remaining_due || (totalFullPrice - totalDueNow);

// //   return (
// //     <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
// //       <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">Shopping Cart</Typography>
// //       <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
// //         <List>
// //           {cart.items.map((item) => (
// //             <ListItem
// //               key={item.id} divider
// //               sx={{
// //                 flexDirection: { xs: 'column', sm: 'row' },
// //                 alignItems: { xs: 'flex-start', sm: 'center' },
// //                 py: 1
// //               }}
// //             >
// //               <ListItemAvatar>
// //                 <Avatar
// //                   variant="rounded"
// //                   src={item.image}
// //                   sx={{ width: 50, height: 50, mr: { xs: 0, sm: 2 }, mb: { xs: 1, sm: 0 } }}
// //                 />
// //               </ListItemAvatar>
// //               <ListItemText
// //                 primary={<Typography variant="subtitle1">{item.product_title}</Typography>}
// //                 secondary={
// //                   item.product_is_preorder
// //                     ? `Deposit: ₹${item.preorder_deposit_snapshot} | Full Price: ₹${item.total_with_gst}`
// //                     : `Price: ₹${item.price_snapshot} (GST: ₹${item.gst_amount})`
// //                 }
// //                 sx={{ mb: { xs: 1, sm: 0 } }}
// //               />
// //               {!item.product_is_preorder && (
// //                 <TextField
// //                   type="number"
// //                   value={item.qty}
// //                   onChange={(e) => handleUpdateQty(item.id, e.target.value)}
// //                   size="small"
// //                   sx={{ width: 70, mb: { xs: 1, sm: 0 } }}
// //                   inputProps={{ min: 0 }}
// //                 />
// //               )}
// //               <IconButton
// //                 edge="end"
// //                 aria-label="delete"
// //                 onClick={() => handleUpdateQty(item.id, 0)}
// //                 color="error"
// //               >
// //                 <DeleteIcon />
// //               </IconButton>
// //             </ListItem>
// //           ))}
// //         </List>

// //         <Divider sx={{ my: 2 }} />

// //         <Box sx={{ p: 1, textAlign: 'right' }}>
// //           {hasPrebookItems && (
// //             <Box sx={{ mb: 1, borderBottom: '1px solid #eee', pb: 1 }}>
// //               <Typography variant="body1">Total Full Price (Gross): ₹{totalFullPrice}</Typography>
// //               <Typography variant="body1" color="error.main">Remaining Due Later: ₹{remainingDue}</Typography>
// //             </Box>
// //           )}
// //           <Typography variant="body1">Total (Ex. GST): ₹{cart.total}</Typography>
// //           <Typography variant="body1">Total GST: ₹{cart.total_gst}</Typography>
// //           <Typography variant="h6" fontWeight="bold" mt={1}>
// //             {hasPrebookItems ? 'DEPOSIT DUE NOW:' : 'GRAND TOTAL:'} ₹{totalDueNow}
// //           </Typography>
// //         </Box>

// //         <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'flex-end', gap: 2, mt: 2 }}>
// //           <Button variant="outlined" color="error" onClick={handleClearCart} fullWidth={true} sx={{ flex: { xs: 1, sm: 'auto' } }}>
// //             Clear Cart
// //           </Button>
// //           <Button
// //             variant="contained"
// //             size="large"
// //             onClick={handleProceedToCheckout}
// //             disabled={!cart.items?.length}
// //             fullWidth={true}
// //             sx={{ flex: { xs: 1, sm: 'auto' } }}
// //           >
// //             Proceed to Checkout
// //           </Button>
// //         </Box>
// //       </Paper>
// //     </Container>
// //   );
// // };

// // export default Cart;











// src/pages/Cart.jsx

import React, { useState, useEffect, useCallback } from 'react';
import {
    Container, Typography, Box, CircularProgress, Paper,
    List, ListItem, Button, IconButton, TextField, Divider,
    Avatar, ListItemAvatar, ListItemText, Alert, Grid, Tooltip,
    FormControl, InputLabel, Select, MenuItem // Added Select, MenuItem back
} from '@mui/material';
import {
    Delete as DeleteIcon,
    RemoveCircleOutline as RemoveIcon,
    AddCircleOutline as AddIcon,
    RemoveShoppingCart as ClearCartIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles'; // Added useTheme
import api from '../utils/api';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';

// Define the root URL of your server (without '/api')
// Ensure this matches your deployment (e.g., https://api.zirvanaa.com)
const SERVER_ROOT_URL = process.env.REACT_APP_SERVER_URL || 'https://api.zirvanaa.com';

// Helper function to process image URLs
const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }
    const correctedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${SERVER_ROOT_URL}${correctedPath}`;
};

// --- CartItem Sub-component ---
const CartItem = ({ item, onUpdateQty, onRemoveItem }) => {
    const [currentQty, setCurrentQty] = useState(item.qty);
    const theme = useTheme();

    useEffect(() => {
        setCurrentQty(item.qty);
    }, [item.qty]);

    const handleLocalQtyChange = (e) => {
        const value = e.target.value;
        if (value === '') {
            setCurrentQty('');
        } else {
            const numValue = parseInt(value);
            // Allow 0 temporarily, handle negative/NaN on blur
            if (!isNaN(numValue) && numValue >= 0) {
                // Optional: Add max stock check here if needed
                setCurrentQty(numValue);
            }
        }
    };

    const handleBlur = () => {
        const finalQty = (currentQty === '' || isNaN(parseInt(currentQty)) || parseInt(currentQty) < 0)
                         ? 0
                         : parseInt(currentQty);
        // Only trigger API call if the final valid quantity is different from the original
        if (finalQty !== item.qty) {
            onUpdateQty(item.id, finalQty);
        } else {
             // Reset visual state if user typed invalid then blurred without changing value
             setCurrentQty(item.qty);
        }
    };

    const handleIncrement = () => {
        const newQty = parseInt(currentQty || 0) + 1;
        // Optional: Add check against available stock here
        setCurrentQty(newQty);
        onUpdateQty(item.id, newQty); // Update API immediately on +/- click
    };

    const handleDecrement = () => {
        const newQty = Math.max(0, parseInt(currentQty || 0) - 1); // Prevent going below 0
        setCurrentQty(newQty);
        onUpdateQty(item.id, newQty); // Update API immediately on +/- click
    };

    const formatPrice = (price) => {
        if (price === null || price === undefined) return 'N/A';
        return new Intl.NumberFormat('en-IN', {
            style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 2,
        }).format(price);
    };

    return (
        <ListItem
            divider
            sx={{
                py: 2, px: { xs: 1, sm: 2 }, alignItems: 'flex-start', position: 'relative',
            }}
        >
            <ListItemAvatar sx={{ minWidth: 'auto', mr: 2, mt: 0.5 }}>
                <Avatar
                    variant="rounded"
                    // Use getImageUrl for the cart item image
                    src={getImageUrl(item.image)}
                    alt={item.product_title}
                    sx={{ width: {xs: 60, sm: 80}, height: {xs: 60, sm: 80} }}
                    imgProps={{ onError: (e) => { e.target.onerror = null; e.target.src="https://placehold.co/80x80/eee/ccc?text=Error"; } }} // Add fallback on error
                />
            </ListItemAvatar>

            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', mr: { xs: 0, sm: 2 } }}>
                <Typography variant="body1" fontWeight={600} component={RouterLink} to={`/products/${item.product_slug}`} sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: 'primary.main' }}}>
                    {item.product_title || 'Product Title Missing'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {item.product_is_preorder
                        ? `Deposit: ${formatPrice(item.preorder_deposit_snapshot)}`
                        : `Unit Price: ${formatPrice(item.price_snapshot)}`
                    }
                </Typography>

                {/* Quantity Controls */}
                {!item.product_is_preorder ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto', mb: { xs: 1, sm: 0 } }}>
                        <IconButton onClick={handleDecrement} size="small" disabled={currentQty <= 0}>
                            <RemoveIcon fontSize="small" />
                        </IconButton>
                        <TextField
                            type="number" // Use number for native controls on mobile
                            value={currentQty}
                            onChange={handleLocalQtyChange}
                            onBlur={handleBlur}
                            size="small"
                            sx={{ width: 60, mx: 0.5, '& input': { textAlign: 'center', p: '8px' } }} // Adjust padding
                            inputProps={{ min: 0, 'aria-label': 'Item quantity', style: { MozAppearance: 'textfield' } }} // Hide spinners in Firefox
                            // Hide spinners in Chrome, Safari, Edge
                             InputProps={{ sx: { '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': { WebkitAppearance: 'none', margin: 0 } } }}
                        />
                        <IconButton onClick={handleIncrement} size="small">
                             {/* Add disabled logic based on stock if needed: disabled={currentQty >= item.product_stock} */}
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </Box>
                ) : (
                     <Typography variant="body2" color="text.secondary">Qty: {item.qty} (Pre-order)</Typography>
                )}
            </Box>

            {/* Price and Delete */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'row', sm: 'column' }, alignItems: { xs: 'center', sm: 'flex-end' }, mt: { xs: 1, sm: 0.5 }, ml: { xs: 0, sm: 'auto' }, minWidth: 90 }}>
                 <Typography variant="body1" fontWeight={600} sx={{ mb: { xs: 0, sm: 1 }, mr: { xs: 1, sm: 0 } }}>
                    {formatPrice(item.total_with_deposit || item.total_with_gst)}
                 </Typography>
                 <Tooltip title="Remove Item">
                    <IconButton edge="end" aria-label="delete" onClick={() => onRemoveItem(item.id)} color="error" size="small" >
                        <DeleteIcon fontSize="small"/>
                    </IconButton>
                 </Tooltip>
            </Box>
        </ListItem>
    );
};
// --- End CartItem ---


// --- Main Cart Component ---
const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(''); // Use empty string for Select
    // const [showAddressForm, setShowAddressForm] = useState(false); // Removed inline form logic
    const navigate = useNavigate();
    const theme = useTheme();

    const formatPrice = (price) => { /* ... same as in CartItem ... */ };

    // Fetch addresses using the CORRECT endpoint
    const fetchAddresses = useCallback(async () => {
        try {
            const res = await api.get('/catalog/addresses/'); // Correct endpoint
            const fetchedAddresses = res.data.results || res.data || [];
            setAddresses(fetchedAddresses);
            if (fetchedAddresses.length > 0) {
                const defaultAddr = fetchedAddresses.find(a => a.is_default) || fetchedAddresses[0];
                setSelectedAddress(String(defaultAddr.id));
            } else {
                setSelectedAddress('');
            }
        } catch (err) {
            console.error('Failed to fetch addresses:', err);
             if (err.response?.status === 404) {
                 toast.error('Address endpoint not found. Using fallback.'); // Inform user if 404
             } else {
                 toast.error('Failed to load addresses.');
             }
            setAddresses([]);
            setSelectedAddress('');
        }
    }, []);

    // Fetch cart
    const fetchCart = useCallback(async () => {
        // No setLoading(true) here if using optimistic updates primarily
        try {
            const res = await api.get('/catalog/cart/');
            setCart(res.data);
        } catch (err) {
            console.error('Failed to fetch cart:', err);
             if (err.response?.status === 404) {
                 setCart({ items: [], total: 0, total_gst: 0, grand_total: 0 }); // Set empty cart on 404
             } else {
                 toast.error('Failed to load cart data.');
                 setCart(null); // Indicate load error
             }
        } finally {
            setLoading(false); // Only set loading false after first fetch or on error
        }
    }, []);

    // Initial Data Load
    useEffect(() => {
        setLoading(true); // Set loading true on initial mount
        Promise.all([fetchCart(), fetchAddresses()])
            .catch(() => { /* Errors handled in individual fetches */})
            .finally(() => setLoading(false)); // Ensure loading stops even if one fails initially
    }, [fetchCart, fetchAddresses]);

    // --- Cart Action Handlers ---
    const handleUpdateQty = async (itemId, newQty) => {
        const qty = parseInt(newQty);
        if (isNaN(qty) || qty < 0) return;

        // Find current item for optimistic update
        const currentItem = cart?.items.find(item => item.id === itemId);
        const originalQty = currentItem?.qty;

        // Optimistic UI update
        setCart(prevCart => {
            if (!prevCart) return null;
            const updatedItems = prevCart.items
                .map(item => item.id === itemId ? { ...item, qty: qty } : item)
                .filter(item => item.qty > 0); // Remove if qty becomes 0

            // Rough recalculation (backend is source of truth) - optional
            // let newTotal = updatedItems.reduce((sum, i) => sum + (i.price_snapshot * i.qty), 0);
            // let newGst = updatedItems.reduce((sum, i) => sum + (i.gst_amount * i.qty), 0);

            return {
                ...prevCart,
                items: updatedItems,
                // grand_total: newTotal + newGst // Update if doing optimistic total calc
            };
        });

        try {
            await api.patch('/catalog/cart/update-item/', { item_id: itemId, qty });
            // Re-fetch cart for accurate totals AFTER successful update
            fetchCart();
            if (qty === 0) toast.info("Item removed.");

        } catch (err) {
            toast.error(err.response?.data?.detail || 'Failed to update quantity.');
            // Revert optimistic update by refetching
             setCart(prevCart => { // Revert UI immediately for better UX
                if(!prevCart) return null;
                const revertedItems = prevCart.items.map(item =>
                    item.id === itemId ? {...item, qty: originalQty ?? 0} : item
                ).filter(item => (item.qty ?? 0) > 0); // Keep original if exists, else remove
                return {...prevCart, items: revertedItems};
             });
            fetchCart(); // Fetch again to be sure
        }
    };

    const handleRemoveItem = (itemId) => {
        handleUpdateQty(itemId, 0); // Use the update logic with qty 0
    };

    const handleClearCart = async () => {
        if (!window.confirm('Are you sure you want to remove all items from your cart?')) return;
        const originalCart = cart; // Keep original state for potential revert
        setCart({ items: [], total: 0, total_gst: 0, grand_total: 0 }); // Optimistic clear

        try {
            await api.post('/catalog/cart/clear/');
            // No need to fetchCart if API call is successful and UI is already cleared
            toast.info("Cart cleared.");
        } catch (err) {
            toast.error('Failed to clear cart.');
            setCart(originalCart); // Revert UI on error
        }
    };

    const handleProceedToCheckout = () => {
        if (!selectedAddress) {
            toast.warn("Please select a shipping address.");
            return;
        }
        // Navigate to checkout, passing selected address ID (backend will use it)
        navigate(`/checkout?address=${selectedAddress}`);
    };

    // --- Render Logic ---
    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;

    if (cart === null && !loading) return (
         <Container sx={{ textAlign: 'center', mt: 4 }}>
             <Alert severity="error" sx={{ mb: 2 }}>Could not load your cart data. Please refresh the page or try again later.</Alert>
             <Button variant="contained" component={RouterLink} to='/products'>Go Shopping</Button>
         </Container>
     );

    if (!cart || cart.items?.length === 0) return (
        <Container sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h4" gutterBottom>Your Cart is Empty</Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>Add some products to get started!</Typography>
            <Button variant="contained" component={RouterLink} to='/products'>Start Shopping</Button>
        </Container>
    );

    // Calculate totals (use helper) - ensure values exist
    const safeCart = cart || { items: [], total: 0, total_gst: 0, grand_total: 0 };
    const hasPrebookItems = safeCart.is_preorder_cart;
    const totalDueNow = formatPrice(safeCart.total_deposit_due ?? safeCart.grand_total ?? 0);
    const totalFullPrice = formatPrice(safeCart.total_full_price ?? safeCart.grand_total ?? 0);
    const remainingDue = formatPrice(safeCart.total_remaining_due ?? ((safeCart.total_full_price || 0) - (safeCart.total_deposit_due || 0)));
    const subTotal = formatPrice(safeCart.total ?? 0);
    const totalGST = formatPrice(safeCart.total_gst ?? 0);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>Shopping Cart</Typography>

            <Grid container spacing={4}>
                {/* Cart Items Column */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={0} sx={{ border: 1, borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
                        <List disablePadding>
                            {safeCart.items.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onUpdateQty={handleUpdateQty}
                                    onRemoveItem={handleRemoveItem}
                                />
                            ))}
                        </List>
                    </Paper>
                     <Button
                        variant="text"
                        color="error"
                        startIcon={<ClearCartIcon />}
                        onClick={handleClearCart}
                        sx={{ mt: 2, textTransform: 'none' }}
                     >
                         Clear Shopping Cart
                     </Button>
                </Grid>

                {/* Summary Column */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3, position: 'sticky', top: 80 /* Adjust based on navbar height */ }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>Order Summary</Typography>
                        <Divider sx={{ my: 1.5 }} />

                        {/* Address Selection */}
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" fontWeight={500} gutterBottom>Shipping Address</Typography>
                             {addresses.length > 0 ? (
                                <FormControl fullWidth size="small">
                                     <InputLabel id="address-select-label">Select Address</InputLabel>
                                     <Select
                                         labelId="address-select-label"
                                         value={selectedAddress}
                                         label="Select Address"
                                         onChange={(e) => setSelectedAddress(e.target.value)}
                                     >
                                        {/* Default option if nothing selected */}
                                        <MenuItem value="" disabled><em>Select an address...</em></MenuItem>
                                        {addresses.map(addr => (
                                            <MenuItem key={addr.id} value={String(addr.id)}>
                                                <ListItemText
                                                    primary={`${addr.address_line_1}, ${addr.city}`}
                                                    secondary={`${addr.state} - ${addr.pincode}`}
                                                />
                                            </MenuItem>
                                        ))}
                                     </Select>
                                </FormControl>
                             ) : (
                                <Alert severity="warning" variant="outlined" sx={{ mt: 1 }}>
                                     No addresses saved. Please add one.
                                </Alert>
                             )}
                              <Button
                                component={RouterLink} // Link to address management page
                                to="/addresses" // Make sure this route exists in App.js
                                variant="text"
                                size="small"
                                sx={{ mt: 1, textTransform: 'none' }}
                            >
                                Manage Addresses
                            </Button>
                        </Box>

                        <Divider sx={{ my: 1.5 }} />

                        {/* Price Breakdown */}
                         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                             <Typography variant="body2" color="text.secondary">Subtotal (Ex. GST)</Typography>
                             <Typography variant="body2" color="text.secondary">{subTotal}</Typography>
                         </Box>
                         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: hasPrebookItems ? 0.5 : 1.5 }}>
                             <Typography variant="body2" color="text.secondary">Total GST</Typography>
                             <Typography variant="body2" color="text.secondary">{totalGST}</Typography>
                         </Box>

                         {hasPrebookItems && (
                            <>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                    <Typography variant="body2" color="text.secondary">Total Full Price</Typography>
                                    <Typography variant="body2" color="text.secondary">{totalFullPrice}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                                    <Typography variant="body2" color="text.secondary">Remaining Due Later</Typography>
                                    <Typography variant="body2" color="text.secondary">{remainingDue}</Typography>
                                </Box>
                             </>
                         )}

                        <Divider sx={{ my: 1.5 }} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                            <Typography variant="h6" fontWeight="bold">
                                {hasPrebookItems ? 'Deposit Due Now' : 'Grand Total'}
                            </Typography>
                            <Typography variant="h6" fontWeight="bold" color="primary.main">
                                {totalDueNow}
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            onClick={handleProceedToCheckout}
                            disabled={!safeCart.items?.length || !selectedAddress}
                            sx={{ mt: 3, fontWeight: 700, py: 1.5 }} // Added padding
                        >
                            Proceed to Checkout
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Cart;