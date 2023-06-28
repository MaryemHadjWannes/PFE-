import React, { useState } from "react";
import emailjs from "emailjs-com";
import Web3 from 'web3';
import './forgotPassword.css';
import RegistrationContract from './contract/contractRegistration.json'

const web3 = new Web3(window.ethereum);
const contractAddress = RegistrationContract.address;
const abi = RegistrationContract.abi;
const contract = new web3.eth.Contract(abi, contractAddress);


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetError, setResetError] = useState("");

  const sendCode = (e) => {
    e.preventDefault();
    const generatedCode = Math.floor(1000 + Math.random() * 9000).toString(); // generate 4-digit code
    const templateParams = {
      email: email,
      code: generatedCode,
    };
    emailjs
      .send('service_p5x1xzo', 'template_n9d91g4', templateParams, 'Eted1PavUtADO0gkG')
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
          setGeneratedCode(generatedCode); // set the generated code in state
          setStep(2);
        },
        (error) => {
          console.log("Email sending failed:", error);
          setError("Error sending email. Please try again later.");
        }
      );
  };

  const checkCode = (e) => {
    e.preventDefault();
    if (code === "") {
      setError("Please enter the 4-digit code sent to your email.");
      return;
    }
    // check if the entered code matches the generated code
    if (code === generatedCode) { // compare with generated code in state
      setStep(3);
    } else {
      setError("Incorrect code. Please try again.");
    }
  };

  const resetPassword =async (e) => {
    e.preventDefault();
    if (newPassword === "" || confirmPassword === "") {
      setResetError("Please enter a new password and confirm it.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetError("Passwords do not match. Please try again.");
      return;
    }
    // Perform password reset logic here
    // 
    const accounts = await web3.eth.getAccounts();
    const doctor = await contract.methods.getDoctor(email).call();
    if(doctor[5]===accounts[0]){
    await contract.methods.modifyDoctorPassword(email, Web3.utils.sha3(newPassword)).send({ from: accounts[0] });

    // Redirect to a success page or login page
    window.location.href = "/signin";
    }
  };

  return (
    <div className="ContainerPassword">
      <div className="ForgotPassword">
        <h2>Forgot Password</h2>
        {step === 1 ? (
          <form onSubmit={sendCode}>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <button type="submit">Send Code</button>
            {error && <div className="error">{error}</div>}
          </form>
        ) : step === 2 ? (
          <form onSubmit={checkCode}>
            <label>
              Enter the 4-digit code sent to your email:
              <input type="text" maxLength="4" value={code} onChange={(e) => setCode(e.target.value)} />
            </label>
            <button type="submit">Confirm</button>
            {error && <div className="error">{error}</div>}
          </form>
        ) : (
          <form onSubmit={resetPassword}>
            <label>
              New Password:
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </label>
            <label>
              Confirm New Password:
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </label>
            <button type="submit">Reset Password</button>
            {resetError && <div className="error">{resetError}</div>}
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
