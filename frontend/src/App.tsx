// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import './styles/_reset.scss';
import './styles/_app.scss';
import coinbaseWalletModule from '@web3-onboard/coinbase';
import safeModule from '@web3-onboard/gnosis';
import walletConnectModule from '@web3-onboard/walletconnect';


import { Web3OnboardProvider, init } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';

interface AppInterface {}

const infuraKey: string = '<INFURA_KEY>';
const MAINNET_RPC_URL = `https://mainnet.infura.io/v3/${infuraKey}`;
const coinbaseWalletSdk = coinbaseWalletModule({ darkMode: true });
const safe = safeModule();
const wcInitOptions = {
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  projectId: 'abc123...',
  /**
   * Chains required to be supported by all wallets connecting to your DApp
   */
  requiredChains: [1],
  /**
   * Chains required to be supported by all wallets connecting to your DApp
   */
  optionalChains: [42161, 8453, 10, 137, 56],
  /**
   * Defaults to `appMetadata.explore` that is supplied to the web3-onboard init
   * Strongly recommended to provide atleast one URL as it is required by some wallets (i.e. MetaMask)
   * To connect with WalletConnect
   */
  dappUrl: 'http:localhost:3000',
}

const walletConnect = walletConnectModule(wcInitOptions);


const wallets = [injectedModule(), coinbaseWalletSdk, safe, walletConnect];
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

const App: React.FC<AppInterface> = () => {
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
