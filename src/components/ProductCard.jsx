
// import React from 'react';
// import { 
//     Card, 
//     CardContent, 
//     CardMedia, 
//     Typography, 
//     Box, 
//     CardActionArea,
//     Chip,
//     Button,
//     Tooltip
// } from '@mui/material';
// import { Link as RouterLink } from 'react-router-dom';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import EventAvailableIcon from '@mui/icons-material/EventAvailable'; 
// import { toast } from 'react-toastify';
// import api from '../api';

// const FALLBACK_IMAGE = 'https://placehold.co/600x400/eeeeee/999999?text=No+Image';

// const ProductCard = ({ product }) => {

//     // Helper to format currency
//     const formatPrice = (price) => {
//         if (price === null || price === undefined) return 'N/A';
//         return new Intl.NumberFormat('en-IN', {
//             style: 'currency',
//             currency: 'INR',
//             minimumFractionDigits: 0,
//             maximumFractionDigits: 2,
//         }).format(price);
//     };

//     // --- Card Logic ---
//     const isOutOfStock = !product.stock || product.stock === 0;
//     const isPrebookEnabled = product.is_preorder;

//     const handleAction = async (e) => {
//         e.preventDefault(); 
//         e.stopPropagation();
        
//         try {
//             // Use the single cart/add endpoint
//             await api.post("/catalog/cart/add/", { product: product.id, qty: 1 });
//             toast.success(isPrebookEnabled 
//                 ? `Deposit for ${product.title} added to cart!` 
//                 : `${product.title} added to cart!`
//             );
//             // You might want to trigger a cart count refresh here
//         } catch (err) {
//             toast.error(err.response?.data?.detail || "Failed to process. Please log in.");
//         }
//     };
    
//     // Calculate discount
//     const discount = product.mrp && product.mrp > product.price_with_gst
//         ? Math.round(((product.mrp - product.price_with_gst) / product.mrp) * 100)
//         : 0;
//     // --- End of Logic ---

//     return (
//         <Card 
//             sx={{ 
//                 height: '100%', 
//                 display: 'flex', 
//                 flexDirection: 'column',
//                 borderRadius: '12px',
//                 transition: 'all 0.2s ease-in-out',
//                 '&:hover': {
//                     transform: 'translateY(-4px)',
//                     boxShadow: '0 8px 20px rgba(0,0,0,0.12)'
//                 }
//             }}
//         >
//             <CardActionArea 
//                 component={RouterLink} 
//                 to={`/products/${product.slug || product.id}`}
//                 sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
//             >
//                 <Box sx={{ position: 'relative', width: '100%' }}>
//                     <CardMedia
//                         component="img"
//                         height="200"
//                         image={product.featured_image_url || FALLBACK_IMAGE}
//                         alt={product.title}
//                         onError={(e) => { e.target.src = FALLBACK_IMAGE }}
//                         sx={{ objectFit: 'cover' }}
//                     />
//                     {discount > 0 && (
//                         <Chip 
//                             label={`${discount}% OFF`}
//                             color="error"
//                             size="small"
//                             sx={{ 
//                                 position: 'absolute', 
//                                 top: 8, 
//                                 left: 8, 
//                                 fontWeight: 700 
//                             }} 
//                         />
//                     )}
//                 </Box>
                
//                 <CardContent sx={{ flexGrow: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
//                     {product.category?.name && (
//                          <Chip 
//                             label={product.category.name} 
//                             size="small" 
//                             color="primary"
//                             variant="outlined"
//                             sx={{ mb: 1, fontWeight: 600, fontSize: '0.7rem', alignSelf: 'flex-start' }} 
//                         />
//                     )}

//                     <Tooltip title={product.title || 'Untitled Product'}>
//                         <Typography 
//                             gutterBottom 
//                             variant="h6" 
//                             component="div"
//                             sx={{
//                                 fontWeight: 600,
//                                 lineHeight: 1.3,
//                                 overflow: 'hidden',
//                                 textOverflow: 'ellipsis',
//                                 display: '-webkit-box',
//                                 WebkitLineClamp: '2',
//                                 WebkitBoxOrient: 'vertical',
//                                 minHeight: '2.6em' 
//                             }}
//                         >
//                             {product.title || 'Untitled Product'}
//                         </Typography>
//                     </Tooltip>
                    
//                     <Box sx={{ flexGrow: 1 }} /> 

//                     <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 1 }}>
//                         <Typography 
//                             variant="h5" 
//                             color="primary.main" 
//                             sx={{ fontWeight: 700 }}
//                         >
//                             {formatPrice(product.price_with_gst)}
//                         </Typography>
//                         {product.mrp > product.price_with_gst && (
//                             <Typography 
//                                 variant="body2" 
//                                 color="text.secondary" 
//                                 sx={{ textDecoration: 'line-through' }}
//                             >
//                                 {formatPrice(product.mrp)}
//                             </Typography>
//                         )}
//                     </Box>

//                     <Typography 
//                         variant="caption" 
//                         color={!isPrebookEnabled && isOutOfStock ? 'error.main' : 'success.main'}
//                         sx={{ fontWeight: 600, mt: 1, display: 'block' }}
//                     >
//                         {isPrebookEnabled
//                             ? `Pre-order Available`
//                             : (isOutOfStock ? 'Out of Stock' : `${product.stock} in stock`)
//                         }
//                     </Typography>
//                 </CardContent>
//             </CardActionArea>
            
//             <Box sx={{ p: 2, pt: 0 }}>
//                 <Button 
//                     fullWidth 
//                     variant="contained" 
//                     color={isPrebookEnabled ? "secondary" : "primary"}
//                     startIcon={isPrebookEnabled ? <EventAvailableIcon /> : <AddShoppingCartIcon />} 
//                     onClick={handleAction} 
//                     disabled={!isPrebookEnabled && isOutOfStock} 
//                     sx={{ textTransform: 'none', fontWeight: 700 }}
//                 >
//                     {isPrebookEnabled 
//                         ? `Pre-order (Pay ${formatPrice(product.preorder_deposit)})` 
//                         : (isOutOfStock ? 'Out of Stock' : 'Add to Cart')
//                     }
//                 </Button>
//             </Box>
//         </Card>
//     );
// };

// export default ProductCard;











// src/components/ProductCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import { toast } from "react-toastify";
import api from "../utils/api";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const isOutOfStock = product.stock === 0;

  // 🟢 Add to Cart
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await api.post("/catalog/cart/add/", { product: product.id, qty: 1 });
      toast.success("Added to cart!");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to add to cart. Please log in.");
    }
  };

  // 🟢 Prebook
  const handlePrebook = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await api.post("/catalog/prebook/", { product: product.id });
      toast.success(`Prebooked successfully! Amount paid: ₹${product.prebook_amount}`);
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to prebook. Please log in.");
    }
  };

  // ⚡ Buy Now → Add to cart, then redirect to checkout
  const handleBuyNow = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await api.post("/catalog/cart/add/", { product: product.id, qty: 1 });
      navigate("/checkout");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to proceed. Please log in.");
    }
  };

  const discount =
    product.mrp && product.mrp > product.price_with_gst
      ? Math.round(((product.mrp - product.price_with_gst) / product.mrp) * 100)
      : 0;

  return (
    <Card
      component={Link}
      to={`/products/${product.slug}`}
      sx={{
        textDecoration: "none",
        color: "inherit",
        borderRadius: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Product Image */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image={product.thumbnail || "/placeholder-product.png"}
          alt={product.title}
          sx={{
            objectFit: "contain",
            backgroundColor: "#fff",
            p: 1,
          }}
        />

        {discount > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              bgcolor: "error.main",
              color: "white",
              px: 1,
              py: 0.3,
              borderRadius: 1,
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            {discount}% OFF
          </Box>
        )}

        <Tooltip title="Add to Wishlist">
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#555",
              bgcolor: "rgba(255,255,255,0.8)",
              "&:hover": { bgcolor: "white", color: "error.main" },
              transition: "0.3s",
            }}
          >
            <FavoriteBorderIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Product Info */}
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={600}
          noWrap
          sx={{ mb: 0.5, lineHeight: 1.3 }}
        >
          {product.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} noWrap>
          {product.category?.name || "Category"}
        </Typography>

        {/* Rating & Price */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
          <StarIcon sx={{ fontSize: 18, color: "#FFD700" }} />
          <Typography variant="body2" color="text.secondary">
            {product.rating ? product.rating.toFixed(1) : "4.5"}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <Typography variant="h6" fontWeight={700} color="primary">
            ₹{product.price_with_gst}
          </Typography>
          {product.mrp && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: "line-through" }}
            >
              ₹{product.mrp}
            </Typography>
          )}
        </Box>
      </CardContent>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
          p: 2,
          pt: 0,
        }}
      >
        {product.is_prebook_enabled ? (
          <Button
            variant="contained"
            size="small"
            color="secondary"
            fullWidth
            startIcon={<EventAvailableIcon />}
            onClick={handlePrebook}
          >
            Prebook ₹{product.prebook_amount}
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              size="small"
              color={isOutOfStock ? "inherit" : "primary"}
              startIcon={<AddShoppingCartIcon />}
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                flex: 1,
                bgcolor: isOutOfStock ? "grey.400" : "primary.main",
                "&:hover": {
                  bgcolor: isOutOfStock ? "grey.500" : "primary.dark",
                },
              }}
            >
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>

            <Button
              variant="outlined"
              size="small"
              color="secondary"
              startIcon={<FlashOnIcon />}
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                flex: 1,
                borderWidth: 2,
                "&:hover": { borderWidth: 2 },
              }}
            >
              Buy Now
            </Button>
          </>
        )}
      </Box>
    </Card>
  );
};

export default ProductCard;
