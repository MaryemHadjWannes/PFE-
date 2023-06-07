import React from "react";
import { NavLink } from "react-router-dom";
import Sidebar from './sidebar';
import NavigationBar from "./NavigationBar-patient";
import './patientInterface.css';
import HealthInsurance from "./composanteInsurance";


function PatientInsurance(){



    return(
        <div>
            <div className="NavigationBar">
            <NavigationBar/>
            </div>
            <div className="Sidebar">
            <Sidebar/>
            </div>
            <HealthInsurance/>

        </div>
    );

}

export default PatientInsurance;