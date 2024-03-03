import pool from "../utils/connect.js";

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS customers (
        sno SERIAL PRIMARY KEY,
        customer_name VARCHAR(255) NOT NULL,
        age INT,
        phone VARCHAR(20),
        location VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

const createTable = async () => {
  try {
    const client = await pool.connect();
    const checkTableQuery = 'SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = $1)';
    const result = await client.query(checkTableQuery, ['customers']);
    const tableExists = result.rows[0].exists;
    if (!tableExists) {
        await client.query(createTableQuery);
        console.log('Table "customers" created successfully.');
        return true;
    }
    else{
        return false;
    }
    client.release();
} catch (error) {
    console.error('Error creating table:', error);
}
};

export { createTable };
