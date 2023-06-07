import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.min.css';
import contractWait from '../contract/contractWait.json'
import contractRegistration from '../contract/contractRegistration.json'



function PatientTableWait() {
  const [patients, setPatients] = useState([]);
  const [approuvedPatients, setApprouvedPatients]=useState([]);
  //contractRegistration
  const contractRegistrationAddress =contractRegistration.address ;
  const contractRegistrationabi=contractRegistration.abi;



  //contractWait
  const contractWaitAddress=contractWait.address ;
  const contractWaitABI=contractWait.abi ;



  const provider = new Web3(window.ethereum);

  

  useEffect(() => {
    async function fetchPatients() {
      try {
        
        const contract = new provider.eth.Contract(contractWaitABI, contractWaitAddress);
        const allPatients = await contract.methods.getAllPatients().call();
        setPatients(allPatients);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPatients();
      
  }, []);





  const handleApproveUser = async (userEmail)  => {
    // TODO: Mettre à jour le smart contract pour approuver l'utilisateur

        console.log(userEmail);

        //contractRegistration
        const contractRegistration = new provider.eth.Contract(contractRegistrationabi, contractRegistrationAddress);

        //contractWait
        const  contractWait = new provider.eth.Contract(contractWaitABI,contractWaitAddress);

        const getPatient = async (userEmail) => {
            const patientWait = await contractWait.methods.getPatient(userEmail).call();
            console.log(patientWait);
            return patientWait;
        }
        // Get the patient using the email
        const patient = await getPatient(userEmail);
    

        console.log(patient[0],patient[1],patient[2],patient[3],patient[4],patient[5],patient[6]);

        const addPatientsToRegistry = async () => {
        
          await contractRegistration.methods.registerPatient(patient[0],patient[1],patient[2],patient[3],patient[4],patient[5],patient[6]).send({ from: window.ethereum.selectedAddress, gas: 5000000});
          console.log("Patient approved and added to the registry");

          // Delete the patient from the waitlist
          await contractWait.methods.deletePatient(patient[3]).send({ from: window.ethereum.selectedAddress,gas: 5000000 });
          console.log('Patient deleted from the waitlist');
      }
      addPatientsToRegistry();
  };


      const handleDeleteUser =async (userEmail) => {
        // TODO: Mettre à jour le smart contract pour supprimer l'utilisateur
             console.log(userEmail);

            //contractWait
            const  contractWait = new provider.eth.Contract(contractWaitABI,contractWaitAddress);

            const getPatient = async (userEmail) => {
                const patientWait = await contractWait.methods.getPatient(userEmail).call();
                console.log(patientWait);
                return patientWait;
            }
            // Get the patient using the email
            const patient = await getPatient(userEmail);
            
            await contractWait.methods.deletePatient(patient[3]).send({ from: window.ethereum.selectedAddress });
            console.log('Patient deleted from the waitlist');
          
      };
  
     

  return (
    <div>
    <div>
     <div id='TabDoc'> 
  <h2>Waited List</h2>
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
        {patients.map((patient, index) => (
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
                  className="btn btn-outline-success"
                  onClick={() => handleApproveUser(patient.email)}
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => handleDeleteUser(patient.email)}
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

export default PatientTableWait;