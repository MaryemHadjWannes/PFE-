// SPDX-License-Identifier: MIT


pragma solidity ^0.8.0;

contract Admin {

struct Admin {
      string email;
      string passwordHash; 
      address account; 
    }

    mapping(string => Admin) private admins;

    function getAdminByEmail(string memory _email) public view returns (string memory, string memory) {
        require(bytes(_email).length > 0, "Email is required");

        Admin memory admin = admins[_email];
        require(bytes(admin.email).length > 0, "Admin with this email does not exist");

        return (admin.email, admin.passwordHash);
    }

     constructor() {
        string memory adminEmail = "admin@gmail.com";
        string memory adminPassword = "fb001dfcffd1c899f3297871406242f097aecf1a5342ccf3ebcd116146188e4b" ;// Add the SHA3 hash of the password "admin" here
        address adminAccount=0x9be406014C1ED312503A3865213d78e12E85BeC0;

        admins[adminEmail] = Admin(adminEmail, adminPassword,adminAccount);
    }

    function changeAdminPassword(string memory _email, string memory _newPasswordHash) public {
        require(bytes(_email).length > 0, "Email is required");
        require(bytes(_newPasswordHash).length > 0, "New password hash is required");

        // Verify that the admin with the given email exists
        require(bytes(admins[_email].email).length > 0, "Admin with this email does not exist");

        admins[_email].passwordHash = _newPasswordHash;
    }

}  