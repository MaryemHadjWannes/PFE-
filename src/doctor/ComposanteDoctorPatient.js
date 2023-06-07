import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.min.css';
import contractRegistration from '../contract/contractRegistration.json';
import agent from '../veramo/setup';
import './patientList.css'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

import axios from 'axios';

import contractStoreCredential from './contractStoreCredential.json'


const ContractAddress = contractRegistration.address;
const ContractABI = contractRegistration.abi;

const storeAddress=contractStoreCredential.address;
const storeAbi=contractStoreCredential.abi;

const web3 = new Web3(Web3.givenProvider);

//const pinata = pinataSDK('1a2f7fd1efe226c390ec', 'ad1be9ec4972a6a3416162edf5e4ee95bfe99352ebab6c8d3c1fd082e6178d52');
const pinataBaseURL = 'https://api.pinata.cloud';
const pinataApiKey = '1a2f7fd1efe226c390ec';
const pinataSecretApiKey = 'ad1be9ec4972a6a3416162edf5e4ee95bfe99352ebab6c8d3c1fd082e6178d52'

const PatientList = () =>{
    const [patientDid, setPatientDid] = useState(null);
    const [searchCIN, setSearchCIN] = useState('');
    const [firstName, setFirstName] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [issuerPublicKey, setIssuerPublicKey] = useState([]);
     // Declare the state variable to store the CIN
    const [cinPatient, setCinPatient] = useState('');
    const[cinDoctor,setCinDoctor]=useState('');
    const [patientCredentials, setPatientCredentials] = useState([]);
    const [vaccineData, setVaccineData] = useState({
        you: '',
        vaccineName: '',
        vaccineDose: '',
        vaccineDate: '',
        vaccineLocation: ''
      });
      const [credential, setCredential] = useState(null);

      const cities = [
        'Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabes', 'Gafsa', 'Jendouba',
        'Kairouan', 'Kasserine', 'Kebili', 'La Manouba', 'Le Kef', 'Mahdia',
        'Médenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana',
        'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
      ];

      const Vaccines =['Pfizer-BioNTech','Janssen','AstraZeneca','Moderna','Sinovac'];
      const Doses=['1','2'];

      const [isFormOpen, setIsFormOpen] = useState(false);


// 1. Instancier le smart contract de REgistration à partir de Web3
const contract = new web3.eth.Contract(ContractABI, ContractAddress);


// 2. Récupérer le DID du patient à partir de son CIN
const getCINDid = async (cin) => {
    try {
      const patientDid = await contract.methods.getPatientDidByCIN(cin).call();
      return patientDid;
    } catch (error) {
      console.error(error);
      return null;
    }
  };


 // 2.1. Fonction de recherche du CIN
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchCIN) {
      const patientDid = await getCINDid(searchCIN);
      setPatientDid(patientDid);

      // Update the cinConstant state variable
      setCinPatient(searchCIN);
      const patient = await contract.methods.getPatientByCIN(searchCIN).call();
      setFirstName(patient[0]);
      
      toggleForm(); // Toggle the form open

      // Retrieve the patient credentials
      const credentials = await contract.methods.getPatientCredentials(searchCIN).call();
      const credentialsWithFetchedData = await Promise.all(
        credentials.map(async (credential) => {
          const fetchedData = await fetchPatientDataFromIPFS(credential.credentialHash);
          return { ...credential, fetchedData };
        })
      );
      setPatientCredentials(credentialsWithFetchedData);
    }
  }; 


  // 3. Remplir le passeport pour le patient
  const fillPassport = async (cin, vaccineData) => {
    try {
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0]; 
        const cinDoctor= await contract.methods.getDoctorCinFromAccount(account).call();
        setCinDoctor(cinDoctor);
        
      const patientDid = await getCINDid(cin);
      
      if (patientDid) {
        const doctorDid = await contract.methods.getDoctorDidFromAccount(account).call();
        const context = agent;


  //3.1 Create doctor identifier and import it to the agent 
        const identifier = {
            did: doctorDid,
            provider: 'did:ethr',
            controllerKeyId: account,
            keys: [
              {
                kid: account,
                kms: 'local',
                type: 'Secp256k1',
                publicKeyHex: account,
                privateKeyHex: privateKey,
              },
            ],
            services: [],
          };

        console.log(JSON.stringify(identifier, null, 2))
        const doctorid = await agent.didManagerImport(identifier, context); //importation de DID de docteur  
        console.log(doctorid)

        
  //3.2 Create Verifiable Credential with the DID of the Doctor
        const verifiableCredential = await agent.createVerifiableCredential({
          credential: {
            credentialSubject: {
              you: firstName,
              id: patientDid,
              vaccineName: vaccineData.vaccineName,
              vaccineDose: vaccineData.vaccineDose,
              vaccineDate: vaccineData.vaccineDate,
              vaccineLocation: vaccineData.vaccineLocation
            },
            issuer: {
              id: doctorid.did
            },
            type: ['VerifiableCredential'],
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            issuanceDate: new Date().toISOString()
          }
        });



  //Post data to IPFS      
      const { data: pinataResponse } = await axios.post(
        `${pinataBaseURL}/pinning/pinJSONToIPFS`,
        {
          pinataMetadata: {
            name: 'Verifiable Credential',
          },
          pinataContent: verifiableCredential,
        },
        {
          headers: {
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
          },
        }
      );

      const { IpfsHash } = pinataResponse;

  // Store the IPFS hash in the smart contract
      const contractStore=new web3.eth.Contract(storeAbi, storeAddress);
      await contractStore.methods.storeCredentialHash(patientDid, IpfsHash).send({ from: account });
        console.log(IpfsHash);

  // Fetch data from IPFS (Console)
        fetchPatientDataFromIPFS(IpfsHash);
  
  //Notif credential creation      
        console.log('New credential created');
  //Show the json file structure of the credential
        console.log(JSON.stringify(verifiableCredential, null, 2));
  //Store the value of verifiable Credential      
        setCredential(verifiableCredential);
        // Stocker la credential dans une constante si nécessaire
        // const credential = verifiableCredential;
        const credentialHash = await getCredentialHash(patientDid);
        console.log(credentialHash);
        console.log(cinPatient,credentialHash,cinDoctor);
  
  //Store for each patientCIN {credentialHash and doctorCIN into  smart contract Registration 
        await contract.methods.storeCredentialHashAndDoctorCIN(cinPatient,credentialHash,cinDoctor).send({from: account});

      } else {
        console.log('Patient with CIN not found.');
      }

      setIsFormOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getCredentialHash = async (patientDid) => {
    try {
      const contractStore = new web3.eth.Contract(storeAbi, storeAddress);
      const hash = await contractStore.methods.getCredentialHash(patientDid).call();
      console.log('Credential Hash:', hash);
      return hash;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  

//fetchDataFromIPFS
const fetchPatientDataFromIPFS = async (ipfsHash) => {
  try {
    const response = await axios.get(`https://gateway.ipfs.io/ipfs/${ipfsHash}`);
    const patientData = response.data;
    console.log('Fetched patient data:', patientData);
    // Process the fetched data as needed
    // Display the patient data in a separate section on the interface
  } catch (error) {
    console.error('Error fetching patient data from IPFS:', error);
  }
};


const toggleForm = () => {
  setIsFormOpen((prevIsFormOpen) => !prevIsFormOpen);
};


  

  return(
    <div className="main-content">
    <div className="container-passeport">


        <div className='box searchCIN'>
            <h2 className="section-title">Search Patient DID</h2>
            <form onSubmit={handleSearch}>
                <label className="form-label">Search By CIN :</label>
                <input
                type="text"
                placeholder='Enter CIN'
                className="form-control"
                value={searchCIN}
                onChange={(e) => setSearchCIN(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Search</button>
            </form>
            <br></br>

            <div className='DID-du-patient'>
            {patientDid && (
                <div>
                <h3 className="section-title"> Patient DID:</h3>
                <p className="did">{patientDid}</p>
                </div>
            )}
            </div>

         </div>
            <br></br>
            
            
         <div className='box RemplirPasseport'> 
            <h2 className="section-title" onClick={toggleForm}> Fill in the passport for the patient</h2>
            {isFormOpen && (
            <form onSubmit={(e) => {
                e.preventDefault();
                fillPassport(searchCIN, vaccineData);
            }}>
                <label className="form-label">Patient Name :</label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  readOnly
                  onChange={(e) => setVaccineData({ ...vaccineData, you: e.target.value })}
                />
                <label className="form-label">Vaccine Name :</label>
                <select
                className="form-select"
                value={vaccineData.vaccineName}
                onChange={(e) => setVaccineData({ ...vaccineData, vaccineName: e.target.value })}
                >
                  <option value="">Select a Vaccine</option>
                  {Vaccines.map((vaccine) => (
                    <option key={vaccine} value={vaccine}>{vaccine}</option>
                  ))}
                </select>

                <label className="form-label">Batch n° :</label>
                <input
                type='text'
                className="form-control"
                value={vaccineData.vaccineDose}
                onChange={(e) => setVaccineData({ ...vaccineData, vaccineDose: e.target.value })}
                />

                <label className="form-label">Vaccine Date :</label>
                <input
                type="date"
                className="form-control"
                value={vaccineData.vaccineDate}
                onChange={(e) => setVaccineData({ ...vaccineData, vaccineDate: e.target.value })}
                />
                <label className="form-label">Vaccine Place:</label>
                <select
                  className="form-select"
                  value={vaccineData.vaccineLocation}
                  onChange={(e) => setVaccineData({ ...vaccineData, vaccineLocation: e.target.value })}
                >
                  <option value="">Select a location</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>


                <label className="form-label">Private Key :</label>
                <input
                type="text"
                className="form-control"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Fill in the passport</button>
            </form>
           )}
           </div>  
              

            <br></br>

            <div className='Informations-de-la-credential'>
          {credential && (
            <div>
              <h3 className="section-title">Credential Information:</h3>
              <pre>{JSON.stringify(credential, null, 2)}</pre>
              {/* {/* Add a new div to display patient data }
              <div className="patient-data">
                <h3 className="section-title">Patient Data:</h3> */}
                {/* Display the patient data here */}
                {/* Example: }
                <p>Name: {credential.credentialSubject.you}</p>
                <p>Vaccine Name: {credential.credentialSubject.vaccineName}</p>
                <p>Vaccine Date: {credential.credentialSubject.vaccineDate}</p>
                <p>Vaccine Location: {credential.credentialSubject.vaccineLocation}</p>
              </div> */}
             
            </div>
          )}
        </div>

       {/* <div className="patient-credentials">
          <h3 className="section-title">Patient Credentials:</h3>
          {patientCredentials.map((credential, index) => (
            <div key={index} className="credential">
              <p>Credential ID: {credential.issuerCIN}</p>
              <p>Credential Hash: {credential.credentialHash}</p>
              {credential.fetchedData && (
                <div className="fetched-data">
                  <h4>Fetched Data:</h4>
                  <p>Name: {credential.fetchedData.credentialSubject.you}</p>
                  <p>Vaccine Name: {credential.fetchedData.credentialSubject.vaccineName}</p>
                  <p>Vaccine Date: {credential.fetchedData.credentialSubject.vaccineDate}</p>
                  <p>Vaccine Location: {credential.fetchedData.credentialSubject.vaccineLocation}</p>
                  <p>Issuance Date: {credential.fetchedData.issuanceDate}</p>
                  {/* Display other fetched data fields as needed }
              </div> 
                
              )}
            </div>
          ))}
        </div> */}







    </div>
  </div>

  );
};

export default PatientList;