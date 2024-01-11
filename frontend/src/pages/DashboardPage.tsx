import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard';
import Header from '../layouts/Header/Header';
import Sidebar from '../layouts/Sidebar/Sidebar';
import './_dashboard.scss';
import { useCustomWalltetConnection } from '../hooks/useCustomWalltetConnection';
import { ethers } from "ethers";
import QuizScore from '../contracts/QuizScore.json';
import { NFTStorage } from "nft.storage";
import nftImage from '../images/nft.jpeg';
import path from 'path';
import fs from 'fs'


interface DashboardPageInterface {
}

const DashboardPage: React.FC<DashboardPageInterface> = () => {
  const {handleConnect, accountAddress, connecting, wallet} =
    useCustomWalltetConnection();

  const QuizScoreAbi = QuizScore.abi;
  const QuizScoreAddress = '0x6f1aE4F5c15ca0554807A42f90985f8A353e85B5';

  const getExampleImage = async () => {
    const imageOriginUrl = "https://user-images.githubusercontent.com/87873179/144324736-3f09a98e-f5aa-4199-a874-13583bf31951.jpg"
    const r = await fetch(imageOriginUrl);
    console.log(r)
    if (!r.ok) {
      console.log('failed to fetch image');
    }
    return r.blob()
  }


  const generateMetadata = async () => {
    return {
      name: 'Quizz n°1',
      description: 'A certificate that you have passed the first quizz',
      image: getExampleImage(),
      properties: {
        score: Math.floor(Math.random() * 20) + 1,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        certificateNumber: Math.floor(Math.random() * 10000) + 1
      }
    }
  }

  const deployMetadata = async () => {
    const NFTStorageToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBiYkNFQUQ4YjRCNTY0ODVFNkE0OTBEYzQzYzk4QjU5MDk1NTg2NDIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwNDgwNTkxOTIyNSwibmFtZSI6IklJTS10ZXN0In0.up5zRl8_YyyJjJpviZ1oGq4Sm0iuj0nRz13cSROB89Q";
    const client = new NFTStorage({token: NFTStorageToken})
    const metadata = await generateMetadata();
    console.log(metadata);
    const metadataResponse = await client.store(metadata);

    console.log('NFT data deployed!')

    return metadataResponse.url;
  }

  const handleMint = async () => {

    const tokenUri = deployMetadata();
    if (wallet) {
      const ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
      const signer = await ethersProvider.getSigner();

      const contract = new ethers.Contract(QuizScoreAddress, QuizScoreAbi, signer);
      await contract.awardItem(wallet.accounts[0].address, tokenUri);
    }
  };

  return (
    <div className="dashboard-container">
      {accountAddress ? (
        <>
          <Sidebar/>
          <div className="dashboard-content">
            <Header accountAddress={accountAddress}/>
            <h1>Tableau de bord</h1>
            <br/>
            <button onClick={handleMint}>TEST MINT</button>
            <Dashboard/>
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
