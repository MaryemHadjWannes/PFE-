import React, { useState } from 'react';
import './Verificateur.css';
import Web3 from 'web3';
import contractRegistration from '../contract/contractRegistration.json';
import axios from 'axios';

// Contract parameters
const ContractAddress = contractRegistration.address;
const ContractABI = contractRegistration.abi;

// Instance web3
const web3 = new Web3(Web3.givenProvider);


const Verificateur = () => {
  const [cin, setCin] = useState('');
  const [vaccinationStatus, setVaccinationStatus] = useState('');
  const [ageVerificationStatus, setAgeVerificationStatus] = useState('');
  const [patientCredentials, setPatientCredentials] = useState([]);




  const handleVaccinationVerification = () => {
    // Vaccination verification logic
    // Assume vaccination status is stored in the "vaccinationStatus" variable

    setVaccinationStatus(vaccinationStatus);
  };

  const handleAgeVerification = () => {
    // Age verification logic
    // Assume age verification status is stored in the "ageVerificationStatus" variable

    setAgeVerificationStatus(ageVerificationStatus);
  };

  

  const handleCinChange = async (e) => {
    e.preventDefault();
    setCin(e.target.value);
    if (cin) {
      const contract = new web3.eth.Contract(ContractABI, ContractAddress);
      const credentials = await contract.methods.getPatientCredentials(cin).call();
      const credentialsWithFetchedData = await Promise.all(
        credentials.map(async (credential) => {
          const fetchedData = await fetchPatientDataFromIPFS(credential.credentialHash);
          return { ...credential, fetchedData }; // Assign the fetched data to the credential
        })
      );
      setPatientCredentials(credentialsWithFetchedData);
    }
  };
  

  const fetchPatientDataFromIPFS = async (ipfsHash) => {
    try {
      const response = await axios.get(`https://gateway.ipfs.io/ipfs/${ipfsHash}`);
      const patientData = response.data;
      console.log('Fetched patient data:', patientData);
      return patientData; // Return the fetched data
    } catch (error) {
      console.error('Error fetching patient data from IPFS:', error);
      return null; // Return null in case of error
    }
  };




  const containerStyle = {
    backgroundImage: "url('../images/vérifier.jpg')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };


  return (
    <div className="verificateur-container" style={containerStyle}>
      <input
        type="text"
        value={cin}
        onChange={handleCinChange}
        placeholder="Numéro de CIN"
        className="cin-input"
      />
      <button onClick={handleVaccinationVerification} className="verification-button">
        Vérifier vaccination Covid
      </button>
      <button onClick={handleAgeVerification} className="verification-button">
        Vérifier l'âge
      </button>

      {vaccinationStatus && (
        <p className="verification-status">Statut de vaccination : {vaccinationStatus}</p>
      )}
      {ageVerificationStatus && (
        <p className="verification-status">Statut de vérification d'âge : {ageVerificationStatus}</p>
      )}
    </div>
  );
};

export default Verificateur;
