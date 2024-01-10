import React from 'react';
import './_header.scss';
import { FaSearch } from 'react-icons/fa';

interface HeaderInterface {
  accountAddress: string;
}

const Header: React.FC<HeaderInterface> = ({ accountAddress }) => {
  return (
    <header className="dashboard-header">
      <div className="welcome-message">Welcome, {accountAddress}</div>
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
