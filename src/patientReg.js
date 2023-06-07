import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { Link } from 'react-router-dom'
import './styles/patientReg.css'
import Web3 from 'web3';
import contractData from './contract/contractWait.json';




function PatientSignup() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [cin,setCIN]=useState("");
  const [birth,setBirth]=useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);

  const formData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
	  password: password,
  };


  useEffect(() => {
    const checkMetamaskConnection = async () => {
      if (window.ethereum && window.ethereum.selectedAddress) {
        setIsMetamaskConnected(true);
      } else {
        setIsMetamaskConnected(false);
      }
    };
  
    checkMetamaskConnection();
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();

    

    // Envoi de l'email de confirmation
  emailjs.send('service_p5x1xzo', 'template_p4fstv2', formData, 'Eted1PavUtADO0gkG')
  .then((result) => {
    console.log(result.text);
    // Affichage d'un message de confirmation à l'utilisateur
    alert('Thank you ' + formData.firstName + ',vous être envoyé à l\'adresse ' + formData.email);
  }, (error) => {
    console.log(error.text);
    // Affichage d'un message d'erreur à l'utilisateur
    alert('Une erreur est survenue lors de l\'envoi du formulaire.');
  });
   setFirstName('');
   setLastName('');
   setCIN('');
   setBirth('');
   setEmail('');
   setPassword('');
   setConfirmPassword('');
 
  }

  const web3 = new Web3(window.ethereum); 

  const address=contractData.address  
  const abi=contractData.abi;

  const doctorRegistry = new web3.eth.Contract(
  abi,
  address
  );

  // Appeler la fonction registerDoctor du contrat DoctorRegistry
  const handleSignup1 = async (event) => {
  event.preventDefault();

   
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  const firstName= document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const cin = document.getElementById('cin').value;
  const birth = document.getElementById('birth').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  



  const hashedPassword = web3.utils.sha3(password);

  console.log(email, firstName,lastName,cin,  hashedPassword, account,birth);
  await doctorRegistry.methods.registerPatient(firstName,lastName,cin ,email,  hashedPassword, account,birth).send({ from:account, gas: 5000000 });

  //alert('Merci ' + firstName + ', vous êtes désormais inscrit comme patient sur le registre.');

  window.location.href="/ConfirmationPage";
  
};


const handleFormSubmit = (event) => {

  event.preventDefault();
  

  let isFormValid = true;

  // Validate CIN
  if (!isValidCIN(cin)) {
    alert('CIN must be a number with exactly 8 digits');
    isFormValid = false;
    // Add CSS class to the CIN input field
    document.getElementById('cin').classList.add('invalid');
  } else {
    // Remove CSS class from the CIN input field if it was previously added
    document.getElementById('cin').classList.remove('invalid');
  }

  // Validate password and confirm password
  if (password !== confirmPassword) {
    alert('Password and confirm password do not match');
    isFormValid = false;
    // Add CSS class to the password and confirm password input fields
    document.getElementById('password').classList.add('invalid');
    document.getElementById('confirmPassword').classList.add('invalid');
  } else {
    // Remove CSS class from the password and confirm password input fields if they were previously added
    document.getElementById('password').classList.remove('invalid');
    document.getElementById('confirmPassword').classList.remove('invalid');
  }

  if (!isFormValid) {
    return;
  }

  console.log(isMetamaskConnected);

  /* if (isMetamaskConnected==false) {
    alert('Vous devez vous connecter à votre compte MetaMask');
    return null; // Arrête l'exécution de la fonction pour ne pas afficher le reste du formulaire
  } */

    /*handleSubmit(event);*/
    handleSignup1(event);
  };

  const isValidCIN = (cin) => {
    return /^\d{8}$/.test(cin);
  };



  return (
    <div className='background'>
    <form onSubmit={handleFormSubmit} className="form-container" >
      <h1>Patient Registration</h1>
      
      <label htmlFor="firstName" className="label-field">First Name:</label>
      <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="input-field"/>

      <label htmlFor="lastName" className="label-field">Last Name :</label>
      <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="input-field"/>

	    <label htmlFor="cin" className="label-field">CIN:</label>
      <input type="text" id="cin" value={cin} onChange={(e) => setCIN(e.target.value)} required className="input-field"/>

      <label htmlFor="birth" className="label-field">Birth Date:</label>
      <input type="date" id="birth" value={birth} onChange={(e) => setBirth(e.target.value)} required className="input-field-birth"/>

      <label htmlFor="email" className="label-field">Email :</label>
      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-field"/>

      <label htmlFor="password" className="label-field">Password :</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-field"/>

	    <label htmlFor="confirmPassword" className="label-field">Connfirm Password :</label>
      <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="input-field"/>

      <button type="submit" className="submit-button">Register</button>
      <p>
         Already registered?{" "}
         <Link to="/signin">Sign in here</Link>
     </p>
    </form>    
  </div>
        
);

}

export default PatientSignup;