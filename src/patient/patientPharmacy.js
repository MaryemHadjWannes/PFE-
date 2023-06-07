import React from "react";
import { NavLink } from "react-router-dom";
import Sidebar from './sidebar';
import NavigationBar from "./NavigationBar-patient";
import './patientInterface.css';


function PatientPharmacy(){



    return(
        <div>
            <div className="NavigationBar">
            <NavigationBar/>
            </div>
            <div className="Sidebar">
            <Sidebar/>
            </div>
            

        </div>
    );

}

export default PatientPharmacy;