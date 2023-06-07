import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const DemoApp = () => {
  const [data, setData] = useState('');
  const [encryptedData, setEncryptedData] = useState('');
  const [decryptedData, setDecryptedData] = useState('');

  const publicKey = '425'; // Clé publique du vérificateur

  const handleEncrypt = () => {
    const encrypted = CryptoJS.AES.encrypt(data, publicKey).toString();
    setEncryptedData(encrypted);
  };

  const handleDecrypt = () => {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, publicKey).toString(CryptoJS.enc.Utf8);
    setDecryptedData(decrypted);
  };

  return (
    <div>
      <h2>Data Encryption Demo</h2>
      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Enter data"
      />
      <button onClick={handleEncrypt}>Encrypt</button>
      <br />
      <br />
      <input
        type="text"
        value={encryptedData}
        onChange={(e) => setEncryptedData(e.target.value)}
        placeholder="Enter encrypted data"
      />
      <button onClick={handleDecrypt}>Decrypt</button>
      <br />
      <br />
      <textarea value={decryptedData} readOnly />
    </div>
  );
};

export default DemoApp;
