import React, { useEffect } from "react";
import Quagga from "quagga";

import './verifier.css';


function QRScanner() {
  useEffect(() => {
    // Configuration de QuaggaJS
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#scanner"),
        },
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "upc_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "2of5_reader",
            "code_93_reader",
          ],
        },
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        // Démarrage du scanner
        Quagga.start();
      }
    );

    // Détection d'un code QR
    Quagga.onDetected((result) => {
      const code = result.codeResult.code;
      alert(`Code QR détecté : ${code}`);
    });

    // Nettoyage du composant
    return () => {
      Quagga.stop();
    };
  }, []);

  return (
    <div id="scanner-container">
      <div id="scanner"></div>
      
    </div>
  );
}

export default QRScanner;
