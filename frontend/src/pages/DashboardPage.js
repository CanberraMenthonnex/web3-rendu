import React from 'react';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import {useConnectWallet} from '@web3-onboard/react';
import Sidebar from "../components/Sidebar";
import '../styles/_dashboard.scss';
import {ethers} from 'ethers';
import QuizScore from '../contracts/QuizScore.json';
import {File, NFTStorage} from 'nft.storage'
import env from "react-dotenv";


const DashboardPage = () => {
  let contract = null
  const QuizScoreAbi = QuizScore.abi;
  const QuizScoreAddress = '0x1FbE120DBE44245eD91B2161f0e0885b158c3000';

  const [{wallet, connecting}, connectWallet] = useConnectWallet();
  const handleConnect = async () => {
    connectWallet();
  };

  const getExampleImage = async () => {
    const imageOriginUrl = "https://user-images.githubusercontent.com/87873179/144324736-3f09a98e-f5aa-4199-a874-13583bf31951.jpg"
    const r = await fetch(imageOriginUrl)
    if (!r.ok) {
      throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`)
    }
    return r.blob()
  }

  const generateMetadata = async () => {
    return {
      name: 'Quizz n°1',
      description: 'A certificate that you have passed the first quizz',
      image: new File([await getExampleImage()], 'nft.png', {type: 'image/png'}),
      properties: {
        score: Math.floor(Math.random() * 20) + 1,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        certificateNumber: Math.floor(Math.random() * 10000) + 1
      }
    }
  }

  const handleMint = async () => {

    const tokenUri = deployMetadata();
    if (wallet) {
      const ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
      const signer = await ethersProvider.getSigner();

      contract = new ethers.Contract(QuizScoreAddress, QuizScoreAbi, signer);
    }
    await contract.awardItem(wallet.accounts[0].address, tokenUri);
  };


  const deployMetadata = async () => {
    const client = new NFTStorage({token: env.NFT_STORAGE_TOKEN})
    const metadata = await generateMetadata();
    const metadataResponse = await client.store(metadata);

    console.log('NFT data deployed!')

    return metadataResponse.url;
  }

  return (
    <div className="dashboard-container">
      {wallet ? <>
        <Sidebar/>
        <div className="dashboard-content">
          <Header/>
          <h1>Tableau de bord</h1>
          <Dashboard/>
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
