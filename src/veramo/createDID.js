import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./createCSS.css";
import  agent from "./setup";






const CreateIdentifierButton = ({ web3, address, onIdentifierCreated }) => {
  const [showCreateIdentifierForm, setShowCreateIdentifierForm] =
    useState(false);
  const [alias, setAlias] = useState("");
  const [identifierProvider, setIdentifierProvider] = useState("metamask");
  const [showIdentifiersList, setShowIdentifiersList] = useState(false);
  const [identifiers, setIdentifiers] = useState([]);
  const [identifiersList, setListIdentifiers] = useState([]);

 

  const handleCreateIdentifier = async () => {
    //Veramo Methods
    // const _id = await agent.didManagerCreate();
    //end Veramo Methods

   //const identity = 'did:ethr:goerli:0x19f37ba99748dddf1047239348309e1557569adb';


    const identifier = {
      did: 'did:ethr:goerli:0x19f37ba99748dddf1047239348309e1557569adb',
      provider: 'did:ethr:goerli',
      controllerKeyId: '0x19f37ba99748dddf1047239348309e1557569adb',
      keys: [
        {
          kid: '0x19f37ba99748dddf1047239348309e1557569adb',
          kms: 'local',
          type: 'Secp256k1',
          publicKeyHex: '0x19F37bA99748DdDf1047239348309e1557569adB',
          privateKeyHex: '143fd2008d3b27482ffb1a9eb63725da5a9bce2f0142fc6368ee8f12fab35652',
        },
      ],
      services: [],
    };

    
    const context = agent;

    const identity = await agent.didManagerImport(identifier, context);



    const verifiableCredential = await agent.createVerifiableCredential({
    credential: {
      "credentialSubject": {
        "you": "Rock",
        "id": "did:web:example.com",
        "vaccineName": "COVID-19 Vaccine",
        "vaccineDate": "2023-05-15",
        "vaccineLocation": "City Medical Center"
      },
      "issuer": {
        "id": identity.did
      },
      "type": ["VerifiableCredential"],
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      "issuanceDate": "2022-10-28T11:54:22.000Z"
    },
    proofFormat:'jwt',
    
  }); 
  console.log(`New credential created`);
  console.log(JSON.stringify(verifiableCredential, null, 2));


  
    
  const result = await agent.verifyCredential({ credential: 'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InlvdSI6IlJvY2siLCJ2YWNjaW5lTmFtZSI6IkNPVklELTE5IFZhY2NpbmUiLCJ2YWNjaW5lRGF0ZSI6IjIwMjMtMDUtMTUiLCJ2YWNjaW5lTG9jYXRpb24iOiJDaXR5IE1lZGljYWwgQ2VudGVyIn19LCJzdWIiOiJkaWQ6d2ViOmV4YW1wbGUuY29tIiwibmJmIjoxNjY2OTU4MDYyLCJpc3MiOiJkaWQ6ZXRocjpnb2VybGk6MHgxOWYzN2JhOTk3NDhkZGRmMTA0NzIzOTM0ODMwOWUxNTU3NTY5YWRiIn0.D9xh0JM9EFOv7g25Nph3Sa8w9fPaoNnl8hEjHwqzCLPsNaP1aobl2NRYScZWwAbeW_9P_uMV4EqycdKf56f-uQ' }); 
  console.log(`Credential verified`, result.verified)


  /* const identifier1 = await agent.didManagerCreate({ kms: 'local' }) */



/*
  //it('should save an SDR message')
  const JWT = await agent.createSelectiveDisclosureRequest({
    data: {
      issuer: identifier1.did,
      tag: 'sdr-one',
      claims: [
        {
          reason: 'We need it',
          claimType: 'name',
          essential: true,
        },
      ],
    },
  })

  const originalRequestSender='' ;

  const message = await agent.handleMessage({
    raw: JWT,
    save: true,
  })
  if (message.from) {
    originalRequestSender = message.from
  }


  const messages = await agent.dataStoreORMGetMessages()

 

  const identifiers = await agent.didManagerFind()
  const identifier0 = identifiers[0]
  

  const verifiableCredential = await agent.createVerifiableCredential({
    credential: {
      issuer: { id: identifier1.did },
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential'],
      issuanceDate: new Date().toISOString(),
      credentialSubject: {
        id: 'did:web:uport.me',
        name: 'Carrot',
      },
    },
    proofFormat: 'jwt',
    save: true,
  })


  const credentials = await agent.getVerifiableCredentialsForSdr({
    sdr: {
      claims: [
        {
          claimType: 'name',
          issuers: [],
        },
      ],
    }})



  const verifiablePresentation = await agent.createVerifiablePresentation({
    presentation: {
      verifier: [originalRequestSender],
      holder: identifier.did,
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiablePresentation'],
      issuanceDate: new Date().toISOString(),
      verifiableCredential: credentials[0].credentials.map((c) => c.verifiableCredential),
    },
    proofFormat: 'jwt',
    save: true,
  })




  const validated = await agent.validatePresentationAgainstSdr({
    presentation: verifiablePresentation,
    sdr: {
      issuer: '',
      claims: [
        {
          claimType: 'name',
        },
      ],
    },
  })

      

*/

    let dataItem = {
      alias: alias,
      did: identity.did ,
      provider: identifierProvider,
    };
    let dataSources = [...identifiers, dataItem];
    setIdentifiers(dataSources);
    setShowCreateIdentifierForm(false);


    
    const extractSignature = (verifiableCredential) => {
      if (verifiableCredential.proof && verifiableCredential.proof.signatureValue) {
        const signature = verifiableCredential.proof.signatureValue;
        console.log('Signature numérique:', signature);
      } else {
        console.log('Le Verifiable Credential ne contient pas de preuve de signature.');
      }
    };
  
    

   
  
  // Exemple de Verifiable Credential
  const exampleCredential = {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    id: 'https://example.com/credentials/123',
    type: ['VerifiableCredential'],
    issuer: 'did:example:123',
    issuanceDate: '2023-05-26T14:18:09.000Z',
    credentialSubject: {
      id: 'did:example:456',
      name: 'John Doe',
    },
    proof: {
      type: 'Ed25519Signature2018',
      created: '2023-05-26T14:18:09Z',
      verificationMethod: 'did:example:123#key1',
      signatureValue: '...',
    },
  };

  

  





  
  // Appel de la fonction pour extraire la signature
  extractSignature(exampleCredential);
  
  };
  const handleListIdentifiers = async () => {
    //Veramo Methods
    let _identifiers = await agent.didManagerFind();
    //end Veramo Methods

    // _identifiers.map((el) => el.username: )
    setListIdentifiers(_identifiers);
  };



  


  return (
    <>
      {!address ? (
        <button
          className="boutonDID"
          onClick={() =>
            window.ethereum.request({ method: "eth_requestAccounts" })
          }
        >
          Connect to MetaMask
        </button>
      ) : (
        <div className="Connected  Address">
          <div>Connected Address: {address}</div>
        </div>
      )}
      <div className="create-identifier-buttons">
        <button
          className="boutonDID"
          disabled={!address || showCreateIdentifierForm}
          onClick={() => setShowCreateIdentifierForm(true)}
        >
          Create Identifier
        </button>
        <button className="boutonDID" onClick={handleListIdentifiers}>
          List Identifiers
        </button>
      </div>
      {showCreateIdentifierForm && (
        <div className="create-identifier-popup">
          <h2>Create Identifier</h2>
          <label>
            Alias:
            <input
              type="text"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
            />
          </label>
          <label>
            Identifier Provider:
            <div>
              <label>
                Identifier Provider:
                <select
                  value={identifierProvider}
                  onChange={(e) => setIdentifierProvider(e.target.value)}
                >
                  <option value="metamask">MetaMask</option>
                  <option value="ganache">Ganache</option>
                  <option value="web3">Web3 Provider</option>
                </select>
              </label>
            </div>
          </label>
          <button
            className="boutonDID"
            onClick={() => setShowCreateIdentifierForm(false)}
          >
            Cancel
          </button>
          <button className="boutonDID" onClick={handleCreateIdentifier}>
            Create
          </button>
  
        </div>
      )}
      <div
        className="container mt-4"
        style={{ background: "#fff", boxShadow: "none" }}
      >
        <div className="row" style={{ width: "100%" }}>
          {identifiers.map((item, index) => (
            <div className="col" key={index}>
              <div
                className="card w-100"
                style={{ height: "auto", overflow: "hidden" }}
              >
                <div className="card-body w-100">
                  <ul style={{ textAlign: "left" }}>
                    <li>
                      <strong>Id:</strong> {item.did}
                    </li>
                    <li>
                      <strong>Alias:</strong> {item.alias}
                    </li>
                    <li>
                      <strong>Provider:</strong> {item.provider}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </>
  );

};

const CreateDID = () => {
  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const connectToWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          setWeb3(web3Instance);
          setAddress(await web3Instance.eth.getCoinbase());
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error("MetaMask not detected");
      }
    };
    connectToWeb3();
  }, []);
  return (
    <div>
      <CreateIdentifierButton web3={web3} address={address} />
      {/* <ListIdentifies /> */}
    </div>
  );
};

export default CreateDID;
