
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, CircularProgress, Alert, useTheme } from '@mui/material';
import { Gavel, EventAvailable } from '@mui/icons-material';
import api from '../utils/api';
import RichTextRenderer from '../utils/RichTextRenderer'; // Ensure this path is correct

const TermsAndConditions = () => {
    const theme = useTheme();
    const [policyData, setPolicyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPolicyData = async () => {
            try {
                const response = await api.get('/accounts/about/');
                const policies = response.data.policies || {};
                const content = policies.terms_of_use;

                if (!content) {
                    throw new Error('Terms and Conditions content not found in API response.');
                }

                setPolicyData({
                    content: content,
                    lastUpdated: response.data.last_updated || 'October 22, 2025', // Fallback
                });
            } catch (err) {
                console.error("Failed to load Terms & Conditions:", err);
                setError(err.message || 'Failed to load content from the server.');
            } finally {
                setLoading(false);
            }
        };
        fetchPolicyData();
    }, []);

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', my: 10 }}><CircularProgress color="secondary" /></Box>;
    }

    if (error || !policyData?.content) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Alert severity="error" variant="filled">{error || 'Content is currently unavailable.'}</Alert>
            </Container>
        );
    }

    return (
        <Box sx={{ bgcolor: '#f4f6f8', py: { xs: 4, md: 6 }, minHeight: 'calc(100vh - 64px)' }}>
            <Container maxWidth="md">
                {/* ---- HEADER ---- */}
                <Box textAlign="center" mb={5}>
                    <Gavel color="secondary" sx={{ fontSize: 60, mb: 1 }} />
                    <Typography variant="h3" component="h1" fontWeight={800} color="text.primary" gutterBottom>
                        Terms & Conditions
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
                        bgcolor: '#ffffff', // Explicit white background
                        borderTop: '5px solid',
                        borderColor: 'secondary.main',
                        // ✅ Styles to ensure all text inside is dark and readable
                        color: 'rgba(0, 0, 0, 0.87)', // Default dark text color
                        '& h1, & h2, & h3, & h4, & h5, & h6': {
                            color: 'rgba(0, 0, 0, 0.87)',
                            fontWeight: 600,
                            marginBottom: theme.spacing(1.5),
                        },
                        '& p': {
                            color: 'rgba(0, 0, 0, 0.6)', // Slightly lighter for body text
                            lineHeight: 1.7,
                            marginBottom: theme.spacing(2),
                        },
                        '& a': {
                            color: theme.palette.primary.main,
                            textDecoration: 'underline',
                            fontWeight: 500,
                        },
                        '& ul, & ol': {
                            paddingLeft: theme.spacing(3),
                            color: 'rgba(0, 0, 0, 0.6)',
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

export default TermsAndConditions;










// // src/pages/TermsAndConditions.jsx
// import React from 'react';
// import { Gavel } from '@mui/icons-material';
// import PolicyPageTemplate from '../components/common/PolicyPageTemplate';

// const TermsAndConditions = () => (
//   <PolicyPageTemplate
//     title="Terms & Conditions"
//     icon={Gavel}
//     iconColor="secondary"
//     policyKey="terms_of_use"
//   />
// );

// export default TermsAndConditions;
