import React, { useState } from 'react';
import '../patient/composanteInfo.css';

function MonFormulaire() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [codeCnam, setCodeCnam] = useState('');
  const [numCin, setNumCin] = useState('');
  const [resultatVaccination, setResultatVaccination] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleNomChange = (event) => {
    setNom(event.target.value);
  };

  const handlePrenomChange = (event) => {
    setPrenom(event.target.value);
  };

  const handleCodeCnamChange = (event) => {
    setCodeCnam(event.target.value);
  };

  const handleNumCinChange = (event) => {
    setNumCin(event.target.value);
  };

  const handleResultatVaccinationChange = (event) => {
    setResultatVaccination(event.target.value);
  };

  const handlePhotoChange = (event) => {
    setPhoto(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Enregistrer la carte ici
  };

  const handleEnvoyerAuPatient = () => {
    // Envoyer la carte remplie au patient ici
  };

  return (
    <div className="main-content">
          <div className="container">
            
           <form className="formPasseport" onSubmit={handleSubmit}>
          <label>
            LastName:
            <input className="nomInput" type="text" value={nom} onChange={handleNomChange} />
          </label>
          
          <label>
            FirstName:
            <input className="prenomInput" type="text" value={prenom} onChange={handlePrenomChange} />
          </label>
          
          <label>
            CNAM Code:
            <input className="cnamInput" type="text" value={codeCnam} onChange={handleCodeCnamChange} />
          </label>
         
          <label>
            CIN Number:
            <input className="cinInput" type="text" value={numCin} onChange={handleNumCinChange} />
          </label>
          
          <label>
            Vaccination Result:
            <input className="vaccinationInput" type="text" value={resultatVaccination} onChange={handleResultatVaccinationChange} />
          </label>
          
          <label>
            Photo:
            <input className="photoInput" type="file" accept="image/*" onChange={handlePhotoChange} />
          </label>
         
          <button className="enregistrerButton" type="submit">Save</button>
        </form>
        <div className="cardPass">
          <h2>Medical Passeport</h2>
          <div className="cardContent" style={{ display: 'flex' }}>
            <div className="cardInfo" style={{ width: '50%' }}>
              <p>LastName: {nom}</p>
              <p>FirstName: {prenom}</p>
              <p>CNAM Code: {codeCnam}</p>
              <p>CIN Number: {numCin}</p>
              <p>Vaccination Result: {resultatVaccination}</p>
              <button className="envoyerButton" onClick={handleEnvoyerAuPatient}>Send to Patient</button>
            </div>
            <div className="photoCard" style={{ width: '50%' }}>
              {photo && <img className="photoCardImg" src={photo} alt="Photo du patient" style={{ width: '100%' }} />}
            </div>
          </div>
        </div>
 
    </div>
    </div>
    
  );
}

export default MonFormulaire;
