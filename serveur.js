require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const enregistrement = require('./enregistrement'); // Importez le module d'enregistrement

const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuration de la clé d'API de ChatGPT
 const chatGptApiKey = process.env.CHATGPT_API_KEY;
; // Assurez-vous de stocker la clé dans une variable d'environnement

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', async (req, res) => {
    try {
        const { nom, prenom, email, recherche } = req.body;

        // Enregistrement des données dans un fichier JSON
        const data = { nom, prenom, email, recherche };
        enregistrement.enregistrerDonnees(data);

        // Communication avec l'API de ChatGPT
        const chatGptResponse = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
            input: recherche,
        }, {
            headers: {
                Authorization: `Bearer ${chatGptApiKey}`,
            },
        });

        // Enregistrement de la réponse dans un fichier JSON
        const chatGptData = chatGptResponse.data;
        enregistrement.enregistrerChatGptResponse(chatGptData);

        // Rediriger vers une page de confirmation ou une autre page après la soumission
        res.redirect('/confirmation.html');
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Erreur serveur' });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

