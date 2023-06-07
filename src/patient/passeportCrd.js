import React, { useState } from "react";

function MedicalPassportCard({ fullName, dateOfBirth, bloodType, covidTestResult }) {
  return (
    <div>
      <h2>Medical Passport</h2>
      <p><strong>Name: </strong>{fullName}</p>
      <p><strong>Date of Birth: </strong>{dateOfBirth}</p>
      <p><strong>Blood Type: </strong>{bloodType}</p>
      <p><strong>COVID-19 Test Result: </strong>{covidTestResult}</p>
    </div>
  );
}

function ComposanteInfo() {
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [covidTestResult, setCovidTestResult] = useState("");

  const [showCard, setShowCard] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setShowCard(true);
  }

  return (
    <div>
      <h1>Medical Information</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Patient Information</legend>
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" id="fullName" name="fullName" value={fullName} onChange={(event) => setFullName(event.target.value)} />
          <br />
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input type="date" id="dateOfBirth" name="dateOfBirth" value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} />
        </fieldset>
        <fieldset>
          <legend>Medical History</legend>
          <label htmlFor="bloodType">Blood Type:</label>
          <select id="bloodType" name="bloodType" value={bloodType} onChange={(event) => setBloodType(event.target.value)}>
            <option value="">--Please choose an option--</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </fieldset>
        <fieldset>
          <legend>Test Results</legend>
          <label>COVID-19 Test Result:</label>
          <input type="radio" id="positive" name="covidTest" value="positive" checked={covidTestResult === 'positive'} onChange={(event) => setCovidTestResult(event.target.value)} />
          <label htmlFor="positive">Positive</label>
          <input type="radio" id="negative" name="covidTest" value="negative" checked={covidTestResult === 'negative'} onChange={(event) => setCovidTestResult(event.target.value)} />
          <label htmlFor="negative">Negative</label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
      {showCard && <MedicalPassportCard fullName={fullName} dateOfBirth={dateOfBirth} bloodType={bloodType} covidTestResult={covidTestResult} />}
    </div>
  );
}

export default ComposanteInfo;
