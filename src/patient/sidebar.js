import React ,{useState} from "react";
import { NavLink } from "react-router-dom";
import './sidebar.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faTimes,faUser, faFileMedical, faBriefcaseMedical, faNotesMedical, faFlask, faMedkit, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faBars, faTimes,faUser, faFileMedical, faBriefcaseMedical, faNotesMedical, faFlask, faMedkit, faUserFriends);


const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='SideBarPatient'>
      <FontAwesomeIcon
        icon={isSidebarOpen ? faTimes : faBars}
        className="toggle-icon"
        onClick={handleToggleSidebar}
      />
      {isSidebarOpen && (
      <div className="containerSide">
      <ul className="liste-navbar">
        <li>
          <NavLink activeClassName="active" to="/patientInterface">
          <FontAwesomeIcon icon="user" className="icon" />
            Patient Information
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/patientPasseport">
          <FontAwesomeIcon icon={faFileMedical} className="icon" />
            Medical Passport
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/patientInsurance">
          <FontAwesomeIcon icon={faBriefcaseMedical} className="icon" />
            Insurance Offer
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/patientVisit">
          <FontAwesomeIcon icon={faNotesMedical} className="icon" />
            Doctor Visit
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/patientLaboratory">
          <FontAwesomeIcon icon={faFlask} className="icon" />
            Laboratory Test
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/patientPharmacy">
          <FontAwesomeIcon icon={faMedkit} className="icon" />
            Pharmacy Medication
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/patientFamily">
          <FontAwesomeIcon icon={faUserFriends} className="icon" />
            Related Persons
          </NavLink>
        </li>
      </ul>
    </div>
    )}
    </div> 
  );
};

export default Sidebar;
