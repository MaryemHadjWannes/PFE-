import React from 'react';
import agent from './setup.js';


const CreateCredentialButton = () => {
  const handleClick = async () => {
    try {
      const identifier = await agent.didManagerGetByAlias({ alias: 'default' })

      const verifiableCredential = await agent.createVerifiableCredential({
        credential: {
          issuer: { id: identifier },
          credentialSubject: {
            id: 'did:web:example.com',
            you: 'Rock',
          },
        },
        proofFormat: 'jwt',
      });
      console.log(`New credential created`);
      console.log(JSON.stringify(verifiableCredential, null, 2));

      // You can store the verifiableCredential in the component's state
      // and display it in the component
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={handleClick}>Create Credential</button>
  );
};

export default CreateCredentialButton;

