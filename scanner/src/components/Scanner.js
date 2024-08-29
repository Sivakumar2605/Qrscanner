import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios';

const Scanner = () => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [qrData, setQRData] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateMobileNumber = (mobile) => {
    const mobilePattern = /^[0-9]{10}$/;
    return mobilePattern.test(mobile);
  };

  const handleGenerateQRCode = async () => {
    // Validate fields
    if (!name || !mobileNumber || !address) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (!validateMobileNumber(mobileNumber)) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setErrorMessage(''); // Clear any previous error messages

    const baseUrl = 'https://qrscannertask.onrender.com/display';
    const params = new URLSearchParams({
      name: name,
      mobile: mobileNumber,
      address: address
    }).toString();

    const fullUrl = `${baseUrl}?${params}`;
    setQRData(fullUrl);
    setShowQRCode(true);

    try {
      const ipResponse = await axios.get('https://api.ipify.org?format=json');
      const ipAddress = ipResponse.data.ip;

      await axios.post('https://qrscanner-1.onrender.com/api/scanned-user', {
        name: name,
        mobile: mobileNumber,
        address: address,
        qrUrl: fullUrl,
        ipAddress: ipAddress
      });

      console.log('QR URL and details saved successfully');
    } catch (error) {
      console.error('Error saving QR URL and details:', error);
    }

    setName('');
    setMobileNumber('');
    setAddress('');
  };

  const handleDownloadQRCode = () => {
    const qrCanvas = document.querySelector('#qr-code-canvas');
    if (!qrCanvas) return;

    const size = 300;
    const padding = 30;

    const backgroundCanvas = document.createElement('canvas');
    backgroundCanvas.width = size;
    backgroundCanvas.height = size;
    const context = backgroundCanvas.getContext('2d');

    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, size, size);

    const qrCodeSize = 256;
    const offset = (size - qrCodeSize - 2 * padding) / 2;
    context.drawImage(qrCanvas, offset + padding, offset + padding, qrCodeSize, qrCodeSize);

    const pngUrl = backgroundCanvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qrcode.png';
    downloadLink.click();
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2, 
        maxWidth: '100%', 
        width: 400, 
        margin: 'auto',
        mt: 4,
        px: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Generate Your QR Code
      </Typography>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <TextField
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Mobile Number"
        variant="outlined"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
        fullWidth
        error={!!errorMessage && !validateMobileNumber(mobileNumber)}
        helperText={!!errorMessage && !validateMobileNumber(mobileNumber) ? 'Please enter a valid 10-digit mobile number.' : ''}
      />
      <TextField
        label="Address"
        variant="outlined"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        fullWidth
        multiline
        rows={4}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleGenerateQRCode}
      >
        Generate QR Code
      </Button>

      {showQRCode && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <QRCodeCanvas id="qr-code-canvas" value={qrData} size={256} />
          <Button 
            sx={{ mt: 2 }} 
            variant="outlined" 
            color="secondary" 
            onClick={handleDownloadQRCode}
          >
            Download QR Code
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Scanner;
