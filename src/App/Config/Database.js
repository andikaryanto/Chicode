import dotenv from 'dotenv';
import approot from 'app-root-path';
dotenv.config({ path: approot + "/.env" });

const database = {
     development: {
          client: process.env.DB_CLIENT,
          connection: {
               host: process.env.DB_HOST,
               user: process.env.DB_USER,
               password: process.env.DB_PASSWORD,
               database: process.env.DB_NAME
          },
          pool: { min: 0, max: 7 },
          acquireConnectionTimeout: 0,
          migrations: {
               tableName: 'migrations',
               directory: approot + "/src/App/Databases/Migrations"
          },
          seeds: {
               directory: approot + "/src/App/Databases/Seeds"
          }
     },

     staging: {
          client: process.env.DB_CLIENT,
          connection: {
               host: process.env.DB_HOST,
               user: process.env.DB_USER,
               password: process.env.DB_PASSWORD,
               database: process.env.DB_NAME
          },
          pool: { min: 0, max: 7 },
          acquireConnectionTimeout: 0,
          migrations: {
               tableName: 'migrations',
               directory: approot + "/src/App/Databases/Migrations"
          },
          seeds: {
               directory: approot + "/src/App/Databases/Seeds"
          }
     },

     production: {
          client: process.env.DB_CLIENT,
          connection: {
               host: process.env.DB_HOST,
               user: process.env.DB_USER,
               password: process.env.DB_PASSWORD,
               database: process.env.DB_NAME
          },
          pool: { min: 0, max: 7 },
          acquireConnectionTimeout: 0,
          migrations: {
               tableName: 'migrations',
               directory: approot + "/src/App/Databases/Migrations"
          },
          seeds: {
               directory: approot + "/src/App/Databases/Seeds"
          }
     }
}

export default database;