// src/App.js
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import Sidebar from "./components/Sidebar";
import './styles/_app.scss';
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
//import { ethers } from 'ethers'

const MAINNET_RPC_URL = 'https://mainnet.infura.io/v3/<INFURA_KEY>'

const injected = injectedModule()

const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: MAINNET_RPC_URL
    },
    {
      id: 42161,
      token: 'ARB-ETH',
      label: 'Arbitrum One',
      rpcUrl: 'https://rpc.ankr.com/arbitrum'
    },
    {
      id: '0xa4ba',
      token: 'ARB',
      label: 'Arbitrum Nova',
      rpcUrl: 'https://nova.arbitrum.io/rpc'
    },
    {
      id: '0x2105',
      token: 'ETH',
      label: 'Base',
      rpcUrl: 'https://mainnet.base.org'
    }
  ]
})

const wallets = await onboard.connectWallet()

if (wallets[0]) {
 //code une fois connecté au wallet
}


const App = () => {
    return (
        <Router>
            <div className="app-container">
                <Sidebar />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<DashboardPage />} />
                        {/* Ajoutez d'autres routes pour chaque page */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
};



export default App;
