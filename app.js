const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, 'public')));

// 01 - Affichage de la page index.html
app.get('/', (req, res) => {
    // ToDo
});

// 02 - Authentification d'un utilisateur
app.post('/login', (req, res) => {
    // ToDo
});

// 03 - Inscription d'un utilisateur
app.post('/register', (req, res) => {
    // ToDo
});

// 04 - Abonnement de l'utilisateur
app.put('/subscription', (req, res) => {
    // ToDo
    // Note: token needed
});

// 05 - Modification de l'utilisateur
app.put('/user', (req, res) => {
    // ToDo
    // Note: token needed
});

// 06 - Deconnection de l'utilisateur
app.delete('/user/off', (req, res) => {
    // ToDo
    // Note: token needed
});

// 07 - Ajout de carte bancaire
app.put('/user/cart', (req, res) => {
    // ToDo
    // Note: token needed
});

// 08 - Suppression de compte
app.delete('/user', (req, res) => {
    // ToDo
    // Note: token needed
});

// 09 - Listing des sources audios
app.get('/songs', (req, res) => {
    // ToDo
    // Note: token needed
    // Number 5
});

// 10 - Recuperation d'une source audio
app.get('/songs/{id}', (req, res) => {
    // ToDo
    // Note: token needed
    // Flux audio -stream
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})