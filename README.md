# Application de gestion des passeports médicaux basée sur la blockchain et l'identité numérique auto-souveraine

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Instructions d'installation

1. Assurez-vous d'avoir Node.js et NPM installés sur votre machine.

2. Clonez ce dépôt Git sur votre machine locale.
  ``` git clone <lien_du_dépôt> ```


3. Accédez au répertoire du projet.

4. Installez les dépendances en exécutant la commande suivante :
  ``` npm install ```

5. Exécutez Ganache pour l'environnement de développement. Assurez-vous que Ganache est configuré pour écouter sur le port 7545.


6. Déployez le contrat sur Ganache et notez l'adresse du contrat ainsi que l'ABI générée.

7. Accédez au fichier JSON nommé `src/contract/contractRegistration.json` à la racine du projet avec les informations suivantes :

{
"address": "<adresse_du_contrat>",
"abi": <ABI_du_contrat>
}

Remplacez `<adresse_du_contrat>` par l'adresse réelle du contrat déployé sur Ganache et `<ABI_du_contrat>` par l'ABI générée.

** De méme pour les contracts "Admin.sol" et "Wait.sol" **

8. Vous pouvez maintenant exécuter l'application en utilisant la commande suivante :
  ``` npm start ```
L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).


## Authentification

Pour accéder en tant qu'administrateur, utilisez les identifiants suivants :

- Adresse e-mail : admin@gmail.com
- Mot de passe : admin
- adresse ethereum de l'Admin

Une fois connecté en tant qu'administrateur, vous pourrez approuver les médecins et les patients pour utiliser l'application.

Les médecins et les patients devront également s'authentifier avec leurs propres informations d'identification avant de pouvoir accéder à certaines fonctionnalités.

Les médecins peuvent remplir le passeport des patients et consulter les passeports remplis en utilisant le numéro de carte d'identité (CIN).
