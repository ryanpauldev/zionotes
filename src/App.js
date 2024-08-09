import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Pricing from './Pricing'; // Import the Pricing component
import Footer from './Footer'; // Import the Footer component
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
        <Footer /> {/* Add the Footer component here */}
      </div>
    </Router>
  );
}

export default App;
