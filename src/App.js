import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import './App.css';
import Bisection from './Rootofequation/Bisection';
import FalsePosition from './Rootofequation/Falseposition';
import Onepoint from './Rootofequation/Onepoint';
import Newton from './Rootofequation/Newton';
import Solution from './Rootofequation/Solutuon';
import Navbar from './Navbar';

function Home() {
  return (
    <div>
      <Navbar />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> 
        <div className="App-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Bisection" element={<Bisection />} />
            <Route path="/FalsePosition" element={<FalsePosition />} />
            <Route path="/Onepoint" element={<Onepoint />} />
            <Route path="/Newton" element={<Newton/>} />
            <Route path="/Solution" element={<Solution/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
