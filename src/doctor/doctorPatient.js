import React from "react";
import Sidebar from './sidebar';
import NavigationBar from "./NavigationBar-doctor";
import '../patient/patientInterface.css';
import PatientList from "./ComposanteDoctorPatient";



function DoctorPatient(){



    return(
        <div>
            <div className="NavigationBar">
            <NavigationBar/>
            </div>
            <div className="Sidebar">
            <Sidebar/>
            </div>
            <PatientList/>

            

        </div>
    );

}

export default DoctorPatient;