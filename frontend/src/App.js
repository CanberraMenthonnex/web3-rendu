// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import Sidebar from './components/Sidebar';
import './styles/_reset.scss';
import './styles/_app.scss';

import { Web3OnboardProvider, init } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';

const infuraKey = '<INFURA_KEY>';
const MAINNET_RPC_URL = `https://mainnet.infura.io/v3/${infuraKey}`;
const wallets = [injectedModule()];
const web3Onboard = init({
  theme: 'dark',
  wallets,
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: MAINNET_RPC_URL,
    },
    {
      id: '0xe298',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: MAINNET_RPC_URL,
    },
    {
      id: 42161,
      token: 'ARB-ETH',
      label: 'Arbitrum One',
      rpcUrl: 'https://rpc.ankr.com/arbitrum',
    },
    {
      id: '0xa4ba',
      token: 'ARB',
      label: 'Arbitrum Nova',
      rpcUrl: 'https://nova.arbitrum.io/rpc',
    },
    {
      id: '0x2105',
      token: 'ETH',
      label: 'Base',
      rpcUrl: 'https://mainnet.base.org',
    },
  ],
  appMetadata: {
    name: 'Connect Wallet Example',
    icon: '<svg>My App Icon</svg>',
    description: 'Example showcasing how to connect a wallet.',
    recommendedInjectedWallets: [
      { name: 'MetaMask', url: 'https://metamask.io' },
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
    ],
  },
});

const App = () => {
  return (
    <Router>
      <Web3OnboardProvider web3Onboard={web3Onboard}>
        <div className="app-container">
          <div className="main-content">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              {/* Ajoutez d'autres routes pour chaque page */}
            </Routes>
          </div>
        </div>
      </Web3OnboardProvider>
    </Router>
  );
};

export default App;
