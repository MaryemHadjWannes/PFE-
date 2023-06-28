// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract WaitDoctor {
    struct Doctor {
        string firstName;
        string lastName;
        string cin;
        string email;
        string password;
        address account;
        string code;
    }

    mapping(string => Doctor) private doctors;
    Doctor[] private doctorList;

    function registerDoctor(string memory _firstName, string memory _lastName, string memory _cin, string memory _email ,string memory _password,address _account,string memory _code) public {
        
        require(bytes(_firstName).length > 0, "First name is required");
        require(bytes(_lastName).length > 0, "Last name is required");
        require(bytes(_cin).length > 0, "CIN is required");
        require(bytes(_email).length > 0, "Email is required");
        require(bytes(_password).length > 0, "Password is required");
        

        // Vérifier que l'email n'a pas déjà été enregistré
        require(bytes(doctors[_email].email).length == 0, "Doctor with this email already exists");

        doctors[_email] = Doctor(_firstName, _lastName,_cin ,_email, _password, _account,_code );
        doctorList.push(doctors[_email]);
    }

    function getDoctor(string memory _email) public view returns (string memory, string memory, string memory, string memory, string memory, address, string memory) {
        require(bytes(_email).length > 0, "Email is required");

        Doctor memory doctor = doctors[_email];
       /* require(bytes(doctor.email).length > 0, "Doctor with this email does not exist"); */

        return (doctor.firstName, doctor.lastName,doctor.cin, doctor.email, doctor.password, doctor.account, doctor.code);
    }

    function getAllDoctors() public view returns (Doctor[] memory) {
        return doctorList;
    }


    function deleteDoctor(string memory _email) public {
        require(bytes(_email).length > 0, "Email is required");

        // Verify that the doctor with the given email exists
        require(bytes(doctors[_email].email).length > 0, "Doctor with this email does not exist");

        delete doctors[_email];

        // Remove the doctor from the doctorList array
        for (uint256 i = 0; i < doctorList.length; i++) {
            if (keccak256(bytes(doctorList[i].email)) == keccak256(bytes(_email))) {
                if (i != doctorList.length - 1) {
                    // Move the last element to the deleted position
                    doctorList[i] = doctorList[doctorList.length - 1];
                }
                doctorList.pop();
                break;
            }
        }
    }


    /*Patient*/
    struct Patient {
        string firstName;
        string lastName;
        string cin;
        string email;
        string password;
        address account;
        string birth;
    }

    mapping(string => Patient) private patients;
    Patient[] private patientList;

    function registerPatient(string memory _firstName, string memory _lastName, string memory _cin, string memory _email ,string memory _password,address _account, string memory _birth) public  {
        
        require(bytes(_firstName).length > 0, "First name is required");
        require(bytes(_lastName).length > 0, "Last name is required");
        require(bytes(_cin).length > 0, "CIN is required");
        require(bytes(_email).length > 0, "Email is required");
        require(bytes(_password).length > 0, "Password is required");
        

        // Vérifier que l'email n'a pas déjà été enregistré
        require(bytes(patients[_email].email).length == 0, "Patient with this email already exists");

        patients[_email] = Patient(_firstName, _lastName,_cin ,_email, _password, _account, _birth );
        patientList.push(patients[_email]);
    }

    function getPatient(string memory _email) public view returns (string memory, string memory, string memory, string memory, string memory, address, string memory) {
        require(bytes(_email).length > 0, "Email is required");

        Patient memory patient = patients[_email];
       /* require(bytes(patient.email).length > 0, "Patient with this email does not exist"); */

        return (patient.firstName, patient.lastName, patient.cin, patient.email, patient.password, patient.account, patient.birth);
    }

    function getAllPatients() public view returns (Patient[] memory) {
        return patientList;
    }

     function deletePatient(string memory _email) public {
        require(bytes(_email).length > 0, "Email is required");

        // Verify that the patient with the given email exists
        require(bytes(patients[_email].email).length > 0, "Patient with this email does not exist");

        delete patients[_email];

        // Remove the patient from the patientList array
        for (uint256 i = 0; i < patientList.length; i++) {
            if (keccak256(bytes(patientList[i].email)) == keccak256(bytes(_email))) {
                if (i != patientList.length - 1) {
                    // Move the last element to the deleted position
                    patientList[i] = patientList[patientList.length - 1];
                }
                patientList.pop();
                break;
            }
        }
    }

}