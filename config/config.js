module.exports = {
  "development": {
    "username": "admin", // process.env.DB_USER,
    "password": "password", // process.env.DB_PASS,
    "database": "sayna_test", // process.env.DB_NAME,
    "host": "127.0.0.1", // process.env.DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "admin", // process.env.DB_USER,
    "password": "password", // process.env.DB_PASS,
    "database": "sayna_test", // process.env.DB_HOST,
    "host": "127.0.0.1", // process.env.DB_HOST,
    "dialect": "postgres"
  }
}
