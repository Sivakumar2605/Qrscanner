import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Scanner from './components/Scanner';
import DisplayDetails from './components/Displaydetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Scanner/>} />
        <Route path="/display" element={<DisplayDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
