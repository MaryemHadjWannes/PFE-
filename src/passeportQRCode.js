import React from 'react';
import QRCode from 'qrcode.react';

const PassportQRCode = () => {
  const passportData = {
    name: 'Maryem',
    vaccineName: 'Covid',
    vaccineDate: '2022-15-8',
    vaccineLocation: 'Monastir',
    issuanceDate: '2023-05-26T14:18:09.000Z',
  };

  // Concatenate the passport data into a single string
  const passportString = Object.values(passportData).join('\n');

  return (
    <div>
      <QRCode value={passportString} />
    </div>
  );
};

export default PassportQRCode;
