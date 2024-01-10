import React from 'react';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/_dashboard.scss';
import { useCustomWalltetConnection } from '../hooks/useCustomWalltetConnection';

const DashboardPage = () => {
  const { handleConnect, accountAddress, connecting } =
    useCustomWalltetConnection();

  return (
    <div className="dashboard-container">
      {accountAddress ? (
        <>
          <Sidebar />
          <div className="dashboard-content">
            <Header data={accountAddress}/>
            <h1>Tableau de bord</h1>
            <Dashboard />
          </div>
        </>
      ) : (
        <div className="dashboard-login">
          <p>Connect your wallet to continue</p>
          <button onClick={handleConnect} disabled={connecting}>
            {connecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
