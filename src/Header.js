import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src="/fully_corrected_blue_gray_logo.png" alt="Zionotes Logo" />
          </Link>
        </div>
        <nav className="nav">
          <ul>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><a href="https://forms.gle/iTxjBV8KGBNah41Y7" target="_blank" rel="noopener noreferrer">Contact Us</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
