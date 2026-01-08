// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Container,
//   Typography,
//   Grid,
//   Box,
//   CircularProgress,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Alert,
//   IconButton,
//   useMediaQuery,
// } from '@mui/material';
// import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
// import { useTheme } from '@mui/material/styles';
// import api from '../api';
// import ProductCard from '../components/ProductCard';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [filters, setFilters] = useState({
//     search: '',
//     category__slug: '',
//     ordering: '-created_at',
//   });

//   const scrollRef = useRef(null);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   // Fetch products
//   const fetchProducts = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await api.get('/catalog/products/', { params: filters });
//       setProducts(response.data.results || []);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch products.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch categories
//   const fetchCategories = async () => {
//     try {
//       const response = await api.get('/catalog/categories/');
//       setCategories(response.data.results || response.data);
//     } catch (err) {
//       console.error('Failed to fetch categories:', err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [filters]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleFilterChange = (event) => {
//     setFilters({ ...filters, [event.target.name]: event.target.value });
//   };

//   const handleCategoryClick = (slug) => {
//     setFilters((prev) => ({
//       ...prev,
//       category__slug: slug === prev.category__slug ? '' : slug,
//     }));
//   };

//   const scroll = (direction) => {
//     if (scrollRef.current) {
//       const scrollAmount = direction === 'left' ? -300 : 300;
//       scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     }
//   };

//   const [showLeft, setShowLeft] = useState(false);
//   const [showRight, setShowRight] = useState(false);

//   const checkScrollButtons = () => {
//     if (!scrollRef.current) return;
//     const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
//     setShowLeft(scrollLeft > 0);
//     setShowRight(scrollLeft + clientWidth < scrollWidth - 5);
//   };

//   useEffect(() => {
//     checkScrollButtons();
//     const el = scrollRef.current;
//     if (el) el.addEventListener('scroll', checkScrollButtons);
//     return () => el && el.removeEventListener('scroll', checkScrollButtons);
//   }, [categories]);

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Products
//       </Typography>

//       {/* 🔍 Search and Sort */}
//       <Grid container spacing={2} sx={{ mb: 2 }}>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             fullWidth
//             size="small"
//             label="Search Products"
//             name="search"
//             value={filters.search}
//             onChange={handleFilterChange}
//           />
//         </Grid>
//         <Grid item xs={12} sm={3}>
//           <FormControl fullWidth size="small">
//             <InputLabel>Sort By</InputLabel>
//             <Select
//               name="ordering"
//               value={filters.ordering}
//               label="Sort By"
//               onChange={handleFilterChange}
//             >
//               <MenuItem value="-created_at">Newest</MenuItem>
//               <MenuItem value="price">Price: Low to High</MenuItem>
//               <MenuItem value="-price">Price: High to Low</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//       </Grid>

//       {/* 🟦 Amazon-Style Category Bar */}
//       <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', mb: 4 }}>
//         {showLeft && (
//           <IconButton
//             onClick={() => scroll('left')}
//             sx={{
//               position: 'absolute',
//               left: 0,
//               zIndex: 2,
//               background: 'white',
//               boxShadow: 2,
//               '&:hover': { background: '#f0f0f0' },
//             }}
//           >
//             <ArrowBackIosNew />
//           </IconButton>
//         )}

//         <Box
//           ref={scrollRef}
//           sx={{
//             display: 'flex',
//             overflowX: 'auto',
//             gap: 2,
//             px: 5,
//             py: 1,
//             scrollBehavior: 'smooth',
//             '&::-webkit-scrollbar': { display: 'none' },
//           }}
//         >
//           {/* "All" Category */}
//           <Box
//             onClick={() => handleCategoryClick('')}
//             sx={{
//               flex: '0 0 auto',
//               width: isMobile ? 70 : 90,
//               height: isMobile ? 70 : 90,
//               borderRadius: '12px',
//               border: filters.category__slug === '' ? '2px solid #1976d2' : '2px solid transparent',
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               justifyContent: 'center',
//               cursor: 'pointer',
//               transition: 'all 0.3s ease',
//               '&:hover': {
//                 transform: 'scale(1.08)',
//                 borderColor: '#1976d2',
//               },
//             }}
//           >
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/3523/3523063.png"
//               alt="All"
//               style={{
//                 width: '60%',
//                 height: '60%',
//                 objectFit: 'contain',
//               }}
//             />
//             <Typography
//               variant="caption"
//               sx={{
//                 mt: 0.5,
//                 color: '#333',
//                 fontWeight: 600,
//               }}
//             >
//               All
//             </Typography>
//           </Box>

//           {/* Dynamic Categories */}
//           {categories.map((cat) => {
//             const isSelected = filters.category__slug === cat.slug;
//             return (
//               <Box
//                 key={cat.id}
//                 onClick={() => handleCategoryClick(cat.slug)}
//                 sx={{
//                   flex: '0 0 auto',
//                   width: isMobile ? 70 : 90,
//                   height: isMobile ? 70 : 90,
//                   borderRadius: '12px',
//                   border: isSelected ? '2px solid #1976d2' : '2px solid transparent',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   cursor: 'pointer',
//                   transition: 'all 0.3s ease',
//                   '&:hover': {
//                     transform: 'scale(1.08)',
//                     borderColor: '#1976d2',
//                   },
//                 }}
//               >
//                 <img
//                   src={
//                     cat.icon?.startsWith('http')
//                       ? cat.icon
//                       : `${api.defaults.baseURL}${cat.icon}`
//                   }
//                   alt={cat.name}
//                   style={{
//                     width: '60%',
//                     height: '60%',
//                     objectFit: 'contain',
//                     borderRadius: '8px',
//                   }}
//                 />
//                 <Typography
//                   variant="caption"
//                   sx={{
//                     mt: 0.5,
//                     color: '#333',
//                     fontWeight: 600,
//                   }}
//                 >
//                   {cat.name}
//                 </Typography>
//               </Box>
//             );
//           })}
//         </Box>

//         {showRight && (
//           <IconButton
//             onClick={() => scroll('right')}
//             sx={{
//               position: 'absolute',
//               right: 0,
//               zIndex: 2,
//               background: 'white',
//               boxShadow: 2,
//               '&:hover': { background: '#f0f0f0' },
//             }}
//           >
//             <ArrowForwardIos />
//           </IconButton>
//         )}
//       </Box>

//       {/* 🛍 Product Grid */}
//       {loading ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : error ? (
//         <Alert severity="error">{error}</Alert>
//       ) : (
//         <Grid container spacing={4}>
//           {products.map((product) => (
//             <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
//               <ProductCard product={product} />
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       {products.length === 0 && !loading && !error && (
//         <Typography variant="h6" align="center" mt={4}>
//           No products found.
//         </Typography>
//       )}
//     </Container>
//   );
// };

// export default ProductList;





import React from 'react';
import { useState, useEffect, useRef } from 'react';
import {
    Container,
    Typography,
    Grid,
    Box,
    CircularProgress,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    IconButton,
    useMediaQuery,
    Card,
    CardActionArea,
    useTheme,
    InputAdornment, // Added for search icon
} from '@mui/material';
import {
    ArrowBackIosNew,
    ArrowForwardIos,
    AllInclusive,
    Search as SearchIcon, // Added search icon
} from '@mui/icons-material';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';

// Define the root URL of your server (without '/api')
// Ensure this matches your deployment (e.g., https://api.zirvanaa.com)
const SERVER_ROOT_URL = process.env.REACT_APP_SERVER_URL || 'https://api.zirvanaa.com';

// Refined Helper function to process image URLs
const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }
    const correctedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${SERVER_ROOT_URL}${correctedPath}`;
};

// --- ProductList Component ---
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        category__slug: '',
        ordering: '-created_at',
    });

    const scrollRef = useRef(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // --- API Calls ---
    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/catalog/products/', { params: filters });
            const results = response.data.results || [];
            if (!Array.isArray(results)) {
                throw new Error("Invalid product data format from API.");
            }

            const processedProducts = results.map(p => {
                let imageUrl = null;
                // Adapt this based on your ACTUAL API response for the list view image
                const imagePath = p.images?.[0]?.image || p.thumbnail || p.featured_image || null;
                if (imagePath) {
                    imageUrl = getImageUrl(imagePath);
                }
                return { ...p, featured_image_url: imageUrl };
            });
            setProducts(processedProducts);
        } catch (err) {
            console.error("Error fetching or processing products:", err);
            setError(`Failed to fetch products: ${err.message}. Check API/Network & Console.`);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await api.get('/catalog/categories/');
            const results = response.data.results || response.data || [];
            if (!Array.isArray(results)) {
                 console.error("API did not return an array for categories.");
                 setCategories([]); return;
            }
            const processedCategories = results.map(cat => ({
                ...cat, icon_url: getImageUrl(cat.icon)
            }));
            setCategories(processedCategories);
        } catch (err) {
            console.error('Failed to fetch categories:', err);
        }
    };

    useEffect(() => { fetchProducts(); }, [filters]);
    useEffect(() => { fetchCategories(); }, []);

    // --- Handlers & Helpers ---
    const handleFilterChange = (event) => {
        setFilters({ ...filters, [event.target.name]: event.target.value });
    };
    const handleCategoryClick = (slug) => {
        setFilters((prev) => ({ ...prev, category__slug: slug === prev.category__slug ? '' : slug }));
    };
    const scroll = (direction) => { /* ... unchanged ... */ };
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);
    const checkScrollButtons = () => { /* ... unchanged ... */ };
    useEffect(() => { /* ... unchanged ... */ }, [categories]);

    // --- Render ---
    return (
        // Outer Box: No top padding, only bottom. MinHeight ensures it fills space below navbar.
        <Box sx={{ background: 'linear-gradient(180deg, #673ab7 0%, #512da8 100%)', pb: 6, minHeight: 'calc(100vh - 64px)' /* Adjust 64px if Navbar height changes */ }}>
            {/* Container: Adds top padding to space content BELOW navbar */}
            <Container maxWidth="xl" sx={{ pt: 4 }}>

                <Typography variant={isMobile ? "h4" : "h3"} component="h1" fontWeight={700} color="white" gutterBottom sx={{ mb: 4 }}>
                    Discover Products
                </Typography>

                {/* --- Search & Filter Bar --- */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        borderRadius: '12px', // Softer corners
                        p: { xs: 2, sm: 2.5 }, // Consistent padding
                        mb: 4,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                >
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={8}>
                            <TextField
                                fullWidth
                                label="Search products..."
                                name="search"
                                value={filters.search}
                                onChange={handleFilterChange}
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="sort-select-label-main">Sort By</InputLabel>
                                <Select
                                    labelId="sort-select-label-main"
                                    name="ordering"
                                    value={filters.ordering}
                                    label="Sort By"
                                    onChange={handleFilterChange}
                                >
                                    <MenuItem value="-created_at">Newest First</MenuItem>
                                    <MenuItem value="price">Price: Low-High</MenuItem>
                                    <MenuItem value="-price">Price: High-Low</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>

                {/* --- Category Bar --- */}
                <Typography variant="h5" fontWeight={600} color="white" sx={{ mb: 2 }}>
                    Browse by Category
                </Typography>
                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', mb: 5 }}>
                    <Box
                        sx={{
                            bgcolor: 'background.paper',
                            borderRadius: '12px', // Match search bar radius
                            p: 1,
                            width: '100%',
                            position: 'relative', // Context for arrow buttons
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        }}
                    >
                        {showLeft && (
                            <IconButton onClick={() => scroll('left')} color="primary" size="small"
                                sx={{ position: 'absolute', left: -15, top: '50%', transform: 'translateY(-50%)', zIndex: 3, bgcolor: 'rgba(255,255,255,0.9)', boxShadow: 3, '&:hover': { bgcolor: 'white' } }}>
                                <ArrowBackIosNew fontSize="inherit" />
                            </IconButton>
                        )}
                        <Box
                            ref={scrollRef}
                            sx={{ display: 'flex', overflowX: 'auto', gap: 1.5, px: 2, py: 1, scrollBehavior: 'smooth', '&::-webkit-scrollbar': { display: 'none' }, msOverflowStyle: 'none', scrollbarWidth: 'none' }}
                        >
                            <CategoryCard name="All" slug="" icon={<AllInclusive sx={{ fontSize: isMobile ? 30 : 36, color: theme.palette.primary.main }} />} isSelected={filters.category__slug === ''} onClick={handleCategoryClick} isMobile={isMobile} />
                            {categories.map((cat) => (
                                <CategoryCard key={cat.id} name={cat.name} slug={cat.slug} icon={cat.icon_url} isSelected={filters.category__slug === cat.slug} onClick={handleCategoryClick} isMobile={isMobile} />
                            ))}
                        </Box>
                        {showRight && (
                            <IconButton onClick={() => scroll('right')} color="primary" size="small"
                                sx={{ position: 'absolute', right: -15, top: '50%', transform: 'translateY(-50%)', zIndex: 3, bgcolor: 'rgba(255,255,255,0.9)', boxShadow: 3, '&:hover': { bgcolor: 'white' } }}>
                                <ArrowForwardIos fontSize="inherit" />
                            </IconButton>
                        )}
                    </Box>
                </Box>

                {/* --- Product Grid --- */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        borderRadius: '12px', // Match search bar radius
                        p: { xs: 2, sm: 3 },
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    }}
                >
                    <Typography variant="h5" fontWeight={600} color="text.primary" sx={{ mb: 3 }}>
                        {filters.category__slug ? categories.find(c => c.slug === filters.category__slug)?.name || 'Products' : 'All Products'}
                    </Typography>

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>
                    ) : error ? (
                        <Alert severity="error" variant="outlined" sx={{ mt: 2 }}>{error}</Alert> // Use outlined Alert
                    ) : (
                        <Grid container spacing={2.5}> {/* Standard grid spacing */}
                            {products.map((product) => (
                                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                                    <ProductCard product={product} />
                                </Grid>
                            ))}
                        </Grid>
                    )}

                    {products.length === 0 && !loading && !error && (
                        <Typography variant="body1" align="center" color="text.secondary" sx={{ py: 6 }}>
                            No products found matching your criteria. Try adjusting your search or filters.
                        </Typography>
                    )}
                </Box>
            </Container>
        </Box>
    );
};

// --- Category Card Component --- (Slightly refined styling)
const CategoryCard = ({ name, slug, icon, isSelected, onClick, isMobile }) => {
    const theme = useTheme();
    const iconContent = typeof icon === 'string'
        ? <img src={icon} alt={name} style={{ width: '55%', height: '55%', objectFit: 'contain', borderRadius: '6px' }} onError={(e) => { e.target.style.display = 'none'; }} />
        : icon;

    return (
        <Card
            elevation={isSelected ? 3 : 0} // Subtle elevation change
            sx={{
                flex: '0 0 auto', width: isMobile ? 70 : 85, height: isMobile ? 70 : 85, // Slightly smaller
                borderRadius: '10px', // Softer corners
                transition: 'all 0.2s ease-in-out',
                border: isSelected ? `2px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.divider}`,
                cursor: 'pointer',
                bgcolor: isSelected ? theme.palette.action.hover : 'transparent', // Highlight selected background
                '&:hover': { transform: 'scale(1.05)', boxShadow: theme.shadows[3], borderColor: theme.palette.primary.light },
            }}
            onClick={() => onClick(slug)}
        >
            <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 0.5 }}>
                <Box sx={{ height: '55%', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 0.5 }}>{iconContent}</Box>
                <Typography variant="caption" align="center" sx={{ color: theme.palette.text.primary, fontWeight: isSelected ? 600 : 400, lineHeight: 1.1, fontSize: isMobile ? '0.6rem' : '0.65rem', px: 0.5 }}>
                    {name}
                </Typography>
            </CardActionArea>
        </Card>
    );
};

export default ProductList;