import React, { useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import { useCustomWalltetConnection } from '../hooks/useCustomWalltetConnection';

const DashboardPage = () => {
  const {
    wallet,
    connectedWallets,
    handleConnect,
    accountAddress,
    handleDisconnect,
  } = useCustomWalltetConnection();
  return (
    <div>
      <Header />
      {!accountAddress ? (
        <>
          <button onClick={handleConnect}>connexion</button>
        </>
      ) : (
        <>
          {accountAddress}
          <button onClick={handleDisconnect}>disconnect</button>
        </>
      )}
      <h1>Tableau de bord</h1>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
