import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import './_sidebar.scss';
import { useCustomWalltetConnection } from '../../hooks/useCustomWalltetConnection';

const Sidebar: React.FC = () => {
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
