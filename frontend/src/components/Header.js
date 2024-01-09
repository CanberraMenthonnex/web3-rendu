import React from 'react';
import '../styles/_header.scss';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="dashboard-header">
      <div className="welcome-message">Welcome, [Name]</div>
      <div className="profile-search-container">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search" className="search-input" />
        </div>
        <img
          src="img/contract-1.jpeg"
          alt="Profile"
          className="profile-image"
        />
      </div>
    </header>
  );
};

export default Header;
