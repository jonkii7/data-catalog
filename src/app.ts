import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes/routes";

const app = express(); // Initialize Express application

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Set up routes, defined in "./routes/routes.ts"
app.use("/", routes);

export default app;
