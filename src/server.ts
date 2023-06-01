import express, { Request, Response } from 'express';
import mysql, { Connection } from 'mysql';
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: __dirname + `/../backend.env` });

// Create an Express app
const app = express();
const port = 3001;


// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_PASS,
  password: process.env.DB_USER,
  database: 'football'
});

app.use(express.json());
app.use(cors());

// Connect to MySQL
connection.connect((err: Error) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');
});

// Get all stadiums
app.get('/stadia', (req: Request, res: Response) => {
  // Perform MySQL query
  connection.query('SELECT * FROM stadium', (err: Error, rows: any[]) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(rows);
  });
});

// Post stadium to database
app.post('/add', (req: Request, res: Response) => {
    // Perform MySQL query
    const test: string = "INSERT INTO stadium (`stadium_name`,`capacity`) VALUES (?)";
    const values: [string, number] = [req.body.stadium_name, req.body.capacity]
    connection.query(test,[values], (err: Error, rows: any[]) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      return res.json("Stadium has been added!");
    });
  });

// Delete stadium
app.delete("/stadia/:stadium_id", (req: Request, res: Response) => {
    const stadiumID = req.params.stadium_id
    const q = "DELETE FROM stadium WHERE stadium_id = ?"

    connection.query(q,[stadiumID], (err: Error, rows: any[]) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      return res.json("Stadium has been deleted!");
    });
  });

// Get individual stadium data for update form
app.get("/update/:stadium_id", (req: Request, res: Response) => {
  const stadiumID = req.params.stadium_id
  const q = "SELECT stadium_name, capacity FROM stadium WHERE stadium_id = ?"

  connection.query(q,[stadiumID], (err: Error, rows: any[]) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    return res.json();
  });
});

// Update stadium
app.put("/update/:stadium_id", (req: Request, res: Response) => {
  const stadiumID = req.params.stadium_id
  const q = "UPDATE stadium SET `stadium_name` = ?, `capacity` = ? WHERE stadium_id = ?"
  const values: [string, number] = [req.body.stadium_name, req.body.capacity]

  connection.query(q,[...values, stadiumID], (err: Error, rows: any[]) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    return res.json("Stadium has been updated!");
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
