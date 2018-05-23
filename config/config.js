// require('dotenv').config();

module.exports = {
    "development": {
      "username": process.env.JAWSDB_USERNAME,
      "password": process.env.JAWSDB_PASSWORD,
      "database": process.env.JAWSDB_DATABASE,
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  }
  