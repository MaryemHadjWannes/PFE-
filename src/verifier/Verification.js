import React, { useState } from "react";
import Web3 from "web3";
import contractRegistration from '../contract/contractRegistration.json';
import './Verificateur.css';
import agent from '../veramo/setup';
import vaccinatedImage from '../images/Vaccinated.png';
import notVaccinatedImage from '../images/Not-vaccinated.png';

const RegistrationABI = contractRegistration.abi;
const RegistrationAddress = contractRegistration.address;

// Instance web3
const web3 = new Web3(Web3.givenProvider);

const MyComponentV = () => {
  const [cin, setCIN] = useState("");
  const [vaccinated, setVaccinated] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestData, setRequestData] = useState("");

  const handleVerification = async (e) => {
    e.preventDefault();

    try {
      const contract = new web3.eth.Contract(RegistrationABI, RegistrationAddress);

      // Retrieve patient credentials from the smart contract
      const patientCredentials = await contract.methods.getPatientCredentials(cin).call();
      
      // Check if the patient has any credentials
      if (patientCredentials.length > 0) {
        setVaccinated(true);
      } else {
        setVaccinated(false);
      }
    } catch (error) {
      console.log(error);
      setVaccinated(false);
    }
  };

  const handleRequestData = (e) => {
    e.preventDefault();
    // Handle the request for patient data
    // You can store the data or perform any other necessary actions here
    setRequestData("Request Sent");
    // Close the request form
    setShowRequestForm(false);
  };

  return (
    <div className="backgroundVerify">
      <form className="form-Verify" onSubmit={handleVerification}>
        <h2 className="Verify-h2">Verify Passeport</h2>
        <div className="searchVerify">
          <label htmlFor="cin">Patient CIN:</label>
          <div className="inputButtonContainer">
            <input
              type="cin"
              id="cin"
              value={cin}
              onChange={(e) => setCIN(e.target.value)}
              required
            />
            <button className="verifyButton" type="submit">
              Verify
            </button>
          </div>
        </div>
        {vaccinated ? (
          <div>
            <img src={vaccinatedImage} alt="Vaccinated" className="vaccinationImage" />
            <p>If you want to see patient data, <a href="#" onClick={() => setShowRequestForm(true)}>request patient</a>.</p>
          </div>
        ) : (
          <img src={notVaccinatedImage} alt="Not Vaccinated" className="vaccinationImage" />
        )}
      </form>
      
      {showRequestForm && (
        <div className="floatingForm">
          <form className="requestForm">
    <h2>Request Patient Data</h2>
    <div className="formGroup">
      <label htmlFor="sdrIssuer">SDR Issuer:</label>
      <input type="text" id="sdrIssuer" name="sdrIssuer" required />
    </div>
    <div className="formGroup">
      <label htmlFor="sdrSubject">SDR Subject:</label>
      <input type="text" id="sdrSubject" name="sdrSubject" required />
    </div>
    <div className="formGroup">
      <label htmlFor="claimType">Claim Type:</label>
      <input type="text" id="claimType" name="claimType" required />
    </div>
    <div className="formGroup">
      <label htmlFor="claimValue">Claim Value:</label>
      <input type="text" id="claimValue" name="claimValue" required />
    </div>
    <div className="formGroup">
      <label htmlFor="reason">Reason:</label>
      <input type="text" id="reason" name="reason" required />
    </div>
    <div className="formGroup">
      <label htmlFor="credentialIssuer">Credential Issuer:</label>
      <input type="text" id="credentialIssuer" name="credentialIssuer" required />
    </div>
    <div className="requestFormButtons">
      <button className="requestFormButton" type="submit">Request</button>
      <button className="requestFormButton requestFormCancelButton" type="button"onClick={() => setShowRequestForm(false)}>Cancel</button>
    </div>
  </form>
        </div>
      )}
    </div>
  );
};

export default MyComponentV;
