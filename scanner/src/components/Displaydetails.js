import React from 'react';
import { useLocation } from 'react-router-dom';
import { Paper, Typography, Box } from '@mui/material';

const DisplayDetails = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const name = params.get('name');
  const mobileNumber = params.get('mobile');
  const address = params.get('address');

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        bgcolor: '#f5f5f5', 
        p: 2
      }}
    >
      <Paper 
        sx={{ 
          p: 3, 
          maxWidth: 400, 
          width: '100%', 
          textAlign: 'center',
          boxShadow: 3,
          borderRadius: 2
        }}
      >
        <Typography variant="h4" gutterBottom>
          User Details
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          <strong>Name:</strong> {name}
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          <strong>Mobile Number:</strong> {mobileNumber}
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          <strong>Address:</strong> {address}
        </Typography>
      </Paper>
    </Box>
  );
};

export default DisplayDetails;
