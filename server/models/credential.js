const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database
const db = new sqlite3.Database('path/to/database.db');

// Define the schema and table
db.run(`
  CREATE TABLE IF NOT EXISTS credentials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    credentialSubject TEXT,
    issuer TEXT,
    type TEXT,
    context TEXT,
    issuanceDate TEXT,
    proofType TEXT,
    proofJwt TEXT
  )
`);

// Create the model
const Credential = {
  insert: (credential, callback) => {
    const query = `
      INSERT INTO credentials (
        credentialSubject, issuer, type, context, issuanceDate, proofType, proofJwt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      credential.credentialSubject,
      credential.issuer,
      credential.type,
      credential.context,
      credential.issuanceDate,
      credential.proof.type,
      credential.proof.jwt
    ];
    db.run(query, values, function (error) {
      if (error) {
        callback(error);
      } else {
        callback(null, this.lastID);
      }
    });
  },
  findAll: (callback) => {
    const query = 'SELECT * FROM credentials';
    db.all(query, callback);
  }
};

// Export the model
module.exports = Credential;
