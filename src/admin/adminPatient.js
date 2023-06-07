import React from 'react';
import NavigationBar from './NavigationBar-admin';
import Bande from './Bande';
import TableauPatient from './tableauPatient';


/** */
import 'react-toastify/dist/ReactToastify.css';




function AdminPatient() {

  return (
    <div>
    
      <NavigationBar/>
      <Bande />
      <TableauPatient />
     
    </div>
  );
};

export default AdminPatient;