import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.min.css';
import contractRegistration from '../contract/contractRegistration.json';
import agent from '../veramo/setup';

const ContractAddress = contractRegistration.address;
const ContractABI = contractRegistration.abi;

function DidDocument() {
  const [cin, setCin] = useState('');
  const [did, setDid] = useState('');
  const [didDoc, setDidDoc] = useState('');

  const handleInputChange = (event) => {
    setCin(event.target.value);
  };

  const handleGetDid = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const [account] = await web3.eth.getAccounts();
        const contract = new web3.eth.Contract(ContractABI, ContractAddress);
        const result = await contract.methods.getDidByCin(cin).call({ from: account });
        setDid(result);
      } else {
        console.error('Web3 is not available');
      }
    } catch (error) {
      console.error('Error calling getDidByCin:', error);
    }
  };

  useEffect(() => {
    const resolve = async () => {
      if (did) {
        console.log(did.toString());
        const did1 = did.toString();
        console.log(did1);

        const doc = await agent.resolveDid({
          didUrl: did1,
        });

        setDidDoc(doc);
      }
    };

    resolve();
  }, [did]);

  return (
    <div>
      <input type="text" value={cin} placeholder="Search DID by CIN" onChange={handleInputChange} />
      <button onClick={handleGetDid}>Get DID</button>
      {did && <p>DID: {did}</p>}
      <br />
      <h1>DID Document:</h1>
      <header className="App-header">
        <pre id="result">{didDoc && JSON.stringify(didDoc, null, 2)}</pre>
      </header>
    </div>
  );
}

export default DidDocument;
