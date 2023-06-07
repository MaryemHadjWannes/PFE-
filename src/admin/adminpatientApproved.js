import React from 'react';
import NavigationBar from './NavigationBar-admin';
import Bande from './Bande';
import PatientTableApproved from './patientTableApproved';



function AdminPatientApproved() {

  return (
    <div>
      <NavigationBar/>
      <Bande />
      <PatientTableApproved/>
    </div>
  );
};

export default AdminPatientApproved;