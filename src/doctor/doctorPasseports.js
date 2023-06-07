import React from "react";
import Sidebar from './sidebar';
import NavigationBar from "./NavigationBar-doctor";
import '../patient/patientInterface.css';
import PasseportsList from "./ComposantePasseports";



function DoctorPasseports(){



    return(
        <div>
            <div className="NavigationBar">
            <NavigationBar/>
            </div>
            <div className="Sidebar">
            <Sidebar/>
            </div>
            <PasseportsList/>

            

        </div>
    );

}

export default DoctorPasseports;