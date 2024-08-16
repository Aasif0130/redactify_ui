import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import { styled } from '@mui/system';
import logo from '../assets/svg/applogo.svg'; // Path to your logo SVG
import appName from '../assets/svg/appname.svg'; // Path to your app name SVG

// Styled AppBar with rounded corners and transparency
const Header = styled(AppBar)(({ theme }) => ({
  borderRadius: '50px', // Fully rounded corners for cylindrical effect
  position: 'fixed',
  top: '1%',
  left: '15%', // Centering with 70% width (15% on each side)
  width: '70%',
  height: '60px', // Height of the header
  marginTop: '1%',
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white
  backdropFilter: 'blur(10px)', // Optional: adds a blur effect for a glassy look
  boxShadow: 'none', // Optional: removes shadow for a sleek look
}));

// Styled image for logo and app name
const Icon = styled('img')({
  height: '35px', // Size for the logo
  marginRight: '8px', // Space between logo and app name
});

// Smaller size specifically for the app name
const SmallIcon = styled(Icon)({
  height: '12px', // Smaller size for the app name
});

// Container to ensure proper alignment and spacing
const Container = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const HeaderSignin = () => {
  return (
    <Header>
      <Toolbar>
        <Container>
          <Icon src={logo} alt="Logo" />
          <SmallIcon src={appName} alt="App Name" />
        </Container>
      </Toolbar>
    </Header>
  );
};

export default HeaderSignin;
