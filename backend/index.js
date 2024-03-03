import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";
import cors from  'cors';

const app = express();
const port = 7000;
env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/customers', async (req, res) => {
    const { search = '', page = 1, sort_by = 'created_at'} = req.query;
    const limit=20;
    const offset = (page - 1) * limit;

let query= `SELECT * FROM customers`;

let queryParams = [];

if (search !== '') {
query += ` WHERE customer_name ILIKE $1 OR location ILIKE $1`;
queryParams.push(`%${search}%`);
}

if (sort_by == 'date') {
query += ` ORDER BY created_at::date DESC`;  
} else if (sort_by == 'time') {
query += ` ORDER BY created_at::time DESC`; 
}

query += ` OFFSET ${offset} LIMIT ${limit}`;
    try {
        const result= await db.query(query, queryParams);
        const totalcount=await db.query('select  count(*) from customers');
        const totalPages=Math.ceil(totalcount.rows[0].count / limit);
        res.json({rows:result.rows, totalPages: totalPages});
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
