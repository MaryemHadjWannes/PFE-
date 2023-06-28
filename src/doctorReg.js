import { useState} from "react";
import emailjs from 'emailjs-com';
import "./styles/doctorReg.css";
import { Link } from 'react-router-dom';
import Web3 from "web3";
import contractData from './contract/contractWait.json';

/** */
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';


function DoctorSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cin,setCIN]=useState("");
  const [medicalNumber,setMedicalNumber]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  



  const formData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };

  const handleSignup = (event) => {
    event.preventDefault();
    // Code pour soumettre le formulaire
     // Récupération des données du formulaire
  

  // Envoi de l'email de confirmation
  emailjs.send('service_p5x1xzo', 'template_p4fstv2', formData, 'Eted1PavUtADO0gkG')
    .then((result) => {
      console.log(result.text);
      // Affichage d'un message de confirmation à l'utilisateur
      alert('Merci ' + formData.firstName + ', un email de confirmation vient de vous être envoyé à l\'adresse ' + formData.email);
    }, (error) => {
      console.log(error.text);
      // Affichage d'un message d'erreur à l'utilisateur
      alert('Une erreur est survenue lors de l\'envoi du formulaire.');
    });

  // Remise à zéro des champs du formulaire
  setFirstName('');
  setLastName('');
  setCIN('');
  setMedicalNumber('');
  setEmail('');
  setPassword('');
  setConfirmPassword('');

};



// Créer une instance de Web3 en se connectant à un nœud Ethereum local
//const web3 = new Web3(window.ethereum); 
const web3 = new Web3(window.ethereum);
const adresse=contractData.address;
const abi=contractData.abi;

const doctorRegistry = new web3.eth.Contract(abi,adresse);


// Appeler la fonction registerDoctor du contrat DoctorRegistry
const handleSignup1 = async (event) => {
  event.preventDefault();

  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const cin = document.getElementById('cin').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const medicalNumber = document.getElementById('medicalNumber').value;

  const hashedPassword = web3.utils.sha3(password);

  console.log(email, firstName, lastName,cin, hashedPassword, account, medicalNumber);
  await doctorRegistry.methods.registerDoctor(firstName, lastName,cin,email, hashedPassword,account, medicalNumber).send({ from: account, gas: 5000000 });

    /*alert('Merci ' + firstName + ', vous êtes désormais inscrit comme médecin sur le registre.'); */
    window.location.href="/ConfirmationPage";
  };


/** */

  const handleFormSubmit = (event) => {
    /*handleSignup(event);*/
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

    handleSignup1(event);    

	
	//console.log('New doctor registration');
	//toast.info('New doctor registration');

  };

  const isValidCIN = (cin) => {
    return /^\d{8}$/.test(cin);
  };

  return (
	<div className='backgroundDoc' >
	    <ToastContainer autoClose={5000} position="top-right" />
    <div className="doctorSignup">
      <form onSubmit={handleFormSubmit}>
	  <h1> Doctor Registration </h1>
        <label htmlFor="firstName">FirstName :</label>
        <input type="text" id="firstName" name="firstName" value={firstName} onChange={(event) => setFirstName(event.target.value)} />

        <label htmlFor="lastName">LastName :</label>
        <input type="text" id="lastName" name="lastName" value={lastName} onChange={(event) => setLastName(event.target.value)} />

	    	<label htmlFor="cin">CIN :</label>
        <input type="number" id="cin" name="cin" value={cin} onChange={(event) => setCIN(event.target.value)} />

        <label htmlFor="medicalNumber">Medical License Number :</label>
        <input type="number" id="medicalNumber" name="medicalNumber" value={medicalNumber} onChange={(event) => setMedicalNumber(event.target.value)} />

        <label htmlFor="email">Email :</label>
        <input type="email" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />

        <label htmlFor="password">Password :</label>
        <input type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />

        <label htmlFor="confirmPassword">Confirm Password :</label>
        <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />

        <button type="submit">Register</button>

        <p>
          Already registered?{" "}
          <Link to="/signin">Sign in here</Link>
        </p>
        
        </form>
      
    </div>
	</div>
  );
}

export default DoctorSignup;