import React,{useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from 'web3';
import '../admin/NavigationBar-admin.css';
import '../admin/tableauDoctor';
import '../admin/tableauPatient';

function NavigationBar() {
  const [isConnected, setIsConnected] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [accountAddress, setAccountAddress] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  

  useEffect(() => {
    // Vérifiez si MetaMask est installé et disponible
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      // Vérifiez si l'utilisateur est déjà connecté à MetaMask
      web3Instance.eth.getAccounts().then(accounts => {
        if (accounts.length > 0) {
          setIsConnected(true);
          setAccountAddress(accounts[0]);// Set the connected account address
        }

       
      });

      // Écoutez l'événement de déconnexion de MetaMask
      window.ethereum.on('accountsChanged', handleAccountsChanged);

       // Check if the user has a preferred color scheme
       const preferredColorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
       setDarkMode(preferredColorScheme);
    }
  }, []);

  const handleConnectMetamask = async () => {
    try {
      // Demandez à l'utilisateur de se connecter à MetaMask
      await window.ethereum.enable();

      // Vérifiez si l'utilisateur est connecté
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setIsConnected(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnectMetamask = () => {
    setIsConnected(false);
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  };


  const handleExit = () => {
    window.location.href = '/';
  };


  const handleToggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

     

      
      
  return (
   
    <nav className="navAdmin">
      <div className="logo">
        Patient {isConnected && <span className="address"> : {accountAddress}</span>}
      </div>
      
      <div className="buttons">
        <button onClick={isConnected ? handleDisconnectMetamask : handleConnectMetamask}>
          {isConnected ? 'Connected To Metamask' : 'Connect To Metamask'}
        </button>
        <button onClick={handleExit} >Exit</button>
       {/*} <button onClick={handleToggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
           </button>*/}
      </div>
      
    </nav>
    
  );

}

export default NavigationBar;