import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.min.css';

import contractRegistration from '../contract/contractRegistration.json'



function PatientTableApproved() {
  const [patients, setPatients] = useState([]);
  const [approuvedPatients, setApprouvedPatients]=useState([]);
  //contractRegistration
  const contractRegistrationAddress =contractRegistration.address ;
  const contractRegistrationabi=contractRegistration.abi;

  //Instance of web3
  const provider = new Web3(window.ethereum);

  

  useEffect(() => {

    async function fetchApprouvedPatients() {
        try {
          
          const contract = new provider.eth.Contract(contractRegistrationabi, contractRegistrationAddress);
          const allPatients = await contract.methods.getAllPatients().call();
          setApprouvedPatients(allPatients);
        } catch (error) {
          console.error(error);
        }
      }
  
      fetchApprouvedPatients();
      
  }, []);


      const handleDeleteApprovedUser =async (userEmail) => {
        // TODO: Mettre à jour le smart contract pour supprimer l'utilisateur
             console.log(userEmail);

            //contractWait
            const  contractRegistration = new provider.eth.Contract(contractRegistrationabi,contractRegistrationAddress);

            const getPatient = async (userEmail) => {
                const patientApproved = await contractRegistration.methods.getPatient(userEmail).call();
                console.log(patientApproved);
                return patientApproved;
            }
            // Get the patient using the email
            const patient = await getPatient(userEmail);
            
            await contractRegistration.methods.deletePatient(patient[3]).send({ from: window.ethereum.selectedAddress });
            console.log('Patient deleted from the Approved List');
          
      };
  

  return (
    <div>
    <div>
        <div id='TabDoc'> 
        <h2>Approved List</h2>
        <table className='table table-striped table-hover'>
        <thead>
                <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>cin</th>
                <th>Email</th>
                <th>Ethereum Account</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {approuvedPatients.map((patient, index) => (
                <tr key={index}>
                    <td>{patient.firstName}</td>
                    <td>{patient.lastName}</td>
                    <td>{patient.cin}</td>
                    <td>{patient.email}</td>
                    <td>{patient.account}</td>
                    <td>
                    <div className="btn-group" role="group">
                        <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => handleDeleteApprovedUser(patient.email)}
                        >
                        Delete
                        </button>
                    </div>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
        </div>
        </div>
        </div>
  );
}

export default PatientTableApproved;