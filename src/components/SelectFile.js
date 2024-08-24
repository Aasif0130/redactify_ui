import React, { useState } from 'react';
import {
  Button, Typography, Card, CardContent, Box, Divider, IconButton, Snackbar, Stack,
  Dialog, DialogActions, DialogContent, DialogTitle, ToggleButton, ToggleButtonGroup,
  Backdrop
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CloudUpload as CloudUploadIcon, Delete as DeleteIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';

import '../assets/styles/SelectFile.css';
import connection from '../assets/images/connection.png'; 
import image2 from '../assets/images/image2.png';
import Header from './Header';
import Loader from '../components/Loader'; // Import the Loader component

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

const PrioritySelector = styled(ToggleButtonGroup)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
});

const PreviewContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
});

const FilePreview = styled('embed')({
  width: '100%',
  height: '600px',
  border: 'none',
});

const ChipLabel = styled(Typography)({
  fontSize: '16px',
  fontWeight: 500,
  color: '#1976d2',
  marginTop: '10px',
  textAlign: 'center',
  width: '100%',
});

// Centered loader dialog with fixed size
const LoaderDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    width: '300px', // Adjust width as needed
    height: '300px', // Adjust height as needed
    maxWidth: 'none',
    overflow: 'hidden',
  },
});

const CustomBackdrop = styled(Backdrop)({
  zIndex: 1200,
  backdropFilter: 'blur(5px)',
});

const ProcessingMessage = styled(Typography)({
  fontSize: '18px',
  fontWeight: 500,
  color: '#1976d2',
  textAlign: 'center',
});

const SelectFile = () => {
  const [file, setFile] = useState(null);
  const [level, setLevel] = useState('1'); // '1' = Low, '2' = Medium, '3' = High
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // New state for success
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleFileChange = (event) => {
    setError('');
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) { // Check file size (5MB limit)
        setError('File size exceeds 5MB.');
        return;
      }
      setFile(selectedFile);
      setPreviewFile(URL.createObjectURL(selectedFile));
      setPreviewOpen(true);
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
      setPreviewFile(URL.createObjectURL(droppedFile));
      setPreviewOpen(true);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handlePriorityChange = (event, newValue) => {
    if (newValue !== null) {
      setLevel(newValue);
    }
  };

  const handleRedact = () => {
    setDialogOpen(true);
    setLoading(true);
    setSuccess(false); // Reset success state

    setTimeout(() => {
      // Simulate file processing and renaming
      const newFileName = `${file.name.split('.').slice(0, -1).join('.')}_REDACTED.${file.name.split('.').pop()}`;
      const redactedFile = new Blob([file], { type: file.type });
      const url = URL.createObjectURL(redactedFile);

      // Create a link element to download the file
      const link = document.createElement('a');
      link.href = url;
      link.download = newFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setLoading(false);
      setSuccess(true); // Set success to true after processing

      // Ensure snackbar opens after loader
      setTimeout(() => {
        setSnackbarOpen(true);
        setTimeout(() => setSnackbarOpen(false), 2000); // Hide snackbar after 2 seconds
      }, 100); // Small delay to ensure snackbar shows after loader
    }, 6000); // 6 seconds delay
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
    URL.revokeObjectURL(previewFile);
    setPreviewFile(null); // Clean up
  };

  const levelDescriptions = {
    '1': 'Low: Basic redaction with minimal impact.',
    '2': 'Medium: Moderate redaction with good detail handling.',
    '3': 'High: Comprehensive redaction with thorough detail removal.'
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
                        {file?.name || 'No file selected'}
                      </Typography>
                      <IconButton 
                        color="error" 
                        onClick={() => {
                          setFile(null);
                          setPreviewFile(null);
                        }} 
                      >
                        <DeleteIcon />
                      </IconButton>
                      <Typography variant="body2" color="textSecondary">
                        Size: {file ? `${Math.round(file.size / 1024)} KB` : 'N/A'}
                      </Typography>
                    </FileDetailItem>
                  </FileDetails>
                  <Divider sx={{ my: 2 }} />
                </>
              )}

              <PrioritySelector
                value={level}
                exclusive
                onChange={handlePriorityChange}
                aria-label="priority"
              >
                <ToggleButton value="1" aria-label="low">
                  Low
                </ToggleButton>
                <ToggleButton value="2" aria-label="medium">
                  Medium
                </ToggleButton>
                <ToggleButton value="3" aria-label="high">
                  High
                </ToggleButton>
              </PrioritySelector>

              <ChipLabel>{levelDescriptions[level]}</ChipLabel>

              <Stack spacing={2} alignItems="center" sx={{ mt: 2 }}>
                <StyledButton 
                  variant="contained" 
                  onClick={handleRedact}
                  disabled={!file} // Disable until a file is selected
                >
                  REDACT
                </StyledButton>
              </Stack>
            </CardContent>
          </CardContainer>
        </Box>
      </div>

      <Dialog
        open={previewOpen}
        onClose={handleClosePreview}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>File Preview</DialogTitle>
        <DialogContent>
          <PreviewContainer>
            <Typography variant="body1">{file?.name || 'No file selected'}</Typography>
            {file?.type === 'application/pdf' ? (
              <FilePreview src={previewFile} type="application/pdf" />
            ) : (
              <Typography variant="body1">Preview not available for this file type.</Typography>
            )}
          </PreviewContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreview} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000} // Snackbar should stay open for 2 seconds
        onClose={handleCloseSnackbar}
        message="Redaction process completed!"
      />

      <CustomBackdrop open={loading}>
        <LoaderDialog open={loading} onClose={() => {}}>
          <DialogContent>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
              <ProcessingMessage>Redacting...</ProcessingMessage>
              {success ? (
                <>
                  <CheckCircleIcon color="success" sx={{ fontSize: 60, mt: 2 }} />
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    File processed successfully!
                  </Typography>
                </>
              ) : (
                <Loader />
              )}
            </Box>
          </DialogContent>
        </LoaderDialog>
      </CustomBackdrop>
    </div>
  );
};

export default SelectFile;
