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
const router = require("./routes");
const port = process.env.PORT || 3000;
var fs = require('fs');
// Create a MySQL connection
const connection = mysql_1.default.createConnection({
    host: 'football-compendium-db.mysql.database.azure.com',
    user: 'admin1',
    password: 'password1!',
    database: 'football',
    ssl: {
        ca: fs.readFileSync('dist/DigiCertGlobalRootCA.crt.pem')
    }
});
app.use(express_1.default.json());
app.use("/routes", router);
app.use((0, cors_1.default)());
// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL!');
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
