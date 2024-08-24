import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SelectFile from './components/SelectFile';
import Landing from './components/Landing';


// index.js or App.js
import './App.css'; // or the path to your global CSS file
import Loader from './components/Loader';



function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/selectfile" element={<SelectFile/>}/>
        <Route path="/" element={<Landing/>}/>
        <Route path="/loader" element={<Loader/>}/>

      </Routes>
    </Router>
  );
}

export default App;
