//send File to IPFS
//And  get the Hash

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const apiKey = '1a2f7fd1efe226c390ec';
const apiSecret = 'ad1be9ec4972a6a3416162edf5e4ee95bfe99352ebab6c8d3c1fd082e6178d52';

// Function to send a JSON file to IPFS and retrieve the hash
async function sendJSONtoIPFS() {
  // Create a new FormData instance
  const formData = new FormData();

  // Read the JSON file
  const fileData = fs.readFileSync('./passeport.json');

  // Append the file data to the FormData object
  formData.append('file', fileData, 'passeport.json');

  try {
    // Make a POST request to Pinata API to upload the file
    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      maxContentLength: Infinity,
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        'pinata_api_key': apiKey,
        'pinata_secret_api_key': apiSecret,
      },
    });

    // Retrieve the hash from the response
    const hash = response.data.IpfsHash;
    console.log('File uploaded successfully. IPFS hash:', hash);
  } catch (error) {
    console.error('Error uploading file to IPFS:', error.response.data);
  }
}

// Call the function to send the JSON file
sendJSONtoIPFS();
