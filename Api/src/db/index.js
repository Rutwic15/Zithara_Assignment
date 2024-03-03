import pool from "../utils/connect.js";
const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log(`\n PostgreSQL connected !! Client:host ${client.host}`);
        client.release();
    } catch (error) {
        console.error('PostgreSQL Connection error', error);
        process.exit(1);
    }
};

export default connectDB;
