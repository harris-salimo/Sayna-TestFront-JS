# API Back

Un simple API pour un test

## Technologie
- _dotenv_ (v10.0.0): pour stocker les variables d'environnements
- _express_ (v4.17.2): pour créer l'api avec `node.js`
- _joi_ (v17.5.0): pour valider les données
- _passport_ (v0.5.2): pour controller l'accès aux ressources fournies par l'api
- _passport-http-bearer_ (v1.0.1): pour authentifier et attribuer des tokens aux utilisateurs
- _pg_ (v8.7.1): pour accéder au base de données
- _pg-hstore_ (v2.3.4): même que `pg` (Note: `pg` et `pg-hstore` sont utiles pour `sequelize`)
- _sequelize_ (v6.12.5): ORM pour manipuler les données

## Configuration
Pour créer la base de données, utiliser l'outil cli de `sequelize` en lançant la commande suivante:
```
$ sequelize db:create
```
Ensuite lancer la commande qui suit pour avoir les tables
```
$ sequelize db:migrate
```
#### Note: la base de données utilisée dans cet api est _PostgreSQL_

## Installation
Créer un dossier pour mettre l'application et naviguer dans le dossier
```shell
$ mkdir api_back
$ cd api_back
```
Cloner ce répertoire github à l'aide de l'utilitaire `git`
```shell
$ git clone https://github.com/harris-salimo/Sayna-TestFront-JS
```
Installer les dépendances à l'aide de `npm`
```shell
$ npm install
```
## Lancement
Pour lancer l'application, taper cette commande dans votre terminal
```shell
$ node app.js
```
