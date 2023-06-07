import React from 'react';
import NavigationBar from './NavigationBar-admin';
import Bande from './Bande';
import PatientTableWait from './patientTableWait';



function AdminPatientWait() {

  return (
    <div>
      <NavigationBar/>
      <Bande />
      <PatientTableWait/>
    </div>
  );
};

export default AdminPatientWait;