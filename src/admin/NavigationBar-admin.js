import React,{useState} from 'react';
import './NavigationBar-admin.css';
import './tableauDoctor';
import './tableauPatient';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importing the Bootstrap JavaScript


function NavigationBar() {
  const [isDoctorsDropdownOpen, setIsDoctorsDropdownOpen] = useState(false);
  const [isPatientsDropdownOpen, setIsPatientsDropdownOpen] = useState(false);
  



  function handleClickDoctors(listType) {
    setIsDoctorsDropdownOpen(!isDoctorsDropdownOpen);
    // Gérer le type de liste sélectionné ici

    // Navigate to the appropriate page
  if (listType === 'WaitedList') {
    window.location.href = '/AdminDoctorWait';
  } else if (listType === 'ApprovedList') {
    window.location.href = '/AdminDoctorApproved';
  }
  }

  function handleClickPatients(listType) {
    setIsPatientsDropdownOpen(!isPatientsDropdownOpen);
    // Gérer le type de liste sélectionné ici

    // Navigate to the appropriate page
  if (listType === 'WaitedList') {
    window.location.href = '/AdminPatientWait';
  } else if (listType === 'ApprovedList') {
    window.location.href = '/AdminPatientApproved';
  }
  }

  function handleClickResolveDID() {
    window.location.href = '/AdminDidDocument';
  }

  return (
    <nav className="navAdmin">
      <div className="logo">Admin</div>
      <div className="buttons">
      <div className={`dropdown ${isDoctorsDropdownOpen ? 'show' : ''}`}>
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="doctorsDropdown"
          onClick={handleClickDoctors}
          aria-expanded={isDoctorsDropdownOpen}
        >
          Doctors
        </button>
        <ul className={`dropdown-menu ${isDoctorsDropdownOpen ? 'show' : ''}`} aria-labelledby="doctorsDropdown">
          <li>
            <button className="dropdown-item" onClick={() => handleClickDoctors('WaitedList')}>
              WaitedList
            </button>
          </li>
          <li>
            <button className="dropdown-item" onClick={() => handleClickDoctors('ApprovedList')}>
              ApprovedList
            </button>
          </li>
        </ul>
      </div>
        <div className={`dropdown ${isPatientsDropdownOpen ? 'show' : ''}`}>
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="patientsDropdown"
          onClick={handleClickPatients}
          aria-expanded={isPatientsDropdownOpen}
        >
          Patients
        </button>
        <ul className={`dropdown-menu ${isPatientsDropdownOpen ? 'show' : ''}`} aria-labelledby="patientsDropdown">
          <li>
            <button className="dropdown-item" onClick={() => handleClickPatients('WaitedList')}>
              WaitedList
            </button>
          </li>
          <li>
            <button className="dropdown-item" onClick={() => handleClickPatients('ApprovedList')}>
              ApprovedList
            </button>
          </li>
        </ul>
      </div>
        <button onClick={handleClickResolveDID}>DIDs</button>
        <button >Transactions</button>
        <button >Contact Us</button>
      </div>
    </nav>
  );
}

export default NavigationBar;
