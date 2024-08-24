import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

import '../assets/styles/Landing.css'; // Adjust the path if necessary

// Import images
import image1 from '../assets/images/backgroundfirst.png'; // Adjust the path if necessary
import image2 from '../assets/images/image2.png'; // Adjust the path if necessary
import leftSvg from '../assets/svg/leftsvg.svg'; // Import the left SVG
import rightSvg from '../assets/svg/rightsvg.svg'; // Import the right SVG

import Header from './Header';

const Landing = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLeftClick = () => {
    navigate('/selectfile'); // Navigate to /selectfile
  };

  const handleRightClick = () => {
    navigate('/existing'); // Navigate to /existing
  };

  return (
    <div className="container">
      <div className="image1" style={{ backgroundImage: `url(${image1})` }}>
        <Header />
        <div className="text-overlay">
          <h1>Effortless Data Redaction</h1>
          <p>Securely manage/Review your redactions</p>
        </div>
      </div>
      
      <div className="image2" style={{ backgroundImage: `url(${image2})` }}>
      
        <img src={leftSvg} alt="Left SVG" className="left-svg" onClick={handleLeftClick} />
        <img src={rightSvg} alt="Right SVG" className="right-svg" onClick={handleRightClick} />
      </div>
    </div>
  );
};

export default Landing;
