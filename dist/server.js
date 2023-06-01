"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + `/../backend.env` });
// Create an Express app
const app = (0, express_1.default)();
const port = 80;
// Create a MySQL connection
const connection = mysql_1.default.createConnection({
    host: 'localhost',
    user: process.env.DB_PASS,
    password: process.env.DB_USER,
    database: 'football'
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL!');
});
// Get all stadiums
app.get('/stadia', (req, res) => {
    // Perform MySQL query
    connection.query('SELECT * FROM stadium', (err, rows) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(rows);
    });
});
// Post stadium to database
app.post('/add', (req, res) => {
    // Perform MySQL query
    const test = "INSERT INTO stadium (`stadium_name`,`capacity`) VALUES (?)";
    const values = [req.body.stadium_name, req.body.capacity];
    connection.query(test, [values], (err, rows) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        return res.json("Stadium has been added!");
    });
});
// Delete stadium
app.delete("/stadia/:stadium_id", (req, res) => {
    const stadiumID = req.params.stadium_id;
    const q = "DELETE FROM stadium WHERE stadium_id = ?";
    connection.query(q, [stadiumID], (err, rows) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        return res.json("Stadium has been deleted!");
    });
});
// Get individual stadium data for update form
app.get("/update/:stadium_id", (req, res) => {
    const stadiumID = req.params.stadium_id;
    const q = "SELECT stadium_name, capacity FROM stadium WHERE stadium_id = ?";
    connection.query(q, [stadiumID], (err, rows) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        return res.json();
    });
});
// Update stadium
app.put("/update/:stadium_id", (req, res) => {
    const stadiumID = req.params.stadium_id;
    const q = "UPDATE stadium SET `stadium_name` = ?, `capacity` = ? WHERE stadium_id = ?";
    const values = [req.body.stadium_name, req.body.capacity];
    connection.query(q, [...values, stadiumID], (err, rows) => {
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
