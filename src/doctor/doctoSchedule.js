import React from "react";
import Sidebar from './sidebar';
import NavigationBar from "./NavigationBar-doctor";
import '../patient/patientInterface.css';
import Schedule from "./ComposanteSchedule";



function DoctorSchedule(){



    return(
        <div>
            <div className="NavigationBar">
            <NavigationBar/>
            </div>
            <div className="Sidebar">
            <Sidebar/>
            </div>
            <Schedule/>

            

        </div>
    );

}

export default DoctorSchedule;