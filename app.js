const express = require('express');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const path = require('path');
const Joi = require('joi');

require('dotenv').config();

const { sequelize, User, Song } = require('./models');

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, 'public')));

const EMAIL_RE = '/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/';
const NAME_RE = '/\w+/';

const schema = Joi.object({
    firstname: Joi.string().min(3).required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    sexe: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    date_naissance: Joi.date().required()
});

app.use(passport.initialize());

passport.use(new BearerStrategy(
    function(token, done) {
        let user;

        User.findOne({
            where: {
                token: token
            }
        }).then(u => user = u);

        if (!user) { return done(null, false); }
        
        return done(null, user);
    }
));

// 01 - Affichage de la page index.html
app.get('/', (req, res) => {});

// 02 - Authentification d'un utilisateur
app.post('/login', async (req, res) => {
    try {
        let trying = 1;

        const { email, password } = req.body;

        if (trying >= 5) {
            res.status(412).json({ 
                error: true, 
                message: `Trop de tentative sur l'email ${email} (5 max) - Veuillez patienter (1min)` 
            });
        }
        
        if (email == null || password == null) {
            trying++;
            res.status(412).json({ 
                error: true, 
                message: "Email/password manquants" 
            });
        }

        const registeredUser = await User.findOne({
            where: {
                email: email,
                password: password
            }
        })

        if (!registeredUser || schema.validate({ password: password })) {
            trying++;
            res.status(412).json({ 
                error: true, 
                message: "Email/password incorrect" 
            });
        }

        res.status(200).json({ 
            error: false, 
            message: "L'utilisateur a été authentiﬁé succès",
            // user: {
            //     ﬁrstname: "xxxxxx",
            //     lastname: "xxxxxx",
            //     email: "xxxxxx",
            //     sexe: "xxxxxx",
            //     dateNaissance: "xxxx-xx-xx",
            //     createdAt: "xxxxxx",
            //     updateAt: "xxxxxx"
            // },
            user: registeredUser,
            access_token: "xxxxxx",
            refresh_token: "xxxxx"
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: true,
            message: "Service inaccessible, veuillez reessailler plutard"
        });
    }
});

// 03 - Inscription d'un utilisateur
app.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, email, sexe, password, date_naissance } = req.body;
    
        if (firstname === null || lastname === null || email === null || password === null || date_naissance === null) {
            res.status(400).json({
                error: true,
                message: "Une ou plusieurs données obligatoires sont manquantes"
            });
        }
    
        if (schema.validate({ firstname: firstname, lastname: lastname, email: email, sexe: sexe, password: password, date_naissance: date_naissance })) {
            res.status(409).json({
                error: true,
                message: "Une ou plusieurs données sont erronées"
            });
        }
    
        const registeredUser = await User.findOne({
            where: {
                email: email
            }
        });
    
        if (registeredUser) {
            res.status(409).json({
                error: true,
                message: "Un compte utilisant cette adresse email est déjà enregistré"
            });
        }
    
        const createdUser = await User.create({ 
            firstname: firstname, 
            lastname: lastname, 
            email: email, 
            sexe: sexe, 
            password: password, 
            date_naissance: date_naissance, 
            role: "ROLE_USER",
            token: '123456789'
        });
    
        res.status(200).json({
            error: false,
            message: "L'utilisateur a bien été créé avec succès",
            user: createdUser
            // user: {
            //     ﬁrstname: "xxxxxx",
            //     lastname: "xxxxxx",
            //     email: "xxxxxx",
            //     sexe: "xxxxxx",
            //     role: "xxxxx",
            //     dateNaissance: "xxxx-xx-xx",
            //     createdAt: "xxxxxx",
            //     updateAt: "xxxxxx",
            //     subscription: "xxxxxx"
            // }
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: true,
            message: "Service inaccessible, veuillez reessailler plutard"
        });
    }
});

// 04 - Abonnement de l'utilisateur
app.put('/subscription', passport.authenticate('bearer', { session: false }), (req, res) => {
    try {
        const { id_card, cvc } = req.body;

        if (true/*donnee manquante*/) {
            res.status(400).json({
                error: true,
                message: "Une ou plusieurs données obligatoires sont manquantes"
            });
        }

        if (true/*token errone*/) {
            res.status(401).json({
                error: true,
                message: "Votre token n'est pas correct"
            });
        }

        if (true/*payement echoue*/) {
            res.status(402).json({
                error: true,
                message: "Echec du payement de l'offre"
            });
        }

        if (true/*droit d'acces*/) {
            res.status(403).json({
                error: true,
                message: "Vos droits d'accès ne permettent pas d'accéder à la ressource"
            });
        }

        if (false/*Succes 2*/) {
            res.status(200).json({
                error: false,
                message: "Votre période d'essai vient d'être activé - 5 min"
            });
        }

        res.status(200).json({
            error: false,
            message: "Votre abonnement a bien été mise à jour"
        });    
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: true,
            message: "Service inaccessible, veuillez reessailler plutard"
        });
    }
});

// 05 - Modification de l'utilisateur
app.put('/user', passport.authenticate('bearer', { session: false }), (req, res) => {
    try {
        const { firstname, lastname, date_naissance, sexe } = req.body;

        if (true/*token erroné*/) {
            res.status(401).json({
                error: true,
                message: "Votre token n'est pas correct"
            });
        }

        if (true/*donnée non conforme(sexe, date_naissance*/) {
            res.status(409).json({
                error: true,
                message: "Une ou plusieurs données sont erronées"
            });
        }

        res.status(200).json({
            error: false,
            message: "Vos données ont été mises à jour"
        });    
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: true,
            message: "Service inaccessible, veuillez reessailler plutard"
        });
    }
});

// 06 - Deconnection de l'utilisateur
app.delete('/user/off', passport.authenticate('bearer', { session: false }), (req, res) => {
    try {
        if (true/*token erroné*/) {
            res.status(401).json({
                error: true,
                message: "Votre token n'est pas correct"
            });
        }
    
        res.status(200).json({
            error: false,
             message: "L'utilisateur a été déconnecté avec succès"
        });    
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: true,
            message: "Service inaccessible, veuillez reessailler plutard"
        });
    }
});

// 07 - Ajout de carte bancaire
app.put('/user/cart', passport.authenticate('bearer', { session: false }), (req, res) => {
    try {
        const { cartNumber, month, year, _default } = req.body;

        if (true/*Token erroné*/) {
            res.status(401).json({
                error: true,
                message: "Votre token n'est pas correct"
            });
        }

        if (true/*carte fail*/) {
            res.status(402).json({
                error: true,
                message: "Informations bancaires incorrectes"
            });
        }

        if (true/*carte existe*/) {
            res.status(409).json({
                error: true,
                message: "La carte existe déjà"
            });
        }

        if (true/*carte erroné/incomplete*/) {
            res.status(403).json({
                error: true,
                message: "Veuillez compléter votre profil avec une carte de crédit"
            });
        }

        if (true/*droit d'acces*/) {
            res.status(403).json({
                error: true,
                message: "Vos droits d'accès ne permet pas d'accéder à la ressource"
            });
        }

        if (true/*donnée non conforme*/) {
            res.status(409).json({
                error: true,
                message: "Une ou plusieur données sont erronées"
            });
        }

        res.status(200).json({
            error: false,
            message: "Vos données ont été mise à jour"
        });    
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: true,
            message: "Service inaccessible, veuillez reessailler plutard"
        });
    }
});

// 08 - Suppression de compte
app.delete('/user', passport.authenticate('bearer', { session: false }), (req, res) => {
    try {
        if (true/*Token erroné*/) {
            res.status(401).json({
                error: true,
                message: "Votre token n'est pas correct"
            });
        }
    
        res.status(200).json({
            error: false,
            message: "Votre compte et le compte de vos enfants ont été supprimés avec succès"
        });    
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: true,
            message: "Service inaccessible, veuillez reessailler plutard"
        });
    }
});

// 09 - Listing des sources audios
app.get('/songs', passport.authenticate('bearer', { session: false }), (req, res) => {
    try {
        if (true/* token erroné*/) {
            res.status(401).json({
                error: true,
                message: "Votre token n'est pas correct"
            });
        }
    
        if (true/* droit d'acces abonnement*/) {
            res.status(403).json({
                error: true,
                message: "Votre abonnement ne permet pas d'accéder à la ressource"
            });
        }
    
        res.status(201).json({
            error: false, 
            songs: [{ 
                id: "xxxxxx", 
                name: "xxxxxx", 
                url: "xxxxxx", 
                cover: "xxxxx", 
                time: "xxxxx", 
                type: "xxxxx", 
                createdAt: "xxxxxx", 
                updateAt: "xxxxxx" 
            }]
        });    
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: true,
            message: "Service inaccessible, veuillez reessailler plutard"
        });
    }
});

// 10 - Recuperation d'une source audio
app.get('/songs/{id}', passport.authenticate('bearer', { session: false }), (req, res) => {
    try {
        const { id_song } = req.body;

        if (true/* token erroné*/) {
            res.status(401).json({
                error: true,
                message: "Votre token n'est pas correct"
            });
        }

        if (true/* droit d'acces abonnement*/) {
            res.status(403).json({
                error: true,
                message: "Votre abonnement ne permet pas d'accéder à la ressource"
            });
        }

        res.status(201).json({
            error: false, 
            songs: { 
                id: "xxxxxx", 
                name: "xxxxxx", 
                url: "xxxxxx", 
                cover: "xxxxx", 
                time: "xxxxx", 
                type: "xxxxx", 
                createdAt: "xxxxxx", 
                updateAt: "xxxxxx" 
            }
        });    
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: true,
            message: "Service inaccessible, veuillez reessailler plutard"
        });
    }
});

app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully');
        console.log(`Listening at http://localhost:${port}`);
    } catch (error) {
        console.log('Something went wrong');
        console.log(error);
    }
})