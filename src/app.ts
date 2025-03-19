import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes/routes";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/", routes);

export default app;
