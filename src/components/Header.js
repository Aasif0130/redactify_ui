import React, { useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, useTheme, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from '../assets/svg/applogo.svg'; // Path to your logo SVG
import appName from '../assets/svg/appname.svg'; // Path to your app name SVG
import HomeIcon from '@mui/icons-material/Home';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import LogoutIcon from '@mui/icons-material/Logout';


// Styled AppBar with updated dimensions and solid background
const Header = styled(AppBar)(({ theme }) => ({
  borderRadius: '12px', // Rounded corners for a cylindrical effect
  position: 'fixed',
  top: '2%', // Margin from the top of the viewport
  left: '50%', // Center horizontally
  transform: 'translateX(-50%)', // Shift the header left by 50% of its width
  width: '90%', // Increased width of the header
  height: '60px', // Height of the header
  backgroundColor: '#FFFFFF', // Solid white background
  boxShadow: 'none', // No shadow for a clean appearance
  padding: '0 24px', // Padding inside the header
}));

// Styled image for logo and app name
const Icon = styled('img')({
  height: '25px', // Size for the logo
  marginLeft: '-15px',
  marginRight: '20px', // Space between logo and app name
});

// Smaller size specifically for the app name
const SmallIcon = styled(Icon)({
  height: '32px', // Size for the app name
  marginTop:'-5px',
});

// Container to ensure proper alignment and spacing
const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center', // Center vertically within the header
  height: '100%', // Ensure container spans the height of the header
  gap: '8px', // Space between logo and app name
});

// Container for the right-side icons
const IconContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center', // Center vertically within the header
  marginLeft: 'auto', // Push to the right side
  gap: '8px', // Space between icons, reduced to bring them closer
});

// Container for Profile popover
const ProfilePopover = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '60px', // Position below the header
  right: '0',
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow
}));

const HeaderSignin = () => {
  const [fullscreen, setFullscreen] = useState(false);
  const [hover, setHover] = useState(false); // State to manage hover
  const [profileAnchor, setProfileAnchor] = useState(null); // State to manage profile popover
  const navigate = useNavigate(); // Use navigate hook
  const profileName = localStorage.getItem('owner') || 'Profile'; // Fetch profile name from local storage

  // Toggle fullscreen mode
  const handleFullscreen = () => {
    if (!fullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
      }
      setFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
      setFullscreen(false);
    }
  };

  // Sign out handler
  const handleSignOut = () => {
    localStorage.clear(); // Clear local storage
    navigate('/'); // Redirect to home
  };

  // Navigate to /choose
  const handleHomeClick = () => {
    navigate('/choose');
  };

  return (
    <Header>
      <Toolbar>
        <LogoContainer>
          <Icon src={logo} alt="Logo" />
          <SmallIcon src={appName} alt="App Name" />
        </LogoContainer>
        <IconContainer>
          <IconButton color="inherit" style={{ fontSize: '30px', color: '#000000' }} onClick={handleHomeClick}>
            <HomeIcon />
          </IconButton>
          <IconButton color="inherit" style={{ fontSize: '30px', color: '#000000' }} onClick={handleFullscreen}>
            <FullscreenIcon />
          </IconButton>
        
          <IconButton color="inherit" style={{ fontSize: '30px', color: '#000000' }} onClick={handleSignOut}>
            <LogoutIcon />
          </IconButton>
        </IconContainer>
      </Toolbar>
    </Header>
  );
};

export default HeaderSignin;
