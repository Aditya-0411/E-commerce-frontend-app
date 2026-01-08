// // // src/pages/ProductDetail.jsx
// // import React, { useEffect, useState, useCallback } from "react";
// // import { useParams } from "react-router-dom";
// // import { CircularProgress, Typography, Box, Button, Grid, Card, CardMedia, TextField, Paper, Container } from "@mui/material";
// // import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// // import { toast } from "react-toastify";
// // import api from "../api";

// // const ProductDetail = () => {
// //   const { slug } = useParams();
// //   const [product, setProduct] = useState(null);
// //   const [mainImage, setMainImage] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [qty, setQty] = useState(1); 
  
// //   const fetchProduct = useCallback(() => {
// //     setLoading(true);
// //     api.get(`/catalog/products/${slug}/`).then((res) => {
// //       setProduct(res.data);
// //       if (res.data.images?.length > 0) {
// //         setMainImage(res.data.images[0].image);
// //       }
// //       setLoading(false);
// //     }).catch((err) => {
// //         console.error("Error fetching product:", err);
// //         setProduct(null);
// //         setLoading(false);
// //     });
// //   }, [slug]);

// //   const handleAddToCart = async () => {
// //     if (!product) return;
// //     try {
// //       await api.post("/catalog/cart/add/", { product: product.id, qty: qty });
// //       toast.success(`${qty} x ${product.title} added to cart!`);
// //     } catch (err) {
// //       toast.error(err.response?.data?.detail || "Failed to add to cart.");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProduct();
// //   }, [fetchProduct]);
  
// //   const handleQtyChange = (e) => {
// //     const value = parseInt(e.target.value) || 1;
// //     setQty(Math.max(1, Math.min(product?.stock || 1, value)));
// //   };


// //   if (loading) return <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}><CircularProgress size={50} /></Box>;
// //   if (!product) return <Typography variant="h5" align="center" mt={5}>Could not load product details.</Typography>;

// //   return (
// //     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
// //       <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
// //         <Grid container spacing={4}>
// //             <Grid item xs={12} md={6}>
// //                 <Card elevation={0} sx={{ width: "100%", height: { xs: 300, md: 500 }, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: 'grey.100', borderRadius: 2 }}>
// //                     {mainImage ? <CardMedia component="img" image={mainImage} alt={product.title} sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} /> : <Typography>No Image</Typography>}
// //                 </Card>
// //                 <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
// //                   {product.images.map((img, index) => (
// //                     <img key={index} src={img.image} alt={img.alt} onClick={() => setMainImage(img.image)} style={{ width: 60, height: 60, objectFit: 'cover', cursor: 'pointer', border: mainImage === img.image ? '2px solid #1976d2' : '1px solid #ccc' }} />
// //                   ))}
// //                 </Box>
// //             </Grid>
// //             <Grid item xs={12} md={6}>
// //                 <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>{product.title}</Typography>
// //                 <Typography variant="body1" color="text.secondary" paragraph>{product.description}</Typography>
// //                 <Box sx={{ display: 'flex', alignItems: 'baseline', my: 2 }}>
// //                   <Typography variant="h4" color="primary.main" fontWeight="bold">₹{product.price_with_gst}</Typography>
// //                   {product.mrp > product.price && <Typography variant="h6" color="text.secondary" sx={{ ml: 2, textDecoration: 'line-through' }}>₹{product.mrp}</Typography>}
// //                 </Box>
// //                 <Typography variant="body1" sx={{mb: 1}}><strong>Brand:</strong> {product.brand || 'N/A'}</Typography>
// //                 <Typography variant="body1" sx={{mb: 2}}><strong>Availability:</strong> {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}</Typography>
                
// //                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3 }}>
// //                     <TextField 
// //                         label="Qty"
// //                         type="number"
// //                         size="small"
// //                         value={qty}
// //                         onChange={handleQtyChange}
// //                         sx={{ width: 80 }}
// //                         inputProps={{ min: 1, max: product.stock }}
// //                     />
// //                     <Button variant="contained" size="large" startIcon={<AddShoppingCartIcon />} onClick={handleAddToCart} disabled={product.stock === 0 || qty > product.stock} sx={{ py: 1.5, px: 5 }}>
// //                       {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
// //                     </Button>
// //                 </Box>
// //             </Grid>
// //         </Grid>
// //       </Paper>
// //     </Container>
// //   );
// // };

// // export default ProductDetail;


import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography, Box, Button, Grid, Card, CardMedia, TextField, Paper, Container } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import EventAvailableIcon from '@mui/icons-material/EventAvailable'; 
import { toast } from "react-toastify";
import api from '../utils/api';

// ✅ FIX: Define the root URL of your server (without '/api')
const SERVER_ROOT_URL = process.env.REACT_APP_SERVER_URL || 'https://api.zirvanaa.com';

// ✅ Helper function to process image URLs
const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }
    return `${SERVER_ROOT_URL}${imagePath}`;
}

const ProductDetail = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1); 
    
    const isPrebookEnabled = product?.is_preorder;
    const prebookAmount = product?.preorder_deposit;

    const fetchProduct = useCallback(() => {
        setLoading(true);
        api.get(`/catalog/products/${slug}/`).then((res) => {
            const productData = res.data;
            
            // ✅ Process all images with the correct server root
            const processedImages = (productData.images || []).map(img => ({
                ...img,
                image: getImageUrl(img.image) // Use helper
            }));
            
            productData.images = processedImages;
            setProduct(productData);
            
            if (processedImages.length > 0) {
                setMainImage(processedImages[0].image);
            }
            
            setLoading(false);
        }).catch((err) => {
            console.error("Error fetching product:", err);
            setProduct(null);
            setLoading(false);
        });
    }, [slug]);

    const handleAction = async () => {
        if (!product) return;
        
        try {
            await api.post("/catalog/cart/add/", { product: product.id, qty: qty });
            toast.success(isPrebookEnabled 
                ? `${qty} deposit payment(s) added to cart!` 
                : `${qty} x ${product.title} added to cart!`
            );
        } catch (err) {
            toast.error(err.response?.data?.detail || "Failed to process item.");
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);
    
    const handleQtyChange = (e) => {
        const value = parseInt(e.target.value) || 1;
        const maxLimit = isPrebookEnabled ? 99 : (product?.stock || 1); 
        setQty(Math.max(1, Math.min(maxLimit, value)));
    };


    if (loading) return <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}><CircularProgress size={50} /></Box>;
    if (!product) return <Typography variant="h5" align="center" mt={5}>Could not load product details.</Typography>;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: {xs: 2, md: 4}, borderRadius: 3 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Card elevation={0} sx={{ width: "100%", height: { xs: 300, md: 500 }, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: 'grey.100', borderRadius: 2 }}>
                             {mainImage ? <CardMedia component="img" image={mainImage} alt={product.title} sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} /> : <Typography>No Image</Typography>}
                        </Card>
                        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                           {product.images?.map((img, index) => (
                              <Box
                                key={index}
                                component="img"
                                src={img.image} // ✅ This is now the full, correct URL
                                alt={img.alt || `thumbnail ${index+1}`} 
                                onClick={() => setMainImage(img.image)} 
                                sx={{ 
                                  width: 60, height: 60, 
                                  objectFit: 'cover', 
                                  cursor: 'pointer', 
                                  borderRadius: '4px', 
                                  border: mainImage === img.image ? '2px solid' : '2px solid',
                                  borderColor: mainImage === img.image ? 'primary.main' : 'transparent',
                                  transition: 'border-color 0.2s'
                                }}
                              />
                           ))}
                        </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                        <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>{product.title}</Typography>
                        <Typography variant="body1" color="text.secondary" paragraph sx={{ whiteSpace: 'pre-wrap' }}>{product.description}</Typography>
                        
                        {isPrebookEnabled ? (
                            <Box sx={{ p: 2, bgcolor: 'primary.lightest', borderLeft: '4px solid', borderColor: 'primary.main', borderRadius: 1, my: 2 }}>
                                <Typography variant="h5" color="primary.dark" fontWeight="bold">
                                    Deposit Due Now: ₹{prebookAmount}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Full Price: ₹{product.price_with_gst}. Remaining balance due before shipping on {product.available_on || 'TBD'}.
                                </Typography>
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'baseline', my: 2 }}>
                                <Typography variant="h4" color="primary.main" fontWeight="bold">₹{product.price_with_gst}</Typography>
                                {product.mrp > product.price_with_gst && <Typography variant="h6" color="text.secondary" sx={{ ml: 2, textDecoration: 'line-through' }}>MRP: ₹{product.mrp}</Typography>}
                            </Box>
                        )}

                        <Typography variant="body1" sx={{mb: 1}}><strong>Brand:</strong> {product.brand || 'N/A'}</Typography>
                        <Typography variant="body1" sx={{mb: 2}}>
                            <strong>Availability:</strong> 
                            <Box 
                                component="span" 
                                sx={{ 
                                  fontWeight: 'bold', 
                                  color: isPrebookEnabled ? 'secondary.main' : (product.stock > 0 ? 'success.main' : 'error.main'),
                                  ml: 1
                                }}
                            >
                              {isPrebookEnabled 
                                  ? `Pre-order (Ships: ${product.available_on || 'TBD'})` 
                                  : (product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock')
                              }
                            </Box>
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3 }}>
                            <TextField 
                                label="Qty" type="number" size="small" value={qty}
                                onChange={handleQtyChange} sx={{ width: 80 }}
                                inputProps={{ min: 1, max: isPrebookEnabled ? 99 : product.stock }}
                            />
                            <Button 
                                variant="contained" 
                                size="large" 
                                startIcon={isPrebookEnabled ? <EventAvailableIcon /> : <AddShoppingCartIcon />} 
                                onClick={handleAction} 
                                disabled={!isPrebookEnabled && (product.stock === 0 || !product.stock)} 
                                sx={{ py: 1.5, px: 5, fontWeight: 700 }}
                                color={isPrebookEnabled ? "secondary" : "primary"}
                            >
                                {isPrebookEnabled ? 'Pay Deposit' : 'Add to Cart'}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default ProductDetail;