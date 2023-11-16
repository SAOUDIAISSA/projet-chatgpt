const fs = require('fs');

const enregistrerDonnees = (data) => {
    // Charge les données existantes depuis le fichier JSON (si le fichier existe)
    let donneesExistantes = [];
    try {
        donneesExistantes = JSON.parse(fs.readFileSync('donnees.json'));
    } catch (error) {
        // Si le fichier n'existe pas ou est vide, aucune donnée n'est chargée
    }

    // Ajoute les nouvelles données à la liste
    donneesExistantes.push(data);

    // Enregistre la liste mise à jour dans le fichier JSON
    fs.writeFileSync('donnees.json', JSON.stringify(donneesExistantes, null, 2));
};

module.exports = {
    enregistrerDonnees,
};
