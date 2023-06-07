// SPDX-License-Identifier: MIT


pragma solidity ^0.8.0;


contract Registration {
    struct Doctor {
        string firstName;
        string lastName;
        string cin;
        string email;
        string password;
        address account;
        string did;
        string code;

    }

    mapping(string => Doctor) private doctors;
    Doctor[] private doctorList;
    mapping(string => string) private didMapping; // CIN => DID mapping for doctors

    function registerDoctor(string memory _firstName, string memory _lastName, string memory _cin, string memory _email, string memory _password, address _account, string memory _code) public {
        require(bytes(_firstName).length > 0, "First name is required");
        require(bytes(_cin).length > 0, "CIN is required");
        require(bytes(_email).length > 0, "Email is required");
        require(bytes(_password).length > 0, "Password is required");
        

        // Verify that the email has not already been registered
        require(bytes(doctors[_email].email).length == 0, "Doctor with this email already exists");
        // Verify that the email has not already been registered
        require(bytes(doctors[_email].cin).length == 0, "Doctor with this cin already exists");
       
        string memory did = string(abi.encodePacked("did:ethr:", addressToString(_account)));

        doctors[_email] = Doctor(_firstName, _lastName, _cin, _email, _password, _account, did, _code);
        doctorList.push(doctors[_email]);

        didMapping[_cin] = did;
    }

    function getDoctor(string memory _email) public view returns (string memory, string memory, string memory, string memory, string memory, address, string memory, string memory) {
        require(bytes(_email).length > 0, "Email is required");

        Doctor memory doctor = doctors[_email];
        /* require(bytes(doctor.email).length > 0, "Doctor with this email does not exist"); */

        return (doctor.firstName, doctor.lastName, doctor.cin, doctor.email, doctor.password, doctor.account, doctor.did, doctor.code);
    }

   
    function getAllDoctors() public view returns (Doctor[] memory) {
        return doctorList;
    }

      
   
    function deleteDoctor(string memory _email) public {
        require(bytes(_email).length > 0, "Email is required");

        // Verify that the doctor with the given email exists
        require(bytes(doctors[_email].email).length > 0, "Doctor with this email does not exist");

        string memory cin = doctors[_email].cin;
        delete doctors[_email];
        delete didMapping[cin];

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


    function getDoctorDidFromAccount(address _account) public view returns (string memory) {
    require(_account != address(0), "Invalid account address");

    for (uint256 i = 0; i < doctorList.length; i++) {
        if (doctorList[i].account == _account) {
            return doctorList[i].did;
        }
    }

    revert("Doctor with this account does not exist");
    }


    function getDoctorCinFromAccount(address _account) public view returns (string memory) {
        require(_account != address(0), "Invalid account address");

        for (uint256 i = 0; i < doctorList.length; i++) {
            if (doctorList[i].account == _account) {
                return doctorList[i].cin;
            }
        }

        revert("Doctor with this account does not exist");
    }


     //For Doctor
    function getDidByCin(string memory _cin) public view returns (string memory) {
        return didMapping[_cin];
    }

    function modifyDoctorPassword(string memory _email, string memory _newPassword) public {
        require(bytes(_email).length > 0, "Email is required");
        require(bytes(_newPassword).length > 0, "New password is required");

        // Verify that the doctor with the given email exists
        require(bytes(doctors[_email].email).length > 0, "Doctor with this email does not exist");

        doctors[_email].password = _newPassword;
    }




    /*Patient*/
    struct Patient {
        string firstName;
        string lastName;
        string cin;
        string email;
        string password;
        address account;
        string did;
        string birth;
    }

    mapping(string => Patient) private patients;
    Patient[] private patientList;
    mapping(string => string) private patientDidMapping; // CIN => DID mapping for patients
    mapping(string => Credential[]) private patientCredentials; // CIN => Credentials mapping for patients

    struct Credential {
        string issuerCIN;
        string credentialHash;
    }

    function registerPatient(
    string memory _firstName,
    string memory _lastName,
    string memory _cin,
    string memory _email,
    string memory _password,
    address _account,
    string memory _birth
) public {
    require(bytes(_firstName).length > 0, "First name is required");
    require(bytes(_lastName).length > 0, "Last name is required");
    require(bytes(_cin).length > 0, "CIN is required");
    require(bytes(_email).length > 0, "Email is required");
    require(bytes(_password).length > 0, "Password is required");
    require(bytes(_birth).length > 0, "Birth is required");

    // Verify that the email has not already been registered
    require(bytes(patients[_email].email).length == 0, "Patient with this email already exists");
    // Verify that the CIN has not already been registered
    require(bytes(patients[_cin].cin).length == 0, "Patient with this CIN already exists");

    string memory did = string(abi.encodePacked("did:ethr:", addressToString(_account)));

    patients[_cin] = Patient({
        firstName: _firstName,
        lastName: _lastName,
        cin: _cin,
        email: _email,
        password: _password,
        account: _account,
        did: did,
        birth: _birth
    });

    patientList.push(patients[_cin]);

    patientDidMapping[_cin] = did;
}


    function getPatient(string memory _email) public view returns (string memory, string memory, string memory, string memory, string memory, address, string memory, string memory) {
        require(bytes(_email).length > 0, "Email is required");

        Patient memory patient = patients[_email];
        /* require(bytes(patient.email).length > 0, "Patient with this email does not exist"); */

        return (patient.firstName, patient.lastName, patient.cin, patient.email, patient.password, patient.account, patient.did, patient.birth);
    }

    function getAllPatients() public view returns (Patient[] memory) {
        return patientList;
    }

    function deletePatient(string memory _email) public {
        require(bytes(_email).length > 0, "Email is required");

        // Verify that the patient with the given email exists
        require(bytes(patients[_email].email).length > 0, "Patient with this email does not exist");

        string memory cin = patients[_email].cin;
        delete patients[_email];
        delete patientDidMapping[cin];
        delete patientCredentials[cin];

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

    function addPatientCredential(string memory _patientCIN, string memory _issuerCIN, string memory _credentialHash) public {
        require(bytes(_patientCIN).length > 0, "Patient CIN is required");
        require(bytes(_issuerCIN).length > 0, "Issuer CIN is required");
        require(bytes(_credentialHash).length > 0, "Credential data is required");

        Credential memory credential = Credential(_issuerCIN, _credentialHash);
        patientCredentials[_patientCIN].push(credential);
    }
    

    function getPatientCredentials(string memory _patientCIN) public view returns (Credential[] memory) {
        return patientCredentials[_patientCIN];
    }


    function addressToString(address _address) internal pure returns (string memory) {
        bytes32 value = bytes32(uint256(uint160(_address)));
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(42);

        str[0] = "0";
        str[1] = "x";

        for (uint256 i = 0; i < 20; i++) {
            str[2 + i * 2] = alphabet[uint8(value[i + 12] >> 4)];
            str[3 + i * 2] = alphabet[uint8(value[i + 12] & 0x0f)];
        }

        return string(str);
    }

    function getPatientDidByCIN(string memory _cin) public view returns (string memory) {
    
    return patientDidMapping[_cin];
    }

    function getPatientByCIN(string memory _cin) public view returns (Patient memory) {

    return patients[_cin];
}

   function storeCredentialHashAndDoctorCIN(string memory patientCIN, string memory credentialHash, string memory doctorCIN) public returns (string memory){
    require(bytes(patientCIN).length > 0, "Patient CIN is required");
    require(bytes(credentialHash).length > 0, "Credential hash is required");
    require(bytes(doctorCIN).length > 0, "Doctor CIN is required");

    // Verify that the patient with the given CIN exists
    require(bytes(patientDidMapping[patientCIN]).length > 0, "Patient with this CIN does not exist");

    // Store the credential hash and doctor CIN
    Credential memory newCredential = Credential(doctorCIN, credentialHash);
    patientCredentials[patientCIN].push(newCredential);

    // Add a return statement if needed
     return "Credential stored successfully";
  }


    function getPatientCinFromAccount(address _account) public view returns (string memory) {
        require(_account != address(0), "Invalid account address");

        for (uint256 i = 0; i < patientList.length; i++) {
            if (patientList[i].account == _account) {
                return patientList[i].cin;
            }
        }
    }    


    function modifyPatientPassword(string memory _email, string memory _newPassword) public {
        require(bytes(_email).length > 0, "Email is required");
        require(bytes(_newPassword).length > 0, "New password is required");

        // Verify that the patient with the given email exists
        require(bytes(patients[_email].email).length > 0, "Patient with this email does not exist");

        patients[_email].password = _newPassword;
    }
 
}
