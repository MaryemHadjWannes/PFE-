import React, { useState } from 'react';
import './composanteInfo.css';
import QRCode from 'qrcode.react';

function ComposantePasseport() {
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

  const qrCodeData = `LastName: ${nom}\nFirstName: ${prenom}\nCNAM Code: ${codeCnam}\nCIN Number: ${numCin}\nVaccination Result: ${resultatVaccination}`;

  const handleShareQR = () => {
    //share QR code with verifiers
  };


  return (
    <div className="main-content">
          <div className="container">
            

        <div className="cardPass">
          <h2>Medical Passeport </h2>
          <div className="cardContent" style={{ display: 'flex' }}>
            <div className="cardInfo" style={{ width: '50%' }}>
              <p>LastName: {nom}</p>
              <p>FirstName: {prenom}</p>
              <p>CNAM Code: {codeCnam}</p>
              <p>CIN Number: {numCin}</p>
              <p>Vaccination Result: {resultatVaccination}</p>
              <button className="envoyerButton" onClick={handleEnvoyerAuPatient}>Save</button>
            </div>
            <div className="photoCard" style={{ width: '50%' }}>
              {photo && <img className="photoCardImg" src={photo} alt="Photo du patient" style={{ width: '100%' }} />}
            </div>
          </div>

        </div>

        <div className="formPasseport" style={{ width: '50%' }}>
              <QRCode value={qrCodeData} size={200} />
              <button className="shareButton" onClick={handleShareQR}>Share</button>
        </div>
 
    </div>
    </div>
    
  );
}

export default ComposantePasseport;