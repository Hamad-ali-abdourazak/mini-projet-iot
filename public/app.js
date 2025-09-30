let villeActuelle = {
  nom: "Paris",
  latitude: 48.8566,
  longitude: 2.3522
};

// Initialiser avec Paris au démarrage
async function initialiserVilleParDefaut() {
  try {
    const donnees = await recupererDonneesCapteurs();
    if (donnees) {
      mettreAJourTableauBord(donnees);
    }
  } catch (error) {
    console.error('Erreur initialisation:', error);
  }
}

async function recupererDonneesCapteurs() {
  try {
    const url = `/api/capteurs?lat=${villeActuelle.latitude}&lon=${villeActuelle.longitude}&ville=${encodeURIComponent(villeActuelle.nom)}`;
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    return null;
  }
}

async function rechercherVille(nomVille) {
  try {
    const res = await fetch(`/api/recherche-ville/${encodeURIComponent(nomVille)}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la recherche de ville:', error);
    return { success: false, message: 'Erreur de connexion' };
  }
}

function mettreAJourTableauBord(donnees) {
  if (!donnees) return;
  
  document.getElementById('temperature').textContent = donnees.temperature + ' °C';
  document.getElementById('humidite').textContent = donnees.humidite + ' %';
  
  // Mise à jour des informations de localisation et heure
  document.getElementById('ville').textContent = donnees.ville || villeActuelle.nom;
  document.getElementById('heure').textContent = donnees.heure || new Date().toLocaleTimeString('fr-FR');
}

async function rafraichir() {
  const donnees = await recupererDonneesCapteurs();
  mettreAJourTableauBord(donnees);
}

async function changerVille() {
  const nomVille = document.getElementById('ville-input').value.trim();
  if (!nomVille) {
    alert('Veuillez entrer le nom d\'une ville');
    return;
  }
  
  try {
    // Afficher un indicateur de chargement
    document.getElementById('ville').textContent = '🔍 Recherche...';
    
    const resultat = await rechercherVille(nomVille);
    
    if (resultat && resultat.success) {
      villeActuelle = {
        nom: resultat.ville,
        latitude: resultat.latitude,
        longitude: resultat.longitude
      };
      
      // Effacer le champ de saisie
      document.getElementById('ville-input').value = '';
      
      // Rafraîchir immédiatement avec la nouvelle ville
      await rafraichir();
      
      console.log(`Météo mise à jour pour ${resultat.ville}, ${resultat.pays}`);
    } else {
      document.getElementById('ville').textContent = villeActuelle.nom;
      alert(`❌ Ville non trouvée. Veuillez vérifier l'orthographe.`);
    }
  } catch (error) {
    console.error('Erreur lors du changement de ville:', error);
    document.getElementById('ville').textContent = villeActuelle.nom;
    alert('❌ Erreur de connexion. Réessayez plus tard.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('refresh-btn').addEventListener('click', rafraichir);
  document.getElementById('ville-btn').addEventListener('click', changerVille);
  
  // Permettre de valider avec la touche Entrée
  document.getElementById('ville-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      changerVille();
    }
  });
  
  setInterval(rafraichir, 1500);
  initialiserVilleParDefaut();
});