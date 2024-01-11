import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import Header from '../layouts/Header/Header';
import Sidebar from '../layouts/Sidebar/Sidebar';
import './_dashboard.scss';
import { useCustomWalltetConnection } from '../hooks/useCustomWalltetConnection';
import {ethers} from "ethers";
import QuizScore from '../contracts/QuizScore.json';

interface DashboardPageInterface {}

const DashboardPage: React.FC<DashboardPageInterface> = () => {
  const { handleConnect, accountAddress, connecting , wallet} =
    useCustomWalltetConnection();

  const QuizScoreAbi = QuizScore.abi;
  const QuizScoreAddress = '0x6f1aE4F5c15ca0554807A42f90985f8A353e85B5';

  const handleMint = async () => {
    if (wallet) {
      const ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
      const signer = await ethersProvider.getSigner();

      const contract = new ethers.Contract(QuizScoreAddress, QuizScoreAbi, signer);
      console.log(contract);
      await contract.awardItem(wallet.accounts[0].address, "tokenUri");
    }
  };
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
      <button onClick={handleMint} disabled={connecting}>TEST MINT</button>
    </div>
  );
};

export default DashboardPage;
