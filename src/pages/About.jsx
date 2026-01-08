// // src/pages/About.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Typography,
//   Box,
//   Paper,
//   CircularProgress,
//   Alert,
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Grid,
// } from '@mui/material';
// import {
//   Info,
//   ContactMail,
//   Code,
//   LocationOn,
//   Phone as PhoneIcon,
//   Policy,
//   ExpandMore,
//   MailOutline,
// } from '@mui/icons-material';
// import api from '../api';

// // ✅ Parse privacy policy into sections
// const parsePrivacyPolicy = (policyText) => {
//   if (typeof policyText !== 'string') return [];

//   const sections = policyText.split('# ---');

//   return sections
//     .filter((s) => s && s.trim())
//     .map((section) => {
//       const lines = section.trim().split('\n');
//       const titleLine = lines[0]?.trim() || 'Untitled Section';
//       const title = titleLine.replace(/#+/, '').trim();
//       const content = lines.slice(1).join('\n').trim();
//       return { title, content };
//     });
// };

// const About = () => {
//   const [aboutData, setAboutData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expanded, setExpanded] = useState(false);

//   useEffect(() => {
//     const fetchAboutData = async () => {
//       try {
//         const response = await api.get('/accounts/about/');
//         setAboutData(response.data);
//       } catch (err) {
//         console.error('Failed to fetch about data:', err);
//         setError('Failed to load company information from the server.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAboutData();
//   }, []);

//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error || !aboutData) {
//     return (
//       <Container maxWidth="md" sx={{ mt: 4 }}>
//         <Alert severity="error">
//           {error || 'Could not load data. Check backend connection.'}
//         </Alert>
//       </Container>
//     );
//   }

//   // ✅ Destructure fields safely
//   const {
//     app,
//     about,
//     contact_email,
//     contact_number,
//     headquarters_address,
//     privacy_policy,
//     feature_flags,
//     version,
//   } = aboutData;

//   const policySections = parsePrivacyPolicy(privacy_policy).filter(
//     (s) =>
//       !s.title.includes('🔒 Zirvanaa Privacy Policy') && // 🚫 Remove overview
//       s.content?.trim() !== ''
//   );

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
//       {/* ---- HEADER ---- */}
//       <Typography
//         variant="h4"
//         gutterBottom
//         align="center"
//         fontWeight="bold"
//         sx={{ mb: 3 }}
//       >
//         About {app}
//       </Typography>

//       {/* ---- ABOUT SECTION ---- */}
//       <Paper
//         elevation={4}
//         sx={{ p: 4, borderRadius: 3, mb: 4, backgroundColor: '#fafafa' }}
//       >
//         <Box sx={{ mb: 4 }}>
//           <Typography
//             variant="h6"
//             color="primary"
//             sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
//           >
//             <Info /> Description & Version
//           </Typography>
//           <Divider sx={{ my: 1 }} />
//           <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
//             {about}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Application Version: {version || 'N/A'}
//           </Typography>
//         </Box>

//         {/* ---- FEATURES ---- */}
//         {feature_flags && (
//           <Box sx={{ mb: 4 }}>
//             <Typography
//               variant="h6"
//               color="primary"
//               sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
//             >
//               <Code /> Feature Status
//             </Typography>
//             <Divider sx={{ my: 1 }} />
//             <List dense>
//               {Object.entries(feature_flags).map(([feature, isEnabled]) => (
//                 <ListItem key={feature}>
//                   <ListItemText
//                     primary={feature.replace(/_/g, ' ').toUpperCase()}
//                     secondary={isEnabled ? 'Enabled (Coming Soon)' : 'Disabled'}
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           </Box>
//         )}
//       </Paper>

//       {/* ---- PRIVACY POLICY ---- */}
//       {policySections.length > 0 && (
//         <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
//           <Typography
//             variant="h5"
//             gutterBottom
//             align="center"
//             fontWeight="bold"
//             sx={{ mb: 2 }}
//           >
//             <Policy sx={{ mr: 1, color: 'primary.main' }} /> Privacy Policy
//           </Typography>
//           <Divider sx={{ mb: 2 }} />

//           {policySections.map((section, index) => (
//             <Accordion
//               key={index}
//               expanded={expanded === `panel${index}`}
//               onChange={handleChange(`panel${index}`)}
//               sx={{
//                 border: 1,
//                 borderColor: 'grey.300',
//                 boxShadow: 'none',
//                 '&:before': { display: 'none' },
//                 mb: 1,
//                 borderRadius: 2,
//               }}
//             >
//               <AccordionSummary
//                 expandIcon={<ExpandMore />}
//                 aria-controls={`panel${index}-content`}
//                 id={`panel${index}-header`}
//                 sx={{
//                   backgroundColor:
//                     expanded === `panel${index}` ? 'primary.light' : 'grey.100',
//                   color: 'text.primary',
//                 }}
//               >
//                 <Typography variant="subtitle1" fontWeight="medium">
//                   {section.title}
//                 </Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography
//                   variant="body2"
//                   component="div"
//                   sx={{
//                     whiteSpace: 'pre-wrap',
//                     pt: 1,
//                     pb: 1,
//                     lineHeight: 1.7,
//                   }}
//                 >
//                   {section.content}
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>
//           ))}
//         </Paper>
//       )}

//       {/* ---- CONTACT & ADDRESS ---- */}
//       <Paper
//         elevation={6}
//         sx={{
//           p: 5,
//           borderRadius: 4,
//           mt: 6,
//           background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
//           color: 'white',
//         }}
//       >
//         <Typography
//           variant="h5"
//           gutterBottom
//           align="center"
//           fontWeight="bold"
//           sx={{ mb: 2 }}
//         >
//           Get In Touch
//         </Typography>
//         <Divider sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.4)' }} />

//         <Grid container spacing={4}>
//           {/* Contact Info */}
//           <Grid item xs={12} md={6}>
//             <Typography
//               variant="h6"
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 1,
//                 mb: 2,
//                 color: 'white',
//               }}
//             >
//               <ContactMail /> Support
//             </Typography>
//             <List dense>
//               <ListItem sx={{ color: 'white' }}>
//                 <MailOutline sx={{ mr: 1, color: 'white' }} />
//                 <ListItemText primary={`Email: ${contact_email}`} />
//               </ListItem>
//               <ListItem sx={{ color: 'white' }}>
//                 <PhoneIcon sx={{ mr: 1, color: 'white' }} />
//                 <ListItemText primary={`Phone: ${contact_number}`} />
//               </ListItem>
//             </List>
//           </Grid>

//           {/* Address */}
//           {headquarters_address && (
//             <Grid item xs={12} md={6}>
//               <Typography
//                 variant="h6"
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 1,
//                   mb: 2,
//                   color: 'white',
//                 }}
//               >
//                 <LocationOn /> Headquarters
//               </Typography>
//               <Typography variant="body1" sx={{ color: 'white' }}>
//                 {headquarters_address.street}
//               </Typography>
//               <Typography variant="body1" sx={{ color: 'white' }}>
//                 {headquarters_address.city}, {headquarters_address.state} -{' '}
//                 {headquarters_address.pincode}
//               </Typography>
//             </Grid>
//           )}
//         </Grid>
//       </Paper>
//     </Container>
//   );
// };

// export default About;





// // src/pages/About.jsx - FINAL VERSION

// import React, { useState, useEffect } from 'react';
// import { 
//     Container, Typography, Box, Paper, CircularProgress, Alert, Divider, 
//     List, ListItem, ListItemText, Accordion, AccordionSummary, AccordionDetails, 
//     Grid 
// } from '@mui/material';
// import { 
//     Info, ContactMail, Code, LocationOn, Policy, 
//     ExpandMore, MailOutline, Phone as PhoneIcon 
// } from '@mui/icons-material';
// import api from '../api';

// // --- Policy Structure ---
// const POLICY_TABS = [
//     { label: "Terms & Conditions", key: "terms_of_use" },
//     { label: "Privacy Policy & Legal", key: "privacy_policy" }, 
//     // Note: Privacy Policy key is used to hold both Privacy and Refund/Shipping policies 
// ];


// // --- Helper Component: Policy Accordion ---
// const PolicyAccordion = ({ title, content, index, expanded, handleChange }) => (
//     <Accordion
//         key={index}
//         expanded={expanded === `panel${index}`}
//         onChange={handleChange(`panel${index}`)}
//         sx={{
//             border: 1,
//             borderColor: 'grey.300',
//             boxShadow: 'none',
//             '&:before': { display: 'none' },
//             mb: 1,
//             borderRadius: 1,
//             transition: 'background-color 0.3s',
//         }}
//     >
//         <AccordionSummary
//             expandIcon={<ExpandMore />}
//             aria-controls={`panel${index}-content`}
//             id={`panel${index}-header`}
//             sx={{
//                 backgroundColor: expanded === `panel${index}` ? 'primary.lightest' : 'grey.100',
//                 '&:hover': { backgroundColor: 'grey.200' },
//                 borderRadius: expanded === `panel${index}` ? '4px 4px 0 0' : '4px',
//             }}
//         >
//             <Typography variant="subtitle1" fontWeight="medium">
//                 {title}
//             </Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//             <Typography
//                 variant="body2"
//                 component="div"
//                 sx={{
//                     whiteSpace: 'pre-line', // Preserves newlines/formatting from Python string
//                     pt: 1,
//                     pb: 1,
//                     lineHeight: 1.7,
//                 }}
//             >
//                 {content}
//             </Typography>
//         </AccordionDetails>
//     </Accordion>
// );


// const About = () => {
//   const [aboutData, setAboutData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expanded, setExpanded] = useState(false); // State for controlling Accordions

//   useEffect(() => {
//     const fetchAboutData = async () => {
//       try {
//         // Use the correct API path /accounts/about/
//         const response = await api.get('/accounts/about/'); 
//         setAboutData(response.data);
//       } catch (err) {
//         setError('Failed to load company information from the server.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAboutData();
//   }, []);

//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>
//     );
//   }
//   if (error || !aboutData || !aboutData.policies) {
//     return (
//       <Container maxWidth="md" sx={{ mt: 4 }}><Alert severity="error">{error || 'Could not load data.'}</Alert></Container>
//     );
//   }
  
//   // Destructure fields safely
//   const {
//     app,
//     about,
//     contact_email,
//     contact_number,
//     headquarters_address,
//     policies,
//     feature_flags,
//     version,
//   } = aboutData;

//   // FIX: Create the policy list directly from the two available backend keys
//   const policyList = policies ? [
//       { title: "Terms & Conditions", content: policies.terms_of_use },
//       { title: "Privacy Policy & Legal Documents", content: policies.privacy_policy },
//   ].filter(p => p.content?.trim()) : [];


//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      
//       {/* ---- 1. HEADER & GENERAL INFO ---- */}
//       <Paper elevation={4} sx={{ p: 4, borderRadius: 2, mb: 4, backgroundColor: '#fafafa' }}>
//         <Typography variant="h4" gutterBottom align="center" fontWeight="bold">{app}</Typography>
//         <Typography variant="subtitle1" align="center" color="text.secondary">Version: {version}</Typography>
//         <Divider sx={{ my: 3 }} />
        
//         <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
//             <Info color="primary" sx={{ fontSize: 24, mt: 0.5 }} />
//             <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
//                 {about}
//             </Typography>
//         </Box>
        
//         {/* ---- FEATURE FLAGS (Compact List) ---- */}
//         {feature_flags && (
//             <Box sx={{ mt: 2 }}>
//                 <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                     <Code color="primary" sx={{ fontSize: 20 }} /> Key Features & Status
//                 </Typography>
//                 <List dense sx={{ display: 'flex', flexWrap: 'wrap' }}>
//                     {Object.entries(feature_flags).map(([feature, isEnabled]) => (
//                         <ListItem key={feature} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, py: 0.5 }}>
//                             <ListItemText 
//                                 primary={feature.replace(/_/g, ' ').toUpperCase()} 
//                                 secondary={isEnabled ? 'Enabled (Coming Soon)' : 'Disabled'}
//                                 primaryTypographyProps={{ fontWeight: 'medium' }}
//                             />
//                         </ListItem>
//                     ))}
//                 </List>
//             </Box>
//         )}
//       </Paper>

//       {/* ---- 2. POLICIES & DOCUMENTS (ACCORDION) ---- */}
//       {policyList.length > 0 && (
//         <Box sx={{ mb: 4 }}>
//             <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <Policy color="primary" /> Company Policies
//             </Typography>
            
//             {policyList.map((section, index) => (
//                 <PolicyAccordion
//                     key={index}
//                     index={index}
//                     title={section.title}
//                     content={section.content}
//                     expanded={expanded}
//                     handleChange={handleChange}
//                 />
//             ))}
//         </Box>
//       )}

//       {/* ---- 3. STYLED CONTACT FOOTER ---- */}
//       <Paper
//         elevation={6}
//         sx={{
//           p: 4,
//           borderRadius: 2,
//           bgcolor: 'primary.main', 
//           color: 'white',
//         }}
//       >
//         <Typography variant="h5" align="center" fontWeight="bold" sx={{ mb: 3 }}>
//           Get In Touch
//         </Typography>
        
//         <Grid container spacing={3}>
//             {/* Contact Info */}
//             <Grid item xs={12} md={6}>
//                 <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
//                     <ContactMail /> Support
//                 </Typography>
//                 <List dense sx={{ '& .MuiListItemText-primary': { color: 'white' }, '& .MuiListItem-root': { py: 0.5 } }}>
//                     <ListItem disableGutters>
//                         <MailOutline sx={{ mr: 1, fontSize: 20 }} />
//                         <ListItemText primary={`Email: ${contact_email}`} />
//                     </ListItem>
//                     <ListItem disableGutters>
//                         <PhoneIcon sx={{ mr: 1, fontSize: 20 }} />
//                         <ListItemText primary={`Phone: ${contact_number}`} />
//                     </ListItem>
//                 </List>
//             </Grid>
            
//             {/* Address */}
//             {headquarters_address && (
//                 <Grid item xs={12} md={6}>
//                     <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
//                         <LocationOn /> Headquarters
//                     </Typography>
//                     <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
//                         {headquarters_address.street}
//                     </Typography>
//                     <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
//                         {headquarters_address.city}, {headquarters_address.state} - {headquarters_address.pincode}
//                     </Typography>
//                 </Grid>
//             )}
//         </Grid>
//       </Paper>
//     </Container>
//   );
// };

// export default About;



import React, { useState, useEffect } from 'react';
import { 
    Container, Typography, Box, Paper, CircularProgress, Alert, Divider, 
    List, ListItem, ListItemText, Grid, Link as MuiLink, Chip 
} from '@mui/material';
import { 
    Info, ContactMail, Code, LocationOn, MailOutline, Phone as PhoneIcon, 
    Apartment, // <-- Changed from PersonPin
    CheckCircleOutline, CancelOutlined 
} from '@mui/icons-material';
import api from '../utils/api';

const About = () => {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                // Fetching data from the confirmed backend endpoint
                const response = await api.get('/accounts/about/'); 
                setAboutData(response.data);
            } catch (err) {
                console.error("API Error:", err);
                setError('Failed to load company information from the server. Check API endpoint.');
            } finally {
                setLoading(false);
            }
        };
        fetchAboutData();
    }, []);

    // Helper component for Feature Flags (Unchanged)
    const FeatureChip = ({ feature, isEnabled }) => (
        <ListItem 
            sx={{ width: { xs: '100%', sm: '50%' }, py: 0.5, pl: 0, alignItems: 'flex-start' }}
        >
            <Chip
                icon={isEnabled ? <CheckCircleOutline /> : <CancelOutlined />}
                label={feature.replace(/_/g, ' ').toUpperCase()}
                color={isEnabled ? 'success' : 'error'}
                variant="outlined"
                sx={{
                    fontWeight: 600,
                    borderColor: isEnabled ? 'success.light' : 'error.light',
                    backgroundColor: isEnabled ? '#f0fff4' : '#fff0f0',
                    textTransform: 'uppercase',
                }}
            />
        </ListItem>
    );

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress color="primary" size={60} /></Box>
        );
    }
    if (error || !aboutData) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}><Alert severity="error">{error || 'Could not load company data.'}</Alert></Container>
        );
    }
    
    // --- NO MORE DESTRUCTURING WITH FRONTEND DEFAULTS ---
    // We will access 'aboutData.field' directly in the JSX

    return (
        <Container maxWidth="lg" sx={{ mt: 6, mb: 8 }}>
            
            {/* ---- HEADER SECTION ---- */}
            <Box textAlign="center" mb={6}>
                {/* Using a more appropriate icon for a company */}
                <Apartment color="primary" sx={{ fontSize: 72, mb: 1, color: 'primary.dark' }} />
                
                <Typography variant="h2" fontWeight={900} color="text.primary" gutterBottom>
                    {/* Only show the app name if it exists, otherwise a generic title */}
                    {aboutData?.app ? (
                        <>Welcome to <Box component="span" sx={{ color: 'primary.main' }}>{aboutData.app}</Box></>
                    ) : (
                        'About Our Company'
                    )}
                </Typography>
                
                <Typography variant="h6" color="text.secondary">
                    {/* This subtitle is static as per your original code. 
                        If this should come from the backend, change it to:
                        {aboutData?.tagline} 
                    */}
                    Your trusted platform for quality products and service.
                </Typography>
                
                <Typography variant="subtitle1" color="text.disabled" sx={{ mt: 1 }}>
                    {/* Use nullish coalescing (??) for a safe fallback */}
                    Application Version: {aboutData?.version ?? 'N/A'}
                </Typography>
            </Box>

            <Grid container spacing={5}>
                
                {/* ---- 1. OUR STORY CARD ---- */}
                {/* Only render this card if 'about' text exists */}
                {aboutData?.about && (
                    <Grid item xs={12} md={7}>
                        <Paper elevation={8} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, height: '100%', borderTop: '4px solid', borderColor: 'secondary.main' }}>
                            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Info color="secondary" fontSize="inherit" /> Our Story
                            </Typography>
                            <Divider sx={{ my: 2, borderColor: 'secondary.light' }} />
                            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
                                {aboutData.about}
                            </Typography>
                        </Paper>
                    </Grid>
                )}

                {/* ---- 2. CONTACT AND LOCATION CARD ---- */}
                {/* This card will show, but its *content* is conditional */}
                <Grid item xs={12} md={aboutData?.about ? 5 : 12}> {/* Span full width if 'about' is missing */}
                    <Paper 
                        elevation={8} 
                        sx={{ 
                            p: { xs: 3, md: 5 }, 
                            borderRadius: 3, 
                            bgcolor: 'primary.dark', 
                            color: 'white', 
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}
                    >
                        <Typography variant="h4" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <ContactMail sx={{ fontSize: 32 }} /> Reach Out
                        </Typography>
                        <Divider sx={{ mb: 3, bgcolor: 'rgba(255, 255, 255, 0.5)' }} />
                        
                        {/* Contact Info */}
                        <List sx={{ '& .MuiListItem-root': { py: 1 } }}>
                            
                            {/* Only show Email if it exists */}
                            {aboutData?.contact_email && (
                                <ListItem disableGutters sx={{ py: 0.5 }}>
                                    <MailOutline sx={{ mr: 2, fontSize: 24, color: 'secondary.main' }} />
                                    <MuiLink href={`mailto:${aboutData.contact_email}`} color="inherit" variant="body1" sx={{ fontWeight: 600, textDecoration: 'underline' }}>
                                        {aboutData.contact_email}
                                    </MuiLink>
                                </ListItem>
                            )}

                            {/* Only show Phone if it exists */}
                            {aboutData?.contact_number && (
                                <ListItem disableGutters sx={{ py: 0.5 }}>
                                    <PhoneIcon sx={{ mr: 2, fontSize: 24, color: 'secondary.main' }} />
                                    <MuiLink href={`tel:${aboutData.contact_number}`} color="inherit" variant="body1" sx={{ fontWeight: 600, textDecoration: 'underline' }}>
                                        {aboutData.contact_number}
                                    </MuiLink>
                                </ListItem>
                            )}
                        </List>

                        {/* Address: Only show if 'headquarters_address' object exists */}
                        {aboutData?.headquarters_address && (
                            <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
                                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, fontWeight: 700 }}>
                                    <LocationOn sx={{ color: 'secondary.main' }} /> Headquarters
                                </Typography>
                                
                                {/* Assume street/city/etc. exist if address object exists */}
                                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                                    {aboutData.headquarters_address.street}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                                    {aboutData.headquarters_address.city}, {aboutData.headquarters_address.state} - {aboutData.headquarters_address.pincode}
                                </Typography>
                            </Box>
                        )}
                    </Paper>
                </Grid>
                
                {/* ---- 3. FEATURE FLAGS SECTION (Full Width) ---- */}
                {/* Use ?? {} to safely check keys of a potentially undefined object */}
                {Object.keys(aboutData?.feature_flags ?? {}).length > 0 && (
                    <Grid item xs={12}>
                        <Paper elevation={4} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, bgcolor: '#f7faff' }}>
                            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Code color="primary" fontSize="inherit" /> Development Roadmap
                            </Typography>
                            <Divider sx={{ mb: 3, borderColor: 'primary.light' }} />

                            <Typography variant="body1" color="text.secondary" paragraph>
                                Here is a quick look at the status of our key application services and features.
                            </Typography>

                            <List sx={{ display: 'flex', flexWrap: 'wrap', p: 0 }}>
                                {/* Use ?? {} again to safely map over a potentially undefined object */}
                                {Object.entries(aboutData?.feature_flags ?? {}).map(([feature, isEnabled]) => (
                                    <FeatureChip key={feature} feature={feature} isEnabled={isEnabled} />
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default About;