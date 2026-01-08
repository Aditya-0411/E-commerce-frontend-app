


// // src/pages/Profile.jsx - WITH EDIT FUNCTIONALITY

// import React, { useState, useEffect } from 'react';
// import { Container, Typography, Box, Paper, Grid, Divider, Button, CircularProgress, Alert, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField, MenuItem } from '@mui/material';
// import CheckIcon from '@mui/icons-material/Check';
// import { useAuth } from '../context/AuthContext';
// import api from '../api';
// import { toast } from 'react-toastify';
// import { Email, Phone, CalendarToday, Person, Store, Edit, Save } from '@mui/icons-material';
// import { Link } from 'react-router-dom';

// const Profile = () => {
//     const { user: contextUser, isAuthenticated, logout } = useAuth();
    
//     // 1. STATE MANAGEMENT
//     const [profileData, setProfileData] = useState(null);
//     const [notifications, setNotifications] = useState([]);
//     const [isEditing, setIsEditing] = useState(false); // New state for toggling edit mode
//     const [editForm, setEditForm] = useState({});       // State for editable fields
    
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [submitting, setSubmitting] = useState(false);

//     // 2. FETCHING DATA
//     const fetchProfileData = async () => {
//         if (!isAuthenticated) return;
//         setLoading(true);
//         try {
//             const [profileRes, notifRes] = await Promise.all([
//                 api.get('/accounts/profile/'),
//                 api.get('/accounts/notifications/')
//             ]);
            
//             const userData = profileRes.data;
//             setProfileData(userData);
//             // Initialize edit form state with current user data
//             setEditForm({
//                 name: userData.name,
//                 email: userData.email,
//                 gender: userData.gender,
//                 date_of_birth: userData.date_of_birth,
//                 referral_code: userData.referral_code || '',
//             });
//             setNotifications(notifRes.data.results || notifRes.data);
//         } catch (err) {
//             setError("Failed to fetch profile data.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchProfileData();
//     }, [isAuthenticated]);

//     // 3. EDIT HANDLERS
//     const handleEditChange = (e) => {
//         setEditForm({ ...editForm, [e.target.name]: e.target.value });
//     };

//     const handleSave = async () => {
//         setSubmitting(true);
//         setError(null);
//         try {
//             // Note: The phone_number is intentionally NOT editable here as it's the USERNAME_FIELD
//             const payload = {
//                 name: editForm.name,
//                 email: editForm.email,
//                 gender: editForm.gender,
//                 date_of_birth: editForm.date_of_birth,
//                 // Only send referral_code if it's explicitly part of the update
//             };

//             await api.patch('/accounts/profile/', payload); 
            
//             toast.success("Profile updated successfully!");
//             setIsEditing(false); // Exit edit mode
//             fetchProfileData(); // Reload data to show updated profile
//         } catch (err) {
//             setError(err.response?.data?.detail || JSON.stringify(err.response?.data) || "Failed to save profile.");
//         } finally {
//             setSubmitting(false);
//         }
//     };
    
//     const handleMarkRead = async (id) => {
//         try {
//             await api.post(`/accounts/notifications/${id}/read/`);
//             setNotifications(notif => notif.map(n => n.id === id ? { ...n, is_read: true } : n));
//             toast.success("Notification marked as read.");
//         } catch (err) {
//             toast.error("Could not mark as read.");
//         }
//     };

//     if (loading) return <Container sx={{ py: 4, textAlign: 'center' }}><CircularProgress /></Container>;
//     if (error || !profileData) return <Alert severity="error">{(error || 'User profile not found.')}</Alert>;

//     const initials = profileData.name ? profileData.name.charAt(0).toUpperCase() : '?';
//     const isApprovedSeller = profileData.seller_status === 'approved';
//     const isPendingSeller = profileData.seller_status === 'pending';


//     // Helper function for display rows
//     const DetailRow = ({ Icon, label, value }) => (
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
//             <Icon color="primary" sx={{ fontSize: 20 }} />
//             <Typography>
//                 <strong>{label}:</strong> {value || 'N/A'}
//             </Typography>
//         </Box>
//     );

//     return (
//         <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//             <Typography variant="h4" gutterBottom fontWeight="bold">My Profile</Typography>
//             <Grid container spacing={4}>
                
//                 {/* 1. User Details and Edit Form */}
//                 <Grid item xs={12} md={6}>
//                     <Paper sx={{ p: 4, borderRadius: 2 }}>
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                             <Typography variant="h5">Personal Information</Typography>
//                             {isEditing ? (
//                                 <Box>
//                                     <Button onClick={handleSave} disabled={submitting} startIcon={<Save />} color="success" variant="contained" size="small">
//                                         {submitting ? <CircularProgress size={20} color="inherit" /> : 'Save'}
//                                     </Button>
//                                     <Button onClick={() => setIsEditing(false)} disabled={submitting} size="small" sx={{ ml: 1 }}>
//                                         Cancel
//                                     </Button>
//                                 </Box>
//                             ) : (
//                                 <IconButton onClick={() => setIsEditing(true)} color="primary">
//                                     <Edit />
//                                 </IconButton>
//                             )}
//                         </Box>
                        
//                         <Divider sx={{ mb: 3 }} />

//                         {/* Display or Edit Fields */}
//                         <Grid container spacing={2}>
//                             <Grid item xs={12} sm={6}>
//                                 {isEditing ? (
//                                     <TextField fullWidth label="Name" name="name" value={editForm.name} onChange={handleEditChange} required size="small" />
//                                 ) : (
//                                     <DetailRow Icon={Person} label="Name" value={profileData.name} />
//                                 )}
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                                 <DetailRow Icon={Phone} label="Phone" value={profileData.phone_number} />
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                                 {isEditing ? (
//                                     <TextField fullWidth label="Email" name="email" value={editForm.email} onChange={handleEditChange} required size="small" type="email" />
//                                 ) : (
//                                     <DetailRow Icon={Email} label="Email" value={profileData.email} />
//                                 )}
//                             </Grid>
//                             <Grid item xs={12} sm={6}>
//                                 {isEditing ? (
//                                     <TextField fullWidth select label="Gender" name="gender" value={editForm.gender} onChange={handleEditChange} required size="small">
//                                         <MenuItem value="M">Male</MenuItem>
//                                         <MenuItem value="F">Female</MenuItem>
//                                         <MenuItem value="O">Other</MenuItem>
//                                     </TextField>
//                                 ) : (
//                                     <DetailRow Icon={Person} label="Gender" value={profileData.gender === 'M' ? 'Male' : profileData.gender === 'F' ? 'Female' : 'Other'} />
//                                 )}
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <DetailRow Icon={CalendarToday} label="DOB" value={profileData.date_of_birth} />
//                             </Grid>
//                         </Grid>
                        
//                         <Divider sx={{ my: 3 }} />

//                         {/* Seller Status Section */}
//                         <Typography variant="subtitle1" gutterBottom sx={{ color: 'primary.main', mb: 1 }}>Seller Status</Typography>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                             <Store color="primary" />
//                             <Typography>
//                                 Status: <strong>{profileData.seller_status ? profileData.seller_status.toUpperCase() : 'NOT REGISTERED'}</strong>
//                             </Typography>
//                         </Box>

//                         <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
//                             {/* Conditional Seller Registration Button */}
//                             {!isApprovedSeller && (
//                                 <Button 
//                                     component={Link} 
//                                     to="/seller/register" 
//                                     variant="contained" 
//                                     size="small"
//                                     color={isPendingSeller ? "warning" : "primary"}
//                                 >
//                                     {isPendingSeller ? 'View Application Status' : 'Become a Seller'}
//                                 </Button>
//                             )}
//                         </Box>

//                     </Paper>
//                 </Grid>

//                 {/* 2. Notifications Section */}
//                 <Grid item xs={12} md={6}>
//                     <Paper sx={{ p: 4, borderRadius: 2 }}>
//                         <Typography variant="h5" gutterBottom>Notifications</Typography>
//                         <Divider sx={{ mb: 2 }} />
//                         <List dense sx={{ maxHeight: 500, overflowY: 'auto' }}>
//                             {notifications.length === 0 ? (
//                                 <Typography color="text.secondary">No notifications.</Typography>
//                             ) : (
//                                 notifications.map((n) => (
//                                     <ListItem key={n.id} disablePadding sx={{ opacity: n.is_read ? 0.6 : 1, bgcolor: n.is_read ? 'inherit' : 'grey.50' }}>
//                                         <ListItemText 
//                                             primary={n.title} 
//                                             secondary={n.message} 
//                                             primaryTypographyProps={{ fontWeight: n.is_read ? 'normal' : 'bold' }}
//                                         />
//                                         <ListItemSecondaryAction>
//                                             {!n.is_read && (
//                                                 <IconButton edge="end" onClick={() => handleMarkRead(n.id)} size="small">
//                                                     <CheckIcon fontSize="small" color="success" />
//                                                 </IconButton>
//                                             )}
//                                         </ListItemSecondaryAction>
//                                     </ListItem>
//                                 ))
//                             )}
//                         </List>
//                     </Paper>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// };

// export default Profile;










// src/pages/Profile.jsx
import React, { useState, useEffect, useCallback } from 'react';
import {
    Container, Typography, Box, Paper, Grid, Divider, Button, CircularProgress,
    Alert, List, ListItem, ListItemText, IconButton,
    TextField, MenuItem, useTheme, Chip
} from '@mui/material';
import {
    Check as CheckIcon, Email, Phone, CalendarToday, Person, Store, Edit, Save,
    ConfirmationNumber as ConfirmationNumberIcon,
    Notifications as NotificationsIcon,
    ManageAccounts as ManageAccountsIcon
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    const theme = useTheme();
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    // State Management
    const [profileData, setProfileData] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        name: '', email: '', gender: '', date_of_birth: '', referral_code: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated && !loading) {
            toast.warn("Please log in to view your profile.");
            navigate('/login');
        }
    }, [isAuthenticated, loading, navigate]);

    // Fetching Data
    const fetchProfileData = useCallback(async () => {
        if (!isAuthenticated) { setLoading(false); return; }
        setLoading(true); setError(null);
        try {
            const [profileRes, notifRes] = await Promise.allSettled([
                api.get('/accounts/profile/'),
                api.get('/accounts/notifications/')
            ]);

            if (profileRes.status === 'fulfilled') {
                const userData = profileRes.value.data;
                setProfileData(userData);
                setEditForm({
                    name: userData.name || '', email: userData.email || '', gender: userData.gender || '',
                    date_of_birth: userData.date_of_birth || '', referral_code: userData.referral_code || '',
                });
            } else {
                 console.error("Error fetching profile:", profileRes.reason);
                 setError(prev => prev ? `${prev}\nFailed to fetch profile data.` : "Failed to fetch profile data.");
                 setProfileData(null);
            }

            if (notifRes.status === 'fulfilled') {
                const data = notifRes.value.data;
                setNotifications(Array.isArray(data.results) ? data.results : Array.isArray(data) ? data : []);
            } else {
                console.error("Error fetching notifications:", notifRes.reason);
                setError(prev => prev ? `${prev}\nFailed to fetch notifications.` : "Failed to fetch notifications.");
                setNotifications([]);
            }
        } catch (err) {
            console.error("Unexpected error fetching data:", err);
            setError("An unexpected error occurred while fetching data.");
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated]);

    useEffect(() => { fetchProfileData(); }, [fetchProfileData]);

    // Edit Handlers
    const handleEditChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value });

    const handleSave = async () => {
        setSubmitting(true);
        setError(null);
        try {
            const payload = {
                name: editForm.name, email: editForm.email,
                gender: editForm.gender, date_of_birth: editForm.date_of_birth || null,
            };
            await api.patch('/accounts/profile/', payload);
            toast.success("Profile updated successfully!");
            setIsEditing(false);
            fetchProfileData();
        } catch (err) {
            console.error("Error saving profile:", err.response?.data || err);
            const apiError = err.response?.data;
            let errorMessage = "Failed to save profile.";
            if (apiError) {
                 if (apiError.email) errorMessage = `Email Error: ${apiError.email[0]}`;
                 else if (apiError.detail) errorMessage = apiError.detail;
                 else errorMessage = `Error: ${JSON.stringify(apiError)}`;
            }
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    const handleMarkRead = async (id) => {
        const previousNotifications = notifications;
        setNotifications(notif => notif.map(n => n.id === id ? { ...n, is_read: true } : n));
        try {
            await api.post(`/accounts/notifications/${id}/read/`);
        } catch (err) {
            toast.error("Could not mark as read. Please try again.");
            setNotifications(previousNotifications);
        }
    };

    if (loading) return <Container sx={{ py: 6, textAlign: 'center' }}><CircularProgress color="primary" /></Container>;
    if (!isAuthenticated && !loading) return null;

    if (!profileData && !loading) return (
         <Container maxWidth="sm" sx={{mt: 4, mb: 4}}>
            <Alert severity="error" variant="filled">{(error || 'Could not load essential profile data.')}</Alert>
         </Container>
    );

    const isApprovedSeller = profileData?.seller_status === 'approved';
    const isPendingSeller = profileData?.seller_status === 'pending';

    return (
        <Box sx={{ py: { xs: 3, md: 5 }, bgcolor: 'background.default', minHeight: 'calc(100vh - 64px)' }}>
            <Container maxWidth="lg">
                <Typography variant="h3" component="h1" fontWeight={700} sx={{ mb: 4, color: 'secondary.main' }}>
                    My Profile
                </Typography>

                {error && !submitting && <Alert severity="error" variant="filled" sx={{ mb: 3 }}>{error}</Alert>}

                <Grid container spacing={4}>
                    {/* 1. User Details Card */}
                    <Grid item xs={12} md={7}>
                        <Paper sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1}}>
                                     <ManageAccountsIcon color="primary" />
                                    <Typography variant="h5" fontWeight={600} color="text.primary">Personal Information</Typography>
                                </Box>
                                {isEditing ? (
                                    <Box>
                                        <Button onClick={handleSave} disabled={submitting} startIcon={<Save />} color="success" variant="contained" size="small">
                                            {submitting ? <CircularProgress size={20} color="inherit" /> : 'Save'}
                                        </Button>
                                        <Button onClick={() => { setIsEditing(false); setError(null); }} disabled={submitting} size="small" sx={{ ml: 1 }}>
                                            Cancel
                                        </Button>
                                    </Box>
                                ) : (
                                    <IconButton onClick={() => setIsEditing(true)} color="primary" aria-label="Edit profile"><Edit /></IconButton>
                                )}
                            </Box>
                            <Divider sx={{ mb: 3, borderColor: 'rgba(255, 255, 255, 0.12)' }} />
                            
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    {isEditing ? <TextField fullWidth label="Name" name="name" value={editForm.name} onChange={handleEditChange} required size="small" /> : <DetailRow IconComponent={Person} label="Name" value={profileData.name} />}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <DetailRow IconComponent={Phone} label="Phone" value={profileData.phone_number} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {isEditing ? <TextField fullWidth label="Email" name="email" value={editForm.email} onChange={handleEditChange} required size="small" type="email" /> : <DetailRow IconComponent={Email} label="Email" value={profileData.email} />}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                     {isEditing ? (
                                         <TextField fullWidth select label="Gender" name="gender" value={editForm.gender || ''} onChange={handleEditChange} size="small">
                                             <MenuItem value=""><em>Select...</em></MenuItem>
                                             <MenuItem value="M">Male</MenuItem> <MenuItem value="F">Female</MenuItem> <MenuItem value="O">Other</MenuItem>
                                         </TextField>
                                      ) : (
                                         <DetailRow IconComponent={Person} label="Gender" value={profileData.gender === 'M' ? 'Male' : profileData.gender === 'F' ? 'Female' : profileData.gender === 'O' ? 'Other' : ''} />
                                      )}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                     {isEditing ? (
                                         <TextField fullWidth label="Date of Birth" name="date_of_birth" value={editForm.date_of_birth || ''} onChange={handleEditChange} size="small" type="date" InputLabelProps={{ shrink: true }} />
                                      ) : (
                                         <DetailRow IconComponent={CalendarToday} label="DOB" value={profileData.date_of_birth} />
                                      )}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <DetailRow IconComponent={ConfirmationNumberIcon} label="Referral Code" value={profileData.referral_code} />
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.12)' }} />

                             <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>Account Status</Typography>
                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                 <Store sx={{ color: theme.palette.primary.main }} />
                                 <Typography variant="body1" color="text.secondary">
                                     Seller Status: <Chip
                                                 label={profileData.seller_status ? profileData.seller_status.replace('_', ' ').toUpperCase() : 'NOT REGISTERED'}
                                                 size="small"
                                                 color={isApprovedSeller ? "success" : isPendingSeller ? "warning" : "default"}
                                                 variant="outlined" sx={{ ml: 0.5, fontWeight: 600 }}
                                             />
                                 </Typography>
                             </Box>
                             <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                 {!isApprovedSeller && <Button component={Link} to="/seller/register" variant="contained" size="small" color={isPendingSeller ? "secondary" : "primary"} startIcon={<Store />}>{isPendingSeller ? 'Application Pending' : 'Become a Seller'}</Button>}
                                 <Button component={Link} to="/addresses" variant="outlined" size="small">Manage Addresses</Button>
                             </Box>
                        </Paper>
                    </Grid>

                    {/* 2. Notifications Card */}
                    <Grid item xs={12} md={5}>
                        <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, height: '100%' }}>
                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2}}>
                                <NotificationsIcon color="primary" />
                                <Typography variant="h5" fontWeight={600} color="text.primary">Recent Notifications</Typography>
                            </Box>
                            <Divider sx={{ mb: 2, borderColor: 'rgba(255, 255, 255, 0.12)' }} />
                            <List dense sx={{ maxHeight: {xs: 300, md: 500}, overflowY: 'auto', p: 0, pr: 1 }}>
                                {notifications.length === 0 ? (
                                    <Typography color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>No notifications yet.</Typography>
                                ) : (
                                    notifications.map((n) => (
                                        <ListItem
                                            key={n.id}
                                            disablePadding
                                            sx={{
                                                opacity: n.is_read ? 0.7 : 1,
                                                bgcolor: n.is_read ? 'transparent' : alpha(theme.palette.primary.main, 0.08),
                                                borderBottom: '1px solid', borderColor: 'divider',
                                                '&:last-child': { borderBottom: 'none' },
                                                px: 1, py: 1
                                            }}
                                            // ✅ FIX: The secondaryAction prop is now syntactically correct
                                            secondaryAction={
                                                !n.is_read ? (
                                                    <IconButton
                                                        edge="end"
                                                        onClick={() => handleMarkRead(n.id)}
                                                        size="small"
                                                        aria-label="Mark as read"
                                                    >
                                                        <CheckIcon fontSize="small" color="success" />
                                                    </IconButton>
                                                ) : null
                                            }
                                        >
                                            <ListItemText
                                                primary={n.title}
                                                secondary={n.message}
                                                primaryTypographyProps={{ fontWeight: n.is_read ? 'normal' : 'bold', color: 'text.primary', fontSize: '0.9rem' }}
                                                secondaryTypographyProps={{ color: 'text.secondary', fontSize: '0.8rem' }}
                                            />
                                        </ListItem>
                                    ))
                                )}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

// Helper component for display rows
const DetailRow = ({ IconComponent, label, value }) => {
     const theme = useTheme();
     return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5, wordBreak: 'break-word' }}>
            <IconComponent sx={{ fontSize: 22, color: theme.palette.primary.main }} />
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                <Box component="span" sx={{ fontWeight: 600, color: theme.palette.text.primary, mr: 0.5 }}>{label}:</Box>
                {value || 'N/A'}
            </Typography>
        </Box>
     );
};

export default Profile;