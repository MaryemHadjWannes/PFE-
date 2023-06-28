import { useState } from 'react';
import './styles/App.css';
import {Navigate,  Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import SignIn from './signin';
import SignUp from './signup';
import DoctorSignup from './doctorReg';
import PatientSignup from './patientReg' ;
import MedicalPassport from './passeport' ;
import QRVerifier from './qr';
import AdminInterface from './admin/adminInterface';
import Dashboard from './Dashboard';
import PatientInterface from './patient/patientInterface'
import PatientPasseport from './patient/patientPasseport';
import PatientInsurance from './patient/patientInsurance';
import PatientDoctorVisit from './patient/patientDoctorVisit';
import PatientPharmacy from './patient/patientPharmacy';
import PatientFamily from './patient/patientFamily';
import PatientLaboratory from './patient/patientLaboratory';
import DoctorInterface from './doctor/doctorInterface';
import DoctorSchedule from './doctor/doctoSchedule';
import QRScanner from './Verifier';
import CreateDID from './veramo/createDID';
import AdminPatient from './admin/adminPatient';
import ForgotPassword from './forgotPassword';
import ContactList from './doctor/doctorPatient';
import DoctorPatient from './doctor/doctorPatient';
import CreateCredentialButton from './veramo/create-credential'
import DIDmeta from './DIDmeta';
import DoctorPasseports from './doctor/doctorPasseports';
import PassportQRCode from './passeportQRCode';
import PatientPage from './patient/PatientPage';
import Verificateur from './verifier/verifier';
import ConfirmationPage from './confirmation';


import AdminDoctorWait from './admin/admindoctorWait';
import AdminDoctorApproved from './admin/admindoctorApproved';
import AdminDidDocument from './admin/adminDidDocument';
import AdminPatientWait from './admin/adminpatientWait';
import AdminPatientApproved from './admin/adminpatientApproved';
import DemoApp from './demo';
import BlockchainInterface from './Trace';
import PatientVerification from './verifier/Verification';
import MyComponentV from './verifier/Verification';





function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />

        <Route path="doctor-Registration" element={<DoctorSignup/>} />
        <Route path="patient-Registration" element={<PatientSignup/>} />
        <Route path="VaccinePasseport" element={< MedicalPassport/>} />

        
        <Route path="admin" element={< AdminInterface/>} />
        {/*<Route path="admin" element={<Navigate to="/" />} /> */}
        <Route path="Dashboard" element={<Dashboard/>} />
        
        <Route path="patientInterface" element={<PatientInterface />} />
        <Route path="patientPasseport" element={<PatientPasseport />} />
        <Route path="patientInsurance" element={<PatientInsurance/>}/>
        <Route path="patientVisit" element={<PatientDoctorVisit/>}/>
        <Route path="patientLaboratory" element={<PatientLaboratory/>}/>
        <Route path="patientPharmacy" element={<PatientPharmacy/>}/>
        <Route path="patientFamily" element={<PatientFamily/>}/>

        <Route path="doctorInterface" element={<DoctorInterface/>}/>
        <Route path="doctorSchedule" element={<DoctorSchedule/>}/>
        <Route path="DoctorPatient" element={<DoctorPatient/>}/>
        <Route path="DoctorPasseports" element={<DoctorPasseports/>}/>

        <Route path="verifier0" element={<QRScanner/>}/>
        <Route path="createDID" element={<CreateDID/>}/>
        <Route path="DIDmeta" element={<DIDmeta/>}/>
        <Route path='CreateCredentialButton' element={<CreateCredentialButton/>}></Route>
        <Route path="qr" element={< QRVerifier/>} />

        




        <Route path="ContactList" element={<ContactList/>}/>

        <Route path="PassportQRCode" element={<PassportQRCode/>}/>



        {/* Administrator */}
        <Route path="AdminDoctorWait" element={<AdminDoctorWait/>}></Route>
        <Route path="AdminDoctorApproved" element={<AdminDoctorApproved/>}></Route>
        <Route path="AdminPatientWait" element={<AdminPatientWait/>}></Route>
        <Route path="AdminPatientApproved" element={<AdminPatientApproved/>}></Route>
        <Route path="AdminDidDocument" element={<AdminDidDocument/>}></Route>



        <Route path='ForgotPassword' element={<ForgotPassword/>}></Route>
        

        <Route path='PatientPage' element={<PatientPage/>}></Route>
        <Route path='Verificateur' element={<Verificateur/>}></Route>
        <Route path="ConfirmationPage" element={<ConfirmationPage/>}/>

        <Route path="DemoApp" element={<DemoApp/>}/>
        <Route path='BlockchainInterface' element={<BlockchainInterface/>}/>



        <Route path="PatientVerification" element={<PatientVerification/>}/>

         <Route path="MyComponentV" element={<MyComponentV/>}/>
      
      </Routes>
    </div>
    
  );
}

export default App;
