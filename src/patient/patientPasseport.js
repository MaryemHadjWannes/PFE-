import React from "react";
import { NavLink } from "react-router-dom";
import Sidebar from './sidebar';
import NavigationBar from "./NavigationBar-patient";
import './patientInterface.css';
import ComposantePasseport from "./composantePasseport";

function PatientPasseport(){



    return(
        <div>
            <div className="NavigationBar">
            <NavigationBar/>
            </div>
            <div className="Sidebar">
            <Sidebar/>
            </div>
            <ComposantePasseport/>

        </div>
    );

}

export default PatientPasseport;