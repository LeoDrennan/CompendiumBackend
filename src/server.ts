import express, { Router, Request, Response } from 'express';
import mysql, { Connection } from 'mysql';
import cors from "cors";
import dotenv from "dotenv";
import { route } from "./routes";

dotenv.config({ path: __dirname + `/../backend.env` });

// Create an Express app
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.use("/", route);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
