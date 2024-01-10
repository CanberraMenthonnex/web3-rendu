import { useConnectWallet, useWallets } from '@web3-onboard/react';
import { useEffect, useState } from 'react';

export const useCustomWalltetConnection = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const connectedWallets = useWallets();
  const [error, setError] = useState<string | null>(null);
  const [accountAddress, setAccountAddress] = useState<string | null>(null);
  const handleConnect = async (): Promise<boolean> => {
    try {
      const request = await connect();
      if (typeof request === 'object') {
        localStorage.setItem('account-address', request[0].accounts[0].address);
        setAccountAddress(request[0].accounts[0].address);
      }
      return true;
    } catch (error) {
      setError('Une erreur est survenue lors de la connexion');
      return false;
    }
  };

  const handleDisconnect = async (): Promise<boolean> => {
    console.log('ici');
    try {
      if (wallet) {
        await disconnect(wallet);
      }
      localStorage.removeItem('account-address');
      setAccountAddress(null);
      window.location.reload();
      return true;
    } catch (error) {
      setError('Une erreur est survenue lors de la déconnexion');
      return false;
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
