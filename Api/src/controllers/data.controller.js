import pool from "../utils/connect.js";

const getDataFromDB = async (req, res) => {
    const { pageNumber, pageSize } = req.query;
    try {
        // Calculate the offset based on the page number and page size
        const offset = (pageNumber - 1) * pageSize;

        // Execute the SQL query to fetch paginated data
        const result = await pool.query(
            'SELECT * FROM public.customers ORDER BY sno OFFSET $1 LIMIT $2',
            [offset, pageSize]
        );

        // Return the rows fetched from the database
        res.json(result.rows);
    } catch (error) {
        // Handle errors
        console.error('Error fetching paginated data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export { getDataFromDB };
