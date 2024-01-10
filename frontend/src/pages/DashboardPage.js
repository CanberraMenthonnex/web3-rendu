import React from 'react';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import { useConnectWallet, useWallets } from '@web3-onboard/react';

const DashboardPage = () => {
  const [{ wallet, connecting }, connectWallet] = useConnectWallet();
  const connectedWallets = useWallets();
  const handleConnect = async () => {
    connectWallet();
  };
  return (
    <div>
      <Header />
      <button onClick={handleConnect} disabled={connecting}>
        {connecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
      {wallet && wallet.accounts[0].address}
      <h1>Tableau de bord</h1>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
