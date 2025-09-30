#  Mini Dashboard IoT Météo

Un tableau de bord IoT moderne et futuriste affichant des données météo en temps réel de n'importe quelle ville du monde.

![Dashboard IoT](https://img.shields.io/badge/Status-Fonctionnel-brightgreen) ![Node.js](https://img.shields.io/badge/Node.js-18+-green) ![License](https://img.shields.io/badge/License-MIT-blue)

##  Fonctionnalités

-  **Température en temps réel** - Données météo réelles via Open-Meteo API
-  **Humidité actuelle** - Mesures précises pour chaque ville
-  **Support mondial** - Plus de 200 000 villes disponibles
-  **Interface futuriste** - Design glassmorphism avec effets néon
-  **Mise à jour automatique** - Rafraîchissement toutes les 1,5 secondes
-  **Recherche intelligente** - Géocodage automatique des noms de villes

##  Installation

1. **Cloner le projet**
```bash
git clone https://github.com/[TON-USERNAME]/mini-iot-js.git
cd mini-iot-js
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur**
```bash
npm start
```

4. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

##  Utilisation

1. **Voir Paris par défaut** - Le dashboard s'ouvre avec la météo de Paris
2. **Changer de ville** - Tapez le nom d'une ville dans le champ de recherche
3. **Valider** - Cliquez sur "🌍 Changer de ville" ou appuyez sur Entrée
4. **Observer** - Les données se mettent à jour automatiquement

### Exemples de villes à tester :
- **France** : Lyon, Marseille, Bordeaux, Nice
- **Europe** : Londres, Berlin, Rome, Madrid
- **Monde** : Tokyo, New York, Sydney, Rio de Janeiro

##  Technologies utilisées

- **Backend** : Node.js + Express.js
- **Frontend** : HTML5, CSS3 (Glassmorphism), JavaScript ES6+
- **API** : Open-Meteo (météo gratuite et sans clé)
- **Géocodage** : Open-Meteo Geocoding API

##  Structure du projet

```
mini-iot-js/
├── public/
│   ├── index.html    # Interface utilisateur
│   ├── style.css     # Styles futuristes
│   └── app.js        # Logique frontend
├── src/
│   └── server.js     # Serveur Express + API
├── package.json      # Dépendances npm
└── README.md         # Documentation
```

##  API Endpoints

- `GET /api/capteurs?lat=X&lon=Y&ville=Z` - Récupère les données météo
- `GET /api/recherche-ville/:nom` - Géocode un nom de ville

##  Captures d'écran

*Interface futuriste avec glassmorphism et effets néon*

##  Licence

MIT License - Libre d'utilisation

##  Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Ouvrir des issues
- Proposer des améliorations
- Soumettre des pull requests

##  Contact

Créé avec  pour l'apprentissage de l'IoT et des APIs météo.