import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Web3 from "web3";
import './styles/signin.css';
import contractRegistration from './contract/contractRegistration.json';
import contractAdmin from './contract/contractAdmin.json';




const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
 


    const handleSubmit = async (event) => {
    event.preventDefault();

    const provider = new Web3(window.ethereum || window.web3.currentProvider);

    const contractAddress = contractRegistration.address;
    const abi=contractRegistration.abi;
    const contract = new provider.eth.Contract(abi, contractAddress);

    const abiAdmin=contractAdmin.abi;
    const addressAdmin=contractAdmin.address;
    const contractAd = new provider.eth.Contract(abiAdmin, addressAdmin);  


    let isDoctorVerified = false;
    let isPatientVerified = false;
    let isAdminVerified = false;
  
    async function isDoctor(email, password) {
      const doctor = await contract.methods.getDoctor(email).call();
      console.log(doctor[3], doctor[4]);
  
      if (doctor[3] === email && doctor[4] === Web3.utils.sha3(password)) {
        isDoctorVerified = true;
        setIsAuthenticated(true);
        alert("Bienvenue doctor !");
      }
    }

    
    async function isPatient(email, password) {
      const patient = await contract.methods.getPatient(email).call();
      
      console.log(patient[3], patient[4]);
  
      if (patient[3] === email && patient[4] === Web3.utils.sha3(password)) {
        isPatientVerified = true;
        setIsAuthenticated(true);
        alert("Bienvenue patient !");
      }
      
    }

    // Instance web3
    const web3Instance = new Web3(Web3.givenProvider);
    const accounts = await web3Instance.eth.getAccounts();
    const connectedAccount = accounts[0];
    
    async function isAdmin(email, password,connectedAccount) {
    const admin = await contractAd.methods.getAdminByEmail(email).call();
    console.log(admin[0], admin[1],connectedAccount);

    

    if (admin[0] === email && admin[1] === Web3.utils.sha3(password)&& admin[2].toLowerCase()===connectedAccount.toLowerCase()) {
      isAdminVerified = true;
      setIsAuthenticated(true);
      alert("Welcome, admin!");
    }
  }

  await Promise.all([isDoctor(email, password), isPatient(email, password), isAdmin(email, password,connectedAccount)]);

  if (isAdminVerified) {
    setIsAuthenticated(true);
    navigate("/adminInterface");
  } else if (isPatientVerified) {
    setIsAuthenticated(true);
    navigate("/patientInterface");
  } else if (isDoctorVerified) {
    setIsAuthenticated(true);
    navigate("/doctorInterface");
  } else {
    alert("Email or password incorrect!");
  }



    }
  return (
    
    <div className="backgroundSign"  >
      
      <form className="form-Signin" onSubmit={handleSubmit}>
      <h2 className="signin-h2">Sign In</h2>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="signinButton"  type="submit">
          Sign In
        </button>
        <p>
        Not registered yet?{" "}
        <Link className=""to="/signup">Sign up here</Link> <br></br><br></br>
        Forgot password?{" "}
        <Link className=""to="/ForgotPassword"> Change password</Link>
        </p>
        
      </form>
      
    </div>
    
  );
};

export default SignIn;
