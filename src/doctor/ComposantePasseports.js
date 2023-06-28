import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.min.css';
import contractRegistration from '../contract/contractRegistration.json';
import './patientList.css';
import axios from 'axios';

// Contract parameters
const ContractAddress = contractRegistration.address;
const ContractABI = contractRegistration.abi;

// Instance web3
const web3 = new Web3(Web3.givenProvider);

const PatientList = () => {
  const [searchCIN, setSearchCIN] = useState('');
  const [cinPatient, setCinPatient] = useState('');
  const [cinDoctor, setCinDoctor] = useState('');
  const [patientCredentials, setPatientCredentials] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [fetchedData, setFetchedData] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      // 1. Instantiate the smart contract from Web3
      const contract = new web3.eth.Contract(ContractABI, ContractAddress);
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      const cinDoc = await contract.methods.getDoctorCinFromAccount(account).call();
      setCinDoctor(cinDoc);
      
    };

    fetchData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchCIN) {
      setCinPatient(searchCIN);
      const contract = new web3.eth.Contract(ContractABI, ContractAddress);
      const credentials = await contract.methods.getPatientCredentials(searchCIN).call();
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

  return (
    <div className="main-content">
      <div className="container-passeport">
        <div className="box searchCIN">
          <h2 className="section-title">Search Patient Credentials</h2>
          <form onSubmit={handleSearch}>
            <label className="form-label">Search By CIN :</label>
            <input
              type="text"
              placeholder="Enter CIN"
              className="form-control"
              value={searchCIN}
              onChange={(e) => setSearchCIN(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
          <br />


          <div className="patient-credentials">
            <h3 className="section-title">Doctor Credentials:</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Doctor CIN</th>
                  <th>Fetched Data</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {patientCredentials.map((credential, index) => (
                  <tr key={index} className={`credential ${credential.issuerCIN === cinDoctor ? 'green' : ''}`}>
                    <td>{credential.issuerCIN}</td>
                    <td>
                    {credential.fetchedData ? (
                        <div className="fetched-data">
                          <h4>Fetched Data:</h4>
                          <table className="table">
                            <tbody>
                              <tr>
                                <td>Name:</td>
                                <td>{credential.fetchedData.credentialSubject.you}</td>
                              </tr>
                              <tr>
                                <td>Vaccine Name:</td>
                                <td>{credential.fetchedData.credentialSubject.vaccineName}</td>
                              </tr>
                              <tr>
                                <td>Vaccine Dose:</td>
                                <td>{credential.fetchedData.credentialSubject.vaccineDose}</td>
                              </tr>
                              <tr>
                                <td>Vaccine Date:</td>
                                <td>{credential.fetchedData.credentialSubject.vaccineDate}</td>
                              </tr>
                              <tr>
                                <td>Vaccine Location:</td>
                                <td>{credential.fetchedData.credentialSubject.vaccineLocation}</td>
                              </tr>
                              <tr>
                                <td>Issuance Date:</td>
                                <td>{credential.fetchedData.issuanceDate}</td>
                              </tr>
                              {/* Display other fetched data fields as needed */}
                            </tbody>
                          </table>
                          {credential.fetchedData.issuanceDate}
                        </div>
                      ) : (
                        <p>Loading data...</p>
                      )}
                    </td>
                    <td>
                      {credential.issuerCIN === cinDoctor ? (
                        <p>Issued By you</p>
                      ) : (
                        <p>Issued By Another Doctor</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PatientList;
