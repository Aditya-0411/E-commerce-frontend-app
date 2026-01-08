// // src/pages/Checkout.jsx - Final Pre-booking Implementation
// import React, { useState, useEffect } from 'react';
// import { Container, Typography, Box, Paper, Grid, Button, CircularProgress, Radio, RadioGroup, FormControlLabel, TextField, Alert, Divider } from '@mui/material';
// import api from '../api';
// import { useNavigate, Link } from 'react-router-dom';

// const Checkout = () => {
//     const [cart, setCart] = useState(null);
//     const [addresses, setAddresses] = useState([]);
//     const [selectedAddress, setSelectedAddress] = useState('');
//     const [voucherCode, setVoucherCode] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [cartRes, addressesRes] = await Promise.all([
//                     api.get('/catalog/cart/'),
//                     api.get('/catalog/addresses/'),
//                 ]);
                
//                 const fetchedCart = cartRes.data;
//                 if (fetchedCart.items?.length === 0) {
//                     alert('Your cart is empty. Redirecting to cart.');
//                     navigate('/cart');
//                     return;
//                 }

//                 const fetchedAddresses = addressesRes.data.results || addressesRes.data;
//                 setCart(fetchedCart);
//                 setAddresses(fetchedAddresses);
                
//                 const defaultAddress = fetchedAddresses.find(a => a.is_default) || fetchedAddresses?.[0];
//                 if (defaultAddress) setSelectedAddress(String(defaultAddress.id));

//             } catch (err) {
//                 setError('Failed to load checkout data. Please log in or try again.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [navigate]);

//     const handlePlaceOrder = async () => {
//         if (!selectedAddress) { setError('Please select a shipping address.'); return; }
//         setError('');

//         try {
//             const payload = { address_id: parseInt(selectedAddress), voucher_code: voucherCode || null };
//             const response = await api.post('/catalog/orders/create/', payload);
            
//             // Redirect to payment initiation page after successful order creation
//             navigate(`/orders/${response.data.id}/payment`); 
//         } catch (err) {
//             setError(err.response?.data?.detail || JSON.stringify(err.response?.data) || 'Failed to place order.');
//         }
//     };

//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
//     if (!cart || cart.items?.length === 0) return null;

//     // 🟢 Derive financial totals using fields exposed by the CartSerializer
//     const hasPrebookItems = cart.is_preorder_cart; // Assumes CartSerializer exposes this flag
//     const totalDueNow = cart.total_deposit_due || cart.grand_total; // The amount to be paid now
//     const totalFullPrice = cart.total_full_price || cart.grand_total; // The full gross amount
//     const remainingDue = cart.total_remaining_due || 0; // The difference

//     return (
//         <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//             <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">Checkout</Typography>
//             {error && <Alert severity="error" sx={{mb: 2}}>{error}</Alert>}
            
//             <Grid container spacing={4}>
//                 {/* --- Address Selection Grid Item --- */}
//                 <Grid item xs={12} md={7}>
//                     {/* ... Address Selection Logic ... */}
//                 </Grid>
                
//                 {/* --- Order Summary Grid Item --- */}
//                 <Grid item xs={12} md={5}>
//                     <Paper sx={{p: 3, borderRadius: 2}}>
//                         <Typography variant="h6" gutterBottom>Order Summary</Typography>

//                         {/* 🟢 PREBOOK WARNING */}
//                         {hasPrebookItems && (
//                             <Alert severity="warning" sx={{ mb: 2 }}>
//                                 This is a **Deposit Payment**. Only the deposit amount is due now.
//                             </Alert>
//                         )}

//                         {/* Item Breakdown (Displaying Gross Price or Deposit) */}
//                         {cart && cart.items.map(item => (
//                             <Box key={item.id} display="flex" justifyContent="space-between" sx={{mb: 0.5}}>
//                                 <Typography>
//                                     {item.product_title} x {item.qty}
//                                     {item.product_is_preorder && (
//                                         <Typography variant="caption" color="secondary.dark" sx={{ ml: 1 }}>
//                                             (Deposit Paid)
//                                         </Typography>
//                                     )}
//                                 </Typography>
//                                 <Typography>
//                                     ₹{item.total_with_gst}
//                                 </Typography>
//                             </Box>
//                         ))}
                        
//                         <Divider sx={{my: 2}} />
                        
//                         {/* 🟢 FULL PRICE & REMAINING DUE BREAKDOWN */}
//                         {hasPrebookItems && (
//                              <Box sx={{ mb: 2 }}>
//                                 <Box display="flex" justifyContent="space-between">
//                                     <Typography variant="body1">Total Full Price (Gross):</Typography>
//                                     <Typography>₹{totalFullPrice}</Typography>
//                                 </Box>
//                                 <Box display="flex" justifyContent="space-between">
//                                     <Typography variant="body1" color="error">Remaining Due Later:</Typography>
//                                     <Typography variant="body1" color="error">₹{remainingDue}</Typography>
//                                 </Box>
//                                 <Divider sx={{ mt: 1 }} />
//                              </Box>
//                         )}
                        
//                         {/* FINAL AMOUNT DUE NOW */}
//                         <Box display="flex" justifyContent="space-between">
//                             <Typography variant="h5" fontWeight="bold">{hasPrebookItems ? 'DEPOSIT DUE NOW' : 'GRAND TOTAL'}</Typography>
//                             <Typography variant="h5" fontWeight="bold" color="secondary">
//                                 ₹{totalDueNow}
//                             </Typography>
//                         </Box>

//                         <Divider sx={{my: 2}} />
//                         <Typography variant="h6" gutterBottom>Apply Voucher</Typography>
//                         <TextField fullWidth label="Voucher Code (Optional)" value={voucherCode} onChange={e => setVoucherCode(e.target.value)} size="small" sx={{mt: 1}} />
//                         <Button fullWidth variant="contained" size="large" onClick={handlePlaceOrder} sx={{mt: 2, py: 1.5}} disabled={!selectedAddress}>
//                             {hasPrebookItems ? 'Confirm & Pay Deposit' : 'Confirm & Place Order'}
//                         </Button>
//                     </Paper>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// };

// export default Checkout;

// src/pages/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Grid, Button, CircularProgress, Alert, Divider } from '@mui/material';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [qrData, setQrData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch cart and addresses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cartRes, addrRes] = await Promise.all([
          api.get('/catalog/cart/'),
          api.get('/catalog/addresses/')
        ]);

        const fetchedCart = cartRes.data;
        if (!fetchedCart.items?.length) {
          toast.error('Your cart is empty.');
          navigate('/cart');
          return;
        }
        setCart(fetchedCart);

        const fetchedAddresses = addrRes.data.results || addrRes.data;
        if (!fetchedAddresses.length) {
          toast.error('No addresses found. Please add one first.');
          navigate('/account/addresses');
          return;
        }
        setAddresses(fetchedAddresses);

        // Set default selected address
        const defaultAddr = fetchedAddresses.find(a => a.is_default) || fetchedAddresses[0];
        setSelectedAddress(String(defaultAddr.id));

      } catch (err) {
        console.error(err);
        setError('Failed to load checkout data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      setError('Please select a shipping address.');
      return;
    }
    setError('');
    try {
      const payload = {
        address_id: parseInt(selectedAddress),
        voucher_code: voucherCode || null
      };

      // Create order
      const orderRes = await api.post('/catalog/orders/create/', payload);
      const newOrderId = orderRes.data.id;

      // Fetch QR for payment
      const qrRes = await api.get(`/payments/checkout-qr/${newOrderId}/`);
      setQrData(qrRes.data);

      toast.success('Order created! Scan QR to pay.');

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Failed to place order.');
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (!cart) return null;

  const hasPrebookItems = cart.is_preorder_cart;
  const totalDueNow = cart.total_deposit_due || cart.grand_total;
  const totalFullPrice = cart.total_full_price || cart.grand_total;
  const remainingDue = cart.total_remaining_due || 0;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">Checkout</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={4}>
        {/* Shipping Address */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Select Shipping Address</Typography>
            {addresses.map(addr => (
              <Box key={addr.id} sx={{ mb: 1 }}>
                <Button
                  variant={String(addr.id) === selectedAddress ? 'contained' : 'outlined'}
                  fullWidth
                  onClick={() => setSelectedAddress(String(addr.id))}
                >
                  {addr.name ? `${addr.name}, ` : ''}{addr.address_line_1}, {addr.city} ({addr.address_type})
                </Button>
              </Box>
            ))}
            <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate('/account/addresses')}>
              Add / Edit Addresses
            </Button>
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Order Summary</Typography>

            {cart.items.map(item => (
              <Box key={item.id} display="flex" justifyContent="space-between" sx={{ mb: 0.5 }}>
                <Typography>{item.product_title} x {item.qty}</Typography>
                <Typography>
                  ₹{hasPrebookItems ? item.preorder_deposit_snapshot : item.total_with_gst}
                </Typography>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            {hasPrebookItems && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                Deposit Payment Only. GST not included in deposit.
              </Alert>
            )}

            <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="h6">{hasPrebookItems ? 'Deposit Due Now' : 'Grand Total'}</Typography>
              <Typography variant="h6" color="secondary">₹{totalDueNow}</Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handlePlaceOrder}
              sx={{ mt: 2 }}
            >
              {hasPrebookItems ? 'Confirm & Pay Deposit' : 'Confirm & Place Order'}
            </Button>

            {/* QR Payment */}
            {qrData && (
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>{qrData.message}</Typography>
                <img src={qrData.qr_image} alt="UPI QR" style={{ maxWidth: '200px' }} />
                <Typography sx={{ mt: 1 }}>UPI ID: <b>{qrData.upi_id}</b></Typography>
                <Typography sx={{ mt: 1 }}>Amount Due: ₹{qrData.amount_due}</Typography>
              </Box>
            )}

          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
