import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Web3 from "web3";
import './styles/signin.css';
import contractRegistration from './contract/contractRegistration.json';
import adminRegistration from './contract/contractAdmin.json';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [connectedAccount, setConnectedAccount] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!window.ethereum) {
        alert("Please install MetaMask or use a compatible Ethereum browser.");
        return;
      }
  
      await window.ethereum.enable();
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      setConnectedAccount(account);

      const contractAddress = contractRegistration.address;
      const abi = contractRegistration.abi;
      const contract = new web3.eth.Contract(abi, contractAddress);

      const contractAdminAddress = adminRegistration.address;
      const contractAdminAbi = adminRegistration.abi;
      const Admincontract = new web3.eth.Contract(contractAdminAbi, contractAdminAddress);

    async function isDoctor(email, password, connectedAccount) {
        const doctor = await contract.methods.getDoctor(email).call();
        console.log(doctor[3],email,doctor[4],Web3.utils.sha3(password),doctor[5],connectedAccount)
        if (doctor[3] === email && doctor[4] === Web3.utils.sha3(password) && doctor[5].toLowerCase() === connectedAccount.toLowerCase()) {
          navigate("/doctorInterface");
          alert("Welcome doctor !");
        } 
      }
      
      async function isPatient(email, password, connectedAccount) {
        const patient = await contract.methods.getPatient(email).call();
        console.log(patient[3],email,patient[4],Web3.utils.sha3(password),patient[5],connectedAccount)
        if (patient[3] === email && patient[4] === Web3.utils.sha3(password) && patient[5].toLowerCase() === connectedAccount.toLowerCase()) {
          navigate("/patientInterface");
          alert("Welcome patient !");
        } 
      }

      async function isAdmin(email, password, connectedAccount) {
        const admin = await Admincontract.methods.getAdminByEmail(email).call();
        console.log(admin[0],email, admin[1], Web3.utils.sha3(password) ,admin[2],connectedAccount)
        if (admin[0] === email && admin[1] === Web3.utils.sha3(password) && admin[2] === connectedAccount) {
          navigate("/admin");
          alert("Welcome Admin !");
        } 
      }
      isPatient(email,password,connectedAccount);
      isDoctor(email,password,connectedAccount);
      isAdmin(email,password,connectedAccount)
      
      

  }    
    catch (error) {
    console.error(error);
    alert("An error occurred. Please try again later.");
  }  


  }



  return (
    <div className="backgroundSign">
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
        <button className="signinButton" type="submit">
          Sign In
        </button>
        <p>
          Not registered yet? <Link className="" to="/signup">Sign up here</Link> <br /><br />
          Forgot password? <Link className="" to="/ForgotPassword">Change password</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
