import React from 'react';
import PDFGenerator from './PDFGenerator';

const PatientPage = () => {
  const patientData = {
    name: 'John Doe',
    age: 30,
    address: '123 Main St, Anytown, USA',
    // Ajouter d'autres données de patient ici
  };

  return (
    <div>
      {/* Autres contenus de la page */}
      <PDFGenerator patientData={patientData} />
    </div>
  );
};

export default PatientPage;
