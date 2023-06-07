import React, { useEffect, useState } from 'react';


function DIDmeta() {
  const [address, setAddress] = useState('');

  useEffect(() => {
    const getAddressFromMetaMask = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          // Request access to the user's MetaMask accounts
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Get the selected address from MetaMask
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          const selectedAddress = accounts[0];

          setAddress(selectedAddress);

          // Create the DID using the address
          const did = `did:ethr:${selectedAddress}`;
          console.log('Created DID:', did);


        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        console.error('MetaMask not detected');
      }
    };

    getAddressFromMetaMask();
  }, []);

  return (
    <div>
      <h1>MetaMask Address: {address}</h1>
    </div>
  );
}

export default DIDmeta;
