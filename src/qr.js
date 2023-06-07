import React, { useState } from 'react';
import QrReader from 'qrcode.react';

function QRVerifier() {
  const [qrData, setQrData] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setQrData(data);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const verifyData = () => {
    // Here you would implement your verification logic based on the data in the QR code
    // For example, you could make an API call to check if the data is valid
    console.log(`Verifying data: ${qrData}`);
  };

  return (
    <div className="qr-verifier">
      <QrReader
        className="qr-scanner"
        delay={300}
        onError={handleError}
        onScan={handleScan}
      />
      {qrData && (
        <div className="qr-result">
          <p className="qr-data">Scanned data: {qrData}</p>
          <button className="verify-btn" onClick={verifyData}>Verify</button>
        </div>
      )}
    </div>
  );
}

export default QRVerifier;