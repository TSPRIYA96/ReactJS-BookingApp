import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        px: 2, 
        mt: 'auto', 
        backgroundColor: '#008080',
        borderTop: '1px solid #e0e0e0'
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} Bus Ticket Booking App. All rights reserved.
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" mt={1}>
          Contact us: support@busbookingapp.com | +1 234 567 890
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;