import React, { useState } from 'react';
import {
  Button, Typography, Card, CardContent, Box, Divider, IconButton, Snackbar, CircularProgress,
  Stack, Tooltip, Slider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CloudUpload as CloudUploadIcon, Delete as DeleteIcon } from '@mui/icons-material';

import '../assets/styles/SelectFile.css';

// Import images
import connection from '../assets/images/connection.png'; 
import image2 from '../assets/images/image2.png';

import Header from './Header';

// Styled components
const UploadButton = styled('input')({
  display: 'none',
});

const StyledButton = styled(Button)({
  borderRadius: '20px',
  background: 'linear-gradient(132deg, #2378FD 36.58%, #1956B4 81.31%)',
  boxShadow: '0px 4px 19px 0px rgba(119, 147, 65, 0.30)',
  color: '#fff',
  textTransform: 'none',
  padding: '8px 16px',
  fontSize: '16px',
  '&:hover': {
    background: 'linear-gradient(132deg, #1a67d9 36.58%, #164b8a 81.31%)',
    boxShadow: '0px 6px 22px rgba(119, 147, 65, 0.40)',
  },
});

const CardContainer = styled(Card)({
  width: '80%',
  maxWidth: '800px',
  margin: 'auto',
  borderRadius: '16px',
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
  padding: '30px',
  background: 'linear-gradient(145deg, #ffffff, #f9f9f9)',
  overflow: 'hidden',
  position: 'relative',
});

const Dropzone = styled('div')({
  border: '2px dashed #1976d2',
  borderRadius: '12px',
  padding: '30px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'border-color 0.3s ease',
  '&:hover': {
    borderColor: '#1565c0',
  },
  position: 'relative',
  backgroundColor: '#f0f0f0',
});

const StyledLabel = styled('label')({
  display: 'block',
  fontSize: '16px',
  color: '#1976d2',
  fontWeight: 500,
  textAlign: 'center',
  marginTop: '10px',
  cursor: 'pointer',
});

const FileDetails = styled(Box)({
  marginTop: '20px',
});

const FileDetailItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  borderRadius: '8px',
  backgroundColor: '#fff',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  marginBottom: '10px',
});

const ErrorMessage = styled(Typography)({
  fontSize: '14px',
  color: '#d32f2f',
  textAlign: 'center',
  marginTop: '10px',
});

const SliderContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
});

const RedactionLevelSlider = styled(Slider)({
  color: '#1976d2',
  height: '8px',
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid #1976d2',
    '&:focus, &:hover, &.Mui-active': {
      boxShadow: '0px 0px 0px 8px rgba(0, 0, 0, 0.16)',
    },
  },
  '& .MuiSlider-track': {
    borderRadius: 4,
  },
  '& .MuiSlider-rail': {
    borderRadius: 4,
  },
});

const TooltipLabel = styled(Typography)({
  fontSize: '16px',
  fontWeight: 500,
  color: '#1976d2',
  marginTop: '10px',
});

const SelectFile = () => {
  const [file, setFile] = useState(null);
  const [level, setLevel] = useState(1); // 1 = Low, 2 = Medium, 3 = High
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setError('');
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) { // Check file size (5MB limit)
        setError('File size exceeds 5MB.');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setError('');
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.size > 5 * 1024 * 1024) {
        setError('File size exceeds 5MB.');
        return;
      }
      setFile(droppedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSliderChange = (event, newValue) => {
    setLevel(newValue);
  };

  const handleRedact = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbarOpen(true);
    }, 2000);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const levelDescriptions = {
    1: 'Low: Basic redaction with minimal impact.',
    2: 'Medium: Moderate redaction with good detail handling.',
    3: 'High: Comprehensive redaction with thorough detail removal.'
  };

  return (
    <div className="container">
      <div className="connection" style={{ backgroundImage: `url(${connection})` }}>
        <Header />
        <div className="text-overlay">
          <h1>Select the type of File</h1>
          <p>Choose the level of data you want to redact</p>
        </div>
      </div>
      
      <div className="image2" style={{ backgroundImage: `url(${image2})` }}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100%" sx={{ padding: 3 }}>
          <CardContainer>
            <CardContent>
              <Dropzone
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <Typography variant="body1" color="textSecondary">
                  Drag & Drop your file here or 
                  <StyledLabel htmlFor="file-upload">
                    <UploadButton 
                      id="file-upload"
                      type="file"
                      accept=".pdf,.txt"
                      onChange={handleFileChange}
                    />
                    <StyledButton component="span">
                      <CloudUploadIcon sx={{ mr: 1 }} />
                      Upload File
                    </StyledButton>
                  </StyledLabel>
                </Typography>
              </Dropzone>

              {error && (
                <ErrorMessage>{error}</ErrorMessage>
              )}

              {file && (
                <>
                  <FileDetails>
                    <FileDetailItem>
                      <Typography variant="body1" sx={{ flex: 1 }}>
                        {file.name}
                      </Typography>
                      <IconButton 
                        color="error" 
                        onClick={() => setFile(null)} 
                      >
                        <DeleteIcon />
                      </IconButton>
                    </FileDetailItem>
                    <FileDetailItem>
                      <Typography variant="body2" color="textSecondary">
                        Size: {Math.round(file.size / 1024)} KB
                      </Typography>
                    </FileDetailItem>
                  </FileDetails>
                  <Divider sx={{ my: 2 }} />
                </>
              )}

              <SliderContainer>
                <TooltipLabel>Redaction Level: {['Low', 'Medium', 'High'][level - 1]}</TooltipLabel>
                <Slider
                  value={level}
                  min={1}
                  max={3}
                  step={1}
                  onChange={handleSliderChange}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => ['Low', 'Medium', 'High'][value - 1]}
                />
                <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                  {levelDescriptions[level]}
                </Typography>
              </SliderContainer>

              <Stack spacing={2} alignItems="center" sx={{ mt: 2 }}>
                {loading ? (
                  <Box display="flex" justifyContent="center">
                    <CircularProgress />
                  </Box>
                ) : (
                  <StyledButton 
                    variant="contained" 
                    onClick={handleRedact}
                  >
                    REDACT
                  </StyledButton>
                )}
              </Stack>
            </CardContent>
          </CardContainer>
        </Box>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Redaction process completed!"
      />
    </div>
  );
};

export default SelectFile;
