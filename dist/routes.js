"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = require("express");
const mysql_1 = __importDefault(require("mysql"));
const cors_1 = __importDefault(require("cors"));
exports.route = (0, express_1.Router)();
var fs = require('fs');
exports.route.use((0, cors_1.default)({ 'Access-Control-Allow-Origin': '*' }));
const connection = mysql_1.default.createConnection({
    host: 'football-compendium-db.mysql.database.azure.com',
    user: 'admin1',
    password: 'password1!',
    database: 'football',
    ssl: {
        ca: fs.readFileSync('dist/DigiCertGlobalRootCA.crt.pem')
    }
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL!');
});
exports.route.get('/stadia', (req, res) => {
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
// Get all stadiums
exports.route.get('/stadia', (req, res) => {
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
exports.route.post('/add', (req, res) => {
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
exports.route.delete("/stadia/:stadium_id", (req, res) => {
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
exports.route.get("/update/:stadium_id", (req, res) => {
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
exports.route.put("/update/:stadium_id", (req, res) => {
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
