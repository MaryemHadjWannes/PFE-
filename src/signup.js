import React, { useState } from "react";
import './styles/Signup.css'; 
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [role, setRole] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Redirect user to the specific registration interface for the selected role
    if (role === "doctor") {
      window.location.href = "/doctor-registration";
    } else if (role === "patient") {
      window.location.href = "/patient-registration";
    } else if (role === "verifier") {
      window.location.href = "/MyComponentV";
    } else if (role === "insurance") {
      window.location.href = "/insurance-registration";
    }
    // Send confirmation email
    setEmailSent(true);
  };

  return (
    <div className="backgroundSignup">
    <div className="signup-container">
      
      <form className="form-Signup" onSubmit={handleFormSubmit}>
      <h2 className="signup-title" >Sign Up</h2>
        <div className="role-selection">
          
          <select id="role" value={role} onChange={handleRoleChange}>
            <option value="">Select a role</option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
            <option value="verifier">Verifier</option>
            <option value="insurance">Insurance</option>
          </select>
        </div>
        <button className="buttonSignUp" type="submit">Next</button>
        <br></br>
        <p>
        Already registered?{" "}
        <Link to="/signin">Sign in here</Link>
        </p>
      </form>
    </div>
    </div>
  );
};

export default SignUp;
