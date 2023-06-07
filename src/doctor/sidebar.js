import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import '../patient/sidebar.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faTimes, faUser, faFileMedical, faBriefcaseMedical, faCalendarAlt, faPrescriptionBottleAlt, faMoneyCheckAlt, faNotesMedical, faFlask, faMedkit, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faBars, faTimes, faUser, faFileMedical, faBriefcaseMedical, faCalendarAlt, faPrescriptionBottleAlt, faMoneyCheckAlt, faNotesMedical, faFlask, faMedkit, faUserFriends);

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <FontAwesomeIcon
        icon={isSidebarOpen ? faTimes : faBars}
        className="toggle-icon"
        onClick={handleToggleSidebar}
      />
      {isSidebarOpen && (
        <div className="SideBarPatient">
          <ul className="liste-navbar">
            <li>
              <NavLink activeClassName="active" to="/doctorInterface">
                <FontAwesomeIcon icon={faUser} className="icon" />
                Doctor Profile
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/doctorSchedule">
                <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
                Schedule Management
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/DoctorPatient">
                <FontAwesomeIcon icon={faUserFriends} className="icon" />
                Fill Passeport
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/doctorPasseports">
                <FontAwesomeIcon icon={faPrescriptionBottleAlt} className="icon" />
                Get Passeport
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/doctorLabTests">
                <FontAwesomeIcon icon={faFlask} className="icon" />
                Laboratory Test Results
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/doctorBilling">
                <FontAwesomeIcon icon={faMoneyCheckAlt} className="icon" />
                Billing and Payments
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
