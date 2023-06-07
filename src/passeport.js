import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import './passeport.css'

function MedicalPassport() {
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [insuranceNumber, setInsuranceNumber] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [vaccinations, setVaccinations] = useState([]);

  function addVaccination(vaccine) {
    setVaccinations([...vaccinations, vaccine]);
  }

  return (
    <div className='medical-passport'>
      <h1>Passeport Médical</h1>
      <div>
        <label>Nom : </label>
        <input value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        <label>Prénom : </label>
        <input value={firstName} onChange={e => setFirstName(e.target.value)} />
      </div>
      <div>
        <label>Numéro d'assurance : </label>
        <input 
          value={insuranceNumber} 
          onChange={e => setInsuranceNumber(e.target.value)} 
        />
      </div>
      <div>
        <label>Groupe sanguin : </label>
        <select value={bloodType} onChange={e => setBloodType(e.target.value)}>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
      </div>
      <div>
        <label>Vaccinations : </label>
        {vaccinations.map(vaccine => <div key={vaccine}>{vaccine}</div>)}
        <button onClick={() => addVaccination('Grippe')}>Ajouter Grippe</button>
        <button onClick={() => addVaccination('Rougeole')}>Ajouter Rougeole</button>
      </div>
      <div>
     
  <QRCode 
    value={`Nom: ${name} \nPrénom: ${firstName} \nNuméro d'assurance: ${insuranceNumber} \nGroupe sanguin: ${bloodType} \nVaccinations: ${vaccinations.join(', ')}`}
  /> 

      </div>
    </div>
  );
}

export default MedicalPassport;