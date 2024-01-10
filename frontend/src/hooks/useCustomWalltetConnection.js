import { useConnectWallet, useWallets } from '@web3-onboard/react';
import { useEffect, useState } from 'react';

export const useCustomWalltetConnection = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const connectedWallets = useWallets();
  const [error, setError] = useState(null);
  const [accountAddress, setAccountAddress] = useState('');
  const handleConnect = async () => {
    try {
      const request = await connect();
      if (typeof request === 'object') {
        localStorage.setItem('account-address', request[0].accounts[0].address);
        setAccountAddress(request[0].accounts[0].address);
      }
    } catch (error) {
      setError('Une erreur est survenue lors de la connexion');
    }
  };

  const handleDisconnect = async () => {
    console.log('ici');
    try {
      if (wallet) {
        await disconnect(wallet);
      }
      localStorage.removeItem('account-address');
      setAccountAddress(null);
      window.location.reload();
    } catch (error) {
      setError('Une erreur est survenue lors de la déconnexion');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('account-address')) {
      setAccountAddress(localStorage.getItem('account-address'));
    }
  }, [wallet, accountAddress]);

  return {
    wallet,
    handleConnect,
    handleDisconnect,
    accountAddress,
    error,
    connectedWallets,
    connecting,
  };
};
