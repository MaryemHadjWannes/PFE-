import React from 'react';
import NavigationBar from './NavigationBar-admin';
import Bande from './Bande';
import DoctorTableApproved from './doctorTableApproved';







function AdminDoctorApproved() {

  return (
    <div>
      <NavigationBar/>
      <Bande />
      <DoctorTableApproved />
    </div>
  );
};

export default AdminDoctorApproved;