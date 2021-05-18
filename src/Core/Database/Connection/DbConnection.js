import conn from 'knex';
import database from '../../../App/Config/Database.js';
import dotenv from 'dotenv';
dotenv.config

const DbConnection = conn(database[process.env.APP_MODE]);

export default DbConnection;