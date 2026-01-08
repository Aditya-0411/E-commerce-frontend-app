// // src/pages/ShippingPolicy.jsx
// import React from 'react';
// import { LocalShipping } from '@mui/icons-material';
// import PolicyPageTemplate from '../components/common/PolicyPageTemplate';

// const ShippingPolicy = () => (
//   <PolicyPageTemplate
//     title="Shipping Policy"
//     icon={LocalShipping}
//     iconColor="success"
//     policyKey="shipping_policy"
//   />
// );

// export default ShippingPolicy;





// src/pages/policies/ShippingPolicy.jsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, CircularProgress, Alert, useTheme } from '@mui/material';
import { LocalShipping, EventAvailable } from '@mui/icons-material';
import api from '../utils/api'; // Verify path
import RichTextRenderer from '../utils/RichTextRenderer'; // Verify path

const ShippingPolicy = () => {
    const theme = useTheme();
    const [policyData, setPolicyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Key to fetch from the API response
    const POLICY_KEY = 'shipping_policy';
    const PAGE_TITLE = 'Shipping Policy';

    useEffect(() => {
        const fetchPolicyData = async () => {
            try {
const response = await api.get('/accounts/about/', {
    // Override the global headers for this request to ensure no token is sent
    headers: {
        Authorization: undefined, 
    },
});
                const policies = response.data.policies || {};
                const content = policies[POLICY_KEY];

                if (!content) {
                    throw new Error(`${PAGE_TITLE} content not found in API response.`);
                }
                
                setPolicyData({
                    content: content,
                    lastUpdated: response.data.last_updated || 'October 22, 2025', 
                });
            } catch (err) {
                console.error(`Failed to load ${PAGE_TITLE}:`, err);
                setError(err.message || 'Failed to load content from the server.');
            } finally {
                setLoading(false);
            }
        };
        fetchPolicyData();
    }, []);

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}><CircularProgress color="primary" /></Box>;
    }

    if (error || !policyData?.content) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Alert severity="error" variant="filled">{error || 'Content is currently unavailable.'}</Alert>
            </Container>
        );
    }

    // Using theme.palette.success.main for a distinct color (e.g., green/success)
    const pageColor = theme.palette.success.main; 

    return (
        <Box sx={{ bgcolor: '#f4f6f8', py: { xs: 4, md: 6 }, minHeight: 'calc(100vh - 64px)' }}>
            <Container maxWidth="md">
                {/* ---- HEADER ---- */}
                <Box textAlign="center" mb={5}>
                    <LocalShipping sx={{ fontSize: 60, mb: 1, color: pageColor }} />
                    <Typography variant="h3" component="h1" fontWeight={800} color="text.primary" gutterBottom>
                        {PAGE_TITLE}
                    </Typography>
                    <Box display="flex" alignItems="center" justifyContent="center" color="text.secondary">
                        <EventAvailable sx={{ fontSize: 18, mr: 0.5 }} />
                        <Typography variant="body1">
                            Last Updated: <Box component="span" fontWeight={600}>{policyData.lastUpdated}</Box>
                        </Typography>
                    </Box>
                </Box>

                {/* ---- CONTENT BOX ---- */}
                <Paper
                    elevation={4}
                    sx={{
                        p: { xs: 3, md: 5 },
                        borderRadius: 3,
                        bgcolor: '#ffffff',
                        borderTop: '5px solid',
                        borderColor: pageColor, // Distinct color border
                        color: 'rgba(0, 0, 0, 0.87)',
                        '& h1, & h2, & h3, & h4, & h5, & h6': {
                            color: 'rgba(0, 0, 0, 0.87)', fontWeight: 600, marginBottom: theme.spacing(1.5),
                        },
                        '& p': {
                            color: 'rgba(0, 0, 0, 0.6)', lineHeight: 1.7, marginBottom: theme.spacing(2),
                        },
                        '& ul, & ol': {
                            paddingLeft: theme.spacing(3), color: 'rgba(0, 0, 0, 0.6)',
                        },
                        '& li': {
                            marginBottom: theme.spacing(1),
                        }
                    }}
                >
                    <RichTextRenderer content={policyData.content} />
                </Paper>
            </Container>
        </Box>
    );
};

export default ShippingPolicy;