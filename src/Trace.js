import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const BlockchainInterface = () => {
  const [blocks, setBlocks] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchBlockchainData = async () => {
      // Connect to Ganache network
      const web3 = new Web3('http://localhost:7545');

      // Fetch block data
      const latestBlockNumber = await web3.eth.getBlockNumber();
      const blocks = [];
      for (let i = latestBlockNumber; i > latestBlockNumber - 10; i--) {
        const block = await web3.eth.getBlock(i);
        blocks.push(block);
      }
      setBlocks(blocks);

      // Fetch transaction data
      const latestBlock = await web3.eth.getBlock(latestBlockNumber);
      const transactions = latestBlock.transactions;
      setTransactions(transactions);
    };

    fetchBlockchainData();
  }, []);

  return (
    <div>
      <h2>Blocks</h2>
      <ul>
        {blocks.map((block) => (
          <li key={block.number}>
            Block Number: {block.number}, Timestamp: {block.timestamp}
          </li>
        ))}
      </ul>

      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction}>
            Transaction Hash: {transaction}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlockchainInterface;
