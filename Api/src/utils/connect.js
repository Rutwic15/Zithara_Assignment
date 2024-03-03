import dotenv from "dotenv";
import pkg from 'pg';
import { DB_NAME} from '../constants.js';
dotenv.config({
    path:'./.env',
})
const { Pool } = pkg;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
 });

 export default pool;