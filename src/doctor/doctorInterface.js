import React from "react";
import Sidebar from './sidebar';
import NavigationBar from "./NavigationBar-doctor";
import '../patient/patientInterface.css';
import MonFormulaire from './ComposanteInfo';



function DoctorInterface(){



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

export default DoctorInterface;