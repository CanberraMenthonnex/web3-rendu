import React from 'react';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import { useConnectWallet, useWallets } from '@web3-onboard/react';
import Sidebar from "../components/Sidebar";
import '../styles/_dashboard.scss';
import { ethers } from 'ethers';
import QuizScore from '../contracts/QuizScore.json';


const DashboardPage = () => {
  let contract = null

  const [{ wallet, connecting }, connectWallet] = useConnectWallet();
  const connectedWallets = useWallets();
  const handleConnect = async () => {
    connectWallet();
  };

  const QuizScoreAbi = QuizScore.abi;
  const QuizScoreAddress = '0x6f1aE4F5c15ca0554807A42f90985f8A353e85B5';


  const handleMint = async () => {
    if (wallet) {
      const ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
      const signer = await ethersProvider.getSigner();

      contract = new ethers.Contract(QuizScoreAddress, QuizScoreAbi, signer);
      console.log(contract);
    }
    await contract.awardItem(wallet.accounts[0].address, "tokenUri");
  };

    return (
        <div className="dashboard-container">
            {wallet? <>
                <Sidebar />
                <div className="dashboard-content">
                    <Header />
                    <h1>Tableau de bord</h1>
                    <Dashboard  />
                </div>
            </> : <div className="dashboard-login">
              <p>Connect your wallet to continue</p>
                <button onClick={handleConnect} disabled={connecting}>
                {connecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
            </div>
            }
            
            <button onClick={handleMint}>TEST MINT</button>


        </div>
    );

};

export default DashboardPage;
