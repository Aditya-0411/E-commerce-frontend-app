// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material'; // Container removed from here
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- Context ---
import { AuthProvider } from './context/AuthContext';

// --- Core Components ---
import Navbar from './components/Navbar'; // Make sure this path is correct
import Footer from './components/Footer'; // Make sure this path is correct

// --- Theme ---
import theme from './theme'; // Make sure this path is correct

// --- Pages ---
// (Import all your page components here...)
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail'; 
import Cart from './pages/Cart'; 
import Checkout from './pages/Checkout'; 
import Orders from './pages/Orders'; 
import Login from './pages/Login'; 
import Signup from './pages/Signup'; 
import Profile from './pages/Profile'; 
import Addresses from './pages/Addresses'; 
import MyVouchers from './pages/MyVouchers'; 
import VoucherPurchase from './pages/VoucherPurchase'; 
import SellerRegistration from './pages/SellerRegistration'; 
import SellerDashboard from './pages/seller/SellerDashboard'; 
import SellerProducts from './pages/seller/SellerProducts'; 
import SellerOrders from './pages/seller/SellerOrders'; 
import About from './pages/About'; 
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ReturnPolicy from './pages/ReturnPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import Notifications from './pages/Notifications'; 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          {/* Flex container for Navbar + Content + Footer */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh', 
            }}
          >
            <Navbar /> {/* Renders AppBar + the crucial Toolbar spacer */}

            {/* Main content area takes up remaining space */}
            <Box
              component="main"
              sx={{
                flexGrow: 1, // Make this section grow
                width: '100%',
                // NO PADDING OR MARGIN TOP HERE
                backgroundColor: 'background.default', 
                // Any specific page padding should be inside the page component itself (e.g., ProductList's Container)
              }}
            >
              <Routes>
                {/* PUBLIC */}
                <Route path="/" element={<ProductList />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:slug" element={<ProductDetail />} />
                <Route path="/about" element={<About />} />
  <Route path="/terms" element={<TermsAndConditions />} />
  <Route path="/privacy" element={<PrivacyPolicy />} />
  <Route path="/refund" element={<RefundPolicy />} />
  <Route path="/return" element={<ReturnPolicy />} />
  <Route path="/shipping" element={<ShippingPolicy />} />
                {/* AUTH */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* USER */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/addresses" element={<Addresses />} />
                <Route path="/notifications" element={<Notifications />} />
                {/* VOUCHERS */}
                <Route path="/vouchers" element={<MyVouchers />} />
                <Route path="/vouchers/purchase" element={<VoucherPurchase />} />
                {/* CART & ORDERS */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                {/* SELLER */}
                <Route path="/seller/register" element={<SellerRegistration />} />
                <Route path="/seller/dashboard" element={<SellerDashboard />} />
                <Route path="/seller/products" element={<SellerProducts />} />
                <Route path="/seller/orders" element={<SellerOrders />} />
                {/* FALLBACK */}
                <Route path="*" element={<ProductList />} /> 
              </Routes>
            </Box>

            <Footer /> {/* Footer stays at the bottom */}
          </Box>
        </AuthProvider>

        <ToastContainer position="bottom-right" autoClose={3000} />
      </Router>
    </ThemeProvider>
  );
}

export default App;