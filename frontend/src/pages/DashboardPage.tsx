import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import Header from '../layouts/Header/Header';
import Sidebar from '../layouts/Sidebar/Sidebar';
import './_dashboard.scss';
import { useCustomWalltetConnection } from '../hooks/useCustomWalltetConnection';
interface DashboardPageInterface {}
const DashboardPage: React.FC<DashboardPageInterface> = () => {
  const { handleConnect, accountAddress, connecting } =
    useCustomWalltetConnection();
  return (
    <div className="dashboard-container">
      {accountAddress ? (
        <>
          <Sidebar />
          <div className="dashboard-content">
            <Header accountAddress={accountAddress} />
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
