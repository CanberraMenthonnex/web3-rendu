// src/components/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaList } from 'react-icons/fa';
import '../styles/_sidebar.scss';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
        <FaHome />
      </Link>
      <Link
        to="/profile"
        className={location.pathname === '/profile' ? 'active' : ''}
      >
        <FaUser />
      </Link>
      <Link
        to="/contracts"
        className={location.pathname === '/contracts' ? 'active' : ''}
      >
        <FaList />
      </Link>
      {/* Ajoutez d'autres liens avec des icônes pour chaque page */}
    </div>
  );
};

export default Sidebar;
