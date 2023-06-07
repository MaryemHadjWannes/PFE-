const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Définir les routes de votre application

// Redirection pour bloquer l'accès direct à /path
app.get('/path', (req, res) => {
  res.redirect('/');
});

// Définir d'autres routes...

// Gérer la redirection pour toutes les autres routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
