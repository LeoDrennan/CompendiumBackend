import { Router, Request, Response } from "express";
import mysql from 'mysql';
import cors from "cors";

export const route = Router();
var fs = require('fs');
route.use(cors({'Access-Control-Allow-Origin': '*'}))

const connection = mysql.createConnection({
    host: 'football-compendium-db.mysql.database.azure.com',
    user: 'admin1',
    password: 'password1!',
    database: 'football',
    ssl : {
      ca : fs.readFileSync('dist/DigiCertGlobalRootCA.crt.pem')
      }
  });

connection.connect((err: Error) => {
if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
}
console.log('Connected to MySQL!');
});

route.get('/stadia', (req: Request, res: Response) => {
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

// Get all stadiums
route.get('/stadia', (req: Request, res: Response) => {
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
route.post('/add', (req: Request, res: Response) => {
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
route.delete("/stadia/:stadium_id", (req: Request, res: Response) => {
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
route.get("/update/:stadium_id", (req: Request, res: Response) => {
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
route.put("/update/:stadium_id", (req: Request, res: Response) => {
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