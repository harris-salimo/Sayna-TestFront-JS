# API Back

Un simple API pour un test

## Technologies
- *dotenv* (_v10.0.0_): pour stocker les variables d'environnements
- *express* (_v4.17.2_): pour créer l'api avec `node.js`
- *joi* (_v17.5.0_): pour valider les données
- *passport* (_v0.5.2_): pour controller l'accès aux ressources fournies par l'api
- *passport-http-bearer* (_v1.0.1_): pour authentifier et attribuer des tokens aux utilisateurs
- *pg* (_v8.7.1_): pour accéder au base de données
- *pg-hstore* (_v2.3.4_): même que `pg` (Note: `pg` et `pg-hstore` sont utiles pour `sequelize`)
- *sequelize* (_v6.12.5_): ORM pour manipuler les données

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
