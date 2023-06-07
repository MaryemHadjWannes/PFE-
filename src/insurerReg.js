import { useState,useContext } from "react";
import emailjs from 'emailjs-com';
import "./styles/doctorReg.css";
import { Link } from 'react-router-dom';
import Web3 from "web3";





function DoctorSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");



  const formData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    specialty: specialty,
    licenseNumber: licenseNumber
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
  setEmail('');
  setPassword('');
  setConfirmPassword('');
  setSpecialty('');
  setLicenseNumber('');
};



// Créer une instance de Web3 en se connectant à un nœud Ethereum local
const web3 = new Web3(window.ethereum); 

const abi=[
	{
		"inputs": [],
		"name": "getAllDoctors",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "firstName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "lastName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "password",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "specialty",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "licenseNumber",
						"type": "string"
					}
				],
				"internalType": "struct DoctorRegistry.Doctor[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllPatients",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "nom",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "prenom",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "motDePasse",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dateDeNaissance",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "etatCivil",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "telephone",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "profession",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "medecinTraitant",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "assuranceMaladie",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "policeNumero",
						"type": "string"
					}
				],
				"internalType": "struct DoctorRegistry.Patient[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			}
		],
		"name": "getDoctor",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			}
		],
		"name": "getPatient",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_firstName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_lastName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_password",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_specialty",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_licenseNumber",
				"type": "string"
			}
		],
		"name": "registerDoctor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_nom",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_prenom",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_motDePasse",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_dateDeNaissance",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_etatCivil",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_telephone",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_profession",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_medecinTraitant",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_assuranceMaladie",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_policeNumero",
				"type": "string"
			}
		],
		"name": "registerPatient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const doctorRegistry = new web3.eth.Contract(
  abi,
  "0xB24490d681839D02eb07375C49023599Fd47fc7f"
);



// Appeler la fonction registerDoctor du contrat DoctorRegistry
const handleSignup1 = async (event) => {
  event.preventDefault();

  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  const firstName = document.getElementById('firstName').value;
const lastName = document.getElementById('lastName').value;
const email = document.getElementById('email').value;
const specialty = document.getElementById('specialty').value;
const licenseNumber = document.getElementById('licenseNumber').value;

await doctorRegistry.methods.registerDoctor(email, firstName, lastName, password, specialty, licenseNumber).send({ from: account, gas: 5000000 });

  alert('Merci ' + firstName + ', vous êtes désormais inscrit comme médecin sur le registre.');
};


  const handleFormSubmit = (event) => {
    /*handleSignup(event);*/
    handleSignup1(event);

  };

  return (
	<div className='backgroundDoc' >
		
    <div className="doctorSignup">
      <form onSubmit={handleFormSubmit}>
	  <h1>Inscription médecin</h1>
        <label htmlFor="firstName">Prénom :</label>
        <input type="text" id="firstName" name="firstName" value={firstName} onChange={(event) => setFirstName(event.target.value)} />

        <label htmlFor="lastName">Nom :</label>
        <input type="text" id="lastName" name="lastName" value={lastName} onChange={(event) => setLastName(event.target.value)} />

        <label htmlFor="email">Email :</label>
        <input type="email" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />

        <label htmlFor="password">Mot de passe :</label>
        <input type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />

        <label htmlFor="confirmPassword">Confirmer le mot de passe :</label>
        <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />

        <label htmlFor="specialty">Spécialité :</label>
        <input type="text" id="specialty" name="specialty" value={specialty} onChange={(event) => setSpecialty(event.target.value)} />

        <label htmlFor="licenseNumber">Numéro de licence :</label>
        <input type="text" id="licenseNumber" name="licenseNumber" value={licenseNumber} onChange={(event) => setLicenseNumber(event.target.value)} />

        <button type="submit">S'inscrire</button>
      </form>
      <p>
      Already registered?{" "}
        <Link to="/signin">Sign in here</Link>
      </p>
    </div>
	</div>
  );
}

export default DoctorSignup;