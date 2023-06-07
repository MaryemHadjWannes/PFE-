import React from "react";
import { NavLink } from "react-router-dom";
import Sidebar from './sidebar';
import NavigationBar from "./NavigationBar-patient";
import './patientInterface.css';
import MonFormulaire from "./composanteInfo";

function PatientInterface(){



    return(
        <div>
            <div className="NavigationBar">
            <NavigationBar/>
            </div>
            <div className="Sidebar">
            <Sidebar/>
            </div>
            <MonFormulaire/>

        </div>
    );

}

export default PatientInterface;