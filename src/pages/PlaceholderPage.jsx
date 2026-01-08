import React from 'react';
import { Box, Container, Typography } from '@mui/material';

// This component serves as a placeholder for all the routes listed in App.js 

const PlaceholderPage = ({ title }) => {
  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
      <Box sx={{ 
        p: 5, 
        borderRadius: 4, 
        backgroundColor: 'background.paper', 
        boxShadow: 3 
      }}>
        <Typography variant="h3" color="primary" gutterBottom sx={{ fontWeight: 800 }}>
          {title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Content for the **{title}** page is under construction.
        </Typography>
      </Box>
    </Container>
  );
};

export default PlaceholderPage;