// src/components/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa';
import '../styles/_sidebar.scss';
import { useCustomWalltetConnection } from '../hooks/useCustomWalltetConnection';

const Sidebar = () => {
  const location = useLocation();
  const { handleDisconnect } = useCustomWalltetConnection();
  return (
    <div className="sidebar">
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
        <FaHome />
      </Link>
      <button onClick={handleDisconnect}>
        <FaSignOutAlt />
      </button>
    </div>
  );
};

export default Sidebar;
