'use client'
import { useState } from 'react';
import { ethers } from 'ethers';
import abi from '../../public/abi.json'

const Nav = () => {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    // @ts-ignore
    if (typeof window.ethereum !== 'undefined') {
      try {
        // @ts-ignore
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        // @ts-ignore
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };


  return (
    <div className="fixed bottom-10 w-screen grid place-items-center min-h-20 z-10 pointer-events-none">
      <div className="bg-black bg-opacity-50 text-white p-4 rounded-md flex items-center shadow-lg pointer-events-auto">
        <div className="flex gap-4 items-center">
          <button className="bg-white text-gray-950 px-4 py-2 rounded-md flex items-center justify-center">
            <span className="mr-2">🏠</span>
            Home
          </button>
          <button
            onClick={connectWallet}
            className="bg-transparent text-white border border-white px-4 py-2 rounded-lg flex items-center justify-center"
          >
            {account ? account : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;