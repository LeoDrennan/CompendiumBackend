"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
dotenv_1.default.config({ path: __dirname + `/../backend.env` });
// Create an Express app
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({ 'Access-Control-Allow-Origin': '*' }));
// Find routes
app.use("/", routes_1.route);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
