const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public'));

// API de géocodage pour convertir nom de ville en coordonnées
async function obtenirCoordonnees(ville) {
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(ville)}&count=1&language=fr&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      return {
        latitude: result.latitude,
        longitude: result.longitude,
        nom: result.name,
        pays: result.country
      };
    }
    return null;
  } catch (error) {
    console.error('Erreur géocodage:', error);
    return null;
  }
}

// Récupération de vraies données météo via Open-Meteo API
async function obtenirDonneesCapteurs(latitude, longitude, nomVille) {
  try {
    // API Open-Meteo - données météo réelles et gratuites
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m&timezone=auto`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    const meteo = data.current_weather;
    const humidite = data.hourly.relativehumidity_2m[0]; // Première valeur d'humidité
    
    return {
      temperature: meteo.temperature.toFixed(1),
      humidite: humidite.toFixed(1),
      ville: nomVille,
      heure: new Date().toLocaleTimeString('fr-FR')
    };
    
  } catch (error) {
    console.error('Erreur API météo:', error);
    // Fallback vers données simulées en cas d'erreur
    return {
      temperature: (20 + Math.random() * 10).toFixed(1),
      humidite: (40 + Math.random() * 20).toFixed(1),
      ville: nomVille + " (simulé)",
      heure: new Date().toLocaleTimeString('fr-FR')
    };
  }
}

// Route pour rechercher une ville
app.get('/api/recherche-ville/:nom', async (req, res) => {
  const nomVille = req.params.nom;
  const coordonnees = await obtenirCoordonnees(nomVille);
  
  if (coordonnees) {
    res.json({
      success: true,
      ville: coordonnees.nom,
      pays: coordonnees.pays,
      latitude: coordonnees.latitude,
      longitude: coordonnees.longitude
    });
  } else {
    res.json({
      success: false,
      message: 'Ville non trouvée'
    });
  }
});

app.get('/api/capteurs', async (req, res) => {
  const latitude = parseFloat(req.query.lat);
  const longitude = parseFloat(req.query.lon);
  const ville = req.query.ville;
  
  // Vérifier que tous les paramètres sont présents
  if (!latitude || !longitude || !ville) {
    return res.status(400).json({
      error: 'Paramètres manquants (lat, lon, ville requis)'
    });
  }
  
  const donnees = await obtenirDonneesCapteurs(latitude, longitude, ville);
  res.json(donnees);
});

app.listen(PORT, () => {
  console.log(`Serveur IoT en cours d'exécution sur http://localhost:${PORT}`);
});
