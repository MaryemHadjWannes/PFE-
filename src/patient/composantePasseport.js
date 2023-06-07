import React, { useState, useEffect } from 'react';
import './composanteInfo.css';
import '../doctor/patientList.css';
import Web3 from 'web3';
import contractRegistration from '../contract/contractRegistration.json';
import axios from 'axios';
import QRCode from 'qrcode.react';
import agent from '../veramo/setup';

const RegistrationABI = contractRegistration.abi;
const RegistrationAddress = contractRegistration.address;

// Instance web3
const web3 = new Web3(Web3.givenProvider);

function ComposantePasseport() {
  const [searchCIN, setSearchCIN] = useState('');
  const [cinPatient, setCinPatient] = useState('');
  const [cinDoctor, setCinDoctor] = useState('');
  const [patientCredentials, setPatientCredentials] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [fetchedData, setFetchedData] = useState({});
  const [qrCodeData, setQRCodeData] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

 


  useEffect(() => {
    const fetchData = async () => {
      // 1. Instantiate the smart contract from Web3
      const contract = new web3.eth.Contract(RegistrationABI, RegistrationAddress);
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      const cinPa = await contract.methods.getPatientCinFromAccount(account).call();
      setCinPatient(cinPa);
    };

    fetchData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    const contract = new web3.eth.Contract(RegistrationABI, RegistrationAddress);
    const credentials = await contract.methods.getPatientCredentials(cinPatient).call();

    const credentialsWithFetchedData = await Promise.all(
      credentials.map(async (credential) => {
        const fetchedData = await fetchPatientDataFromIPFS(credential.credentialHash);
        return { ...credential, fetchedData}; // Assign the fetched data to the credential
      })
    );
    setPatientCredentials(credentialsWithFetchedData);
    
    
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

  useEffect(() => {
    if (fetchedData) {
      generateQRCode();
    }
  }, [fetchedData]);

  const generateQRCode = () => {
    const qrCodeData = JSON.stringify(fetchedData);
    setQRCodeData(qrCodeData); // Set the QR code data
  };

 
  const handleVerifyCredential = async (jwt) => {
    try {
      const result = await agent.verifyCredential({credential :jwt});
      console.log('Credential verified:', result.verified);
      // Affichez "Vaccinated" ou "Not Vaccinated" selon le résultat
      // Mettez à jour l'état avec le résultat de la vérification
      setVerificationResult(result.verified);
      if (result.verified) {
        console.log('Vaccinated');
      } else {
        console.log('Not Vaccinated');
      }
    } catch (error) {
      console.error('Error verifying credential:', error);
    }
  };
  


  return (
    <div className="main-content">
      <div className="container-passeport">
        <div className="box searchCIN">
          <h2 className="section-title">Get Patient Credentials</h2>
          <form onSubmit={handleSearch}>
            <button type="submit" className="btn btn-primary">
              Get Passeport
            </button>
          </form>
          <br />

          <div className="patient-credentials">
            <h3 className="section-title">Patient Credentials:</h3>
            {patientCredentials.map((credential, index) => (
              <div
                key={index}
                className={`credential ${credential.issuerCIN === cinDoctor ? 'green' : ''}`}
              >
                <p>Doctor CIN: {credential.issuerCIN}</p>
                {/*<p>Credential Hash: {credential.credentialHash}</p>*/}
                {/* Display the doctor's info if available */}
                <div className="credential-divider"></div>
                {credential.fetchedData ? (
                  <div className="fetched-data">
                    <h4>Fetched Data:</h4>
                    <p>Name: {credential.fetchedData.credentialSubject.you}</p>
                    <p>Vaccine Name: {credential.fetchedData.credentialSubject.vaccineName}</p>
                    <p>Vaccine Date: {credential.fetchedData.credentialSubject.vaccineDate}</p>
                    <p>Vaccine Location: {credential.fetchedData.credentialSubject.vaccineLocation}</p>
                    <div className="credential-divider"></div>
                    <p>Issuance Date: {credential.fetchedData.issuanceDate}</p>
                    {/* Display other fetched data fields as needed */}
                    <div className="qrcode-container">
                    {qrCodeData ? (
            <>
              <QRCode value={verificationResult !== null ? `Vaccinated: ${verificationResult}` : handleVerifyCredential(credential.fetchedData.proof.jwt)} />
              {/*<button onClick={() => handleVerifyCredential(credential.fetchedData.proof.jwt)}> 
                Verify Vaccination
              </button> */}
            </>
          ) : (
            <p>Loading QR code...</p>
          )}                    </div>
                  </div>
                ) : (
                  <p>Loading data...</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComposantePasseport;
