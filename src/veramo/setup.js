import { createAgent } from "@veramo/core";

import { DIDResolverPlugin } from "@veramo/did-resolver";

// Ethr did identity provider
import { EthrDIDProvider } from "@veramo/did-provider-ethr";

// Web did identity provider
import { WebDIDProvider } from "@veramo/did-provider-web";


// Core identity manager plugin
import { DIDManager, MemoryDIDStore } from "@veramo/did-manager";


 
import { ISelectiveDisclosure, SdrMessageHandler, SelectiveDisclosure } from '@veramo/selective-disclosure'

// Core key manager plugin
import {
  KeyManager,
  MemoryKeyStore,
  MemoryPrivateKeyStore,
} from "@veramo/key-manager";

// Custom key management system for RN
import { KeyManagementSystem } from "@veramo/kms-local";

import { getResolver as ethrDidResolver } from "ethr-did-resolver";
import { getResolver as webDidResolver } from "web-did-resolver";


// W3C Verifiable Credential plugin
import { CredentialPlugin } from '@veramo/credential-w3c'
import { Resolver } from "did-resolver";





const INFURA_PROJECT_ID = "3586660d179141e3801c3895de1c2eba";
// This will be the secret key for the KMS
const KMS_SECRET_KEY =
  "11b574d316903ced6cc3f4787bbcc3047d9c72d1da4d83e36fe714ef785d10c1";

  const resolver = new Resolver({
    ...ethrDidResolver({ infuraProjectId: INFURA_PROJECT_ID }),
    ...webDidResolver(),
  });
  
  
// This will be the name for the local sqlite database for demo purposes
const agent = createAgent({
  plugins: [
    new KeyManager({
      store: new MemoryKeyStore(),
      kms: {
        local: new KeyManagementSystem(new MemoryPrivateKeyStore()),
        
      },
    }),
    new DIDResolverPlugin({resolver}),
    
    new DIDManager({
      store: new MemoryDIDStore(),
      defaultProvider: "did:ethr:goerli",
      providers: {
        "did:ethr:goerli": new EthrDIDProvider({
          defaultKms: "local",
          network: "goerli",
          rpcUrl: "https://goerli.infura.io/v3/" + INFURA_PROJECT_ID,
        }),
        "did:web": new WebDIDProvider({
          defaultKms: "local",
        }),


      },
    }),
    new CredentialPlugin(),
    new SelectiveDisclosure(),
    
    
   
  ],
});

export default agent;
