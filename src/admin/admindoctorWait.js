import React from 'react';
import NavigationBar from './NavigationBar-admin';
import Bande from './Bande';
import DoctorTableWait from './doctorTableWait';







function AdminDoctorWait() {

  return (
    <div>
    
      <NavigationBar/>
      <Bande />
      <DoctorTableWait />
     
    </div>
  );
};

export default AdminDoctorWait;