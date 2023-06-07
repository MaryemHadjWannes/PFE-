import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.min.css';
import contractWait from '../contract/contractWait.json'
import contractRegistration from '../contract/contractRegistration.json'


function DoctorTableWait() {
  const [doctors, setDoctors] = useState([]);
  //contractRegistration
  const contractRegistrationAddress =contractRegistration.address ;
  const contractRegistrationabi=contractRegistration.abi;



  //contractWait
  const contractWaitAddress=contractWait.address ;
  const contractWaitABI=contractWait.abi ;



  const provider = new Web3(window.ethereum);

  

  useEffect(() => {
    async function fetchDoctors() {
      try {
        
        const contract = new provider.eth.Contract(contractWaitABI, contractWaitAddress);
        const allDoctors = await contract.methods.getAllDoctors().call();
        setDoctors(allDoctors);
      } catch (error) {
        console.error(error);
      }
    }

    fetchDoctors();


    


 } )


  const handleApproveUser = async (userEmail)  => {
    // TODO: Mettre à jour le smart contract pour approuver l'utilisateur

        console.log(userEmail);

        //contractRegistration
        const contractRegistration = new provider.eth.Contract(contractRegistrationabi, contractRegistrationAddress);

        //contractWait
        const  contractWait = new provider.eth.Contract(contractWaitABI,contractWaitAddress);

        const getDoctor = async (userEmail) => {
            const doctorWait = await contractWait.methods.getDoctor(userEmail).call();
            console.log(doctorWait);
            return doctorWait;
        }
        // Get the doctor using the email
        const doctor = await getDoctor(userEmail);
    

        console.log(doctor[0],doctor[1],doctor[2],doctor[3],doctor[4],doctor[5],doctor[6]);

        const addDoctorsToRegistry = async () => {
        
          await contractRegistration.methods.registerDoctor(doctor[0],doctor[1],doctor[2],doctor[3],doctor[4],doctor[5],doctor[6]).send({ from: window.ethereum.selectedAddress, gas: 5000000});
          console.log("Doctor approved and added to the registry");

          // Delete the doctor from the waitlist
          await contractWait.methods.deleteDoctor(doctor[3]).send({ from: window.ethereum.selectedAddress,gas: 5000000 });
          console.log('Doctor deleted from the waitlist');
    
      }

      addDoctorsToRegistry();


  };


      const handleDeleteUser =async (userEmail) => {
        // TODO: Mettre à jour le smart contract pour supprimer l'utilisateur
             console.log(userEmail);

            //contractWait
            const  contractWait = new provider.eth.Contract(contractWaitABI,contractWaitAddress);

            const getDoctor = async (userEmail) => {
                const doctorWait = await contractWait.methods.getDoctor(userEmail).call();
                console.log(doctorWait);
                return doctorWait;
            }
            // Get the doctor using the email
            const doctor = await getDoctor(userEmail);
            
            await contractWait.methods.deleteDoctor(doctor[3]).send({ from: window.ethereum.selectedAddress });
            console.log('Doctor deleted from the waitlist');
          
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
        {doctors.map((doctor, index) => (
          <tr key={index}>
            <td>{doctor.firstName}</td>
            <td>{doctor.lastName}</td>
            <td>{doctor.cin}</td>
            <td>{doctor.email}</td>
            <td>{doctor.account}</td>
            <td>
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={() => handleApproveUser(doctor.email)}
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => handleDeleteUser(doctor.email)}
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

export default DoctorTableWait;
