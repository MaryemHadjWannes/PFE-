import React from "react";
import { NavLink } from "react-router-dom";
import Sidebar from './sidebar';
import NavigationBar from "./NavigationBar-patient";
import './patientInterface.css';
import ComposanteFamily from "./composanteFamily";

function PatientFamily(){



    return(
        <div>
            <div className="NavigationBar">
            <NavigationBar/>
            </div>
            <div className="Sidebar">
            <Sidebar/>
            </div>
            <ComposanteFamily/>

        </div>
    );

}

export default PatientFamily;