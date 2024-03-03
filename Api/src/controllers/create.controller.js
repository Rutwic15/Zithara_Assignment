import { createTable } from "../models/user.model.js";
import pool from "../utils/connect.js";

// Function to ensure that the customers table is created before adding a new customer
const ensureTableCreated = async () => {
  try {
    const ans = await createTable();
    if(ans == true) console.log('Table "customers" created successfully.');
  } catch (error) {
    console.error('Error creating table:', error);
    throw error;
  }
};

const addCustomer = async (req, res) => {
  const { customer_name, age, phone, location } = await req.body;
  //console.log( customer_name+ " "+age+" "+phone+" "+location);
  if(!customer_name && !age && !phone && !location){
    res.status(401).json({
        message:"The values cannot be null"
    })
  }
  const insertQuery = `
    INSERT INTO customers (customer_name, age, phone, location) 
    VALUES ($1, $2, $3, $4)
  `;
  try {
    // Ensure that the customers table is created before adding a new customer
    await ensureTableCreated();
    
    const client = await pool.connect();
    await client.query(insertQuery, [customer_name, age, phone, location]);
    console.log('Customer added successfully.');
    client.release();
    res.status(201).json({ message: 'Customer added successfully' });
  } catch (error) {
    console.error('Error adding customer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { addCustomer };
