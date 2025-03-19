import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
	user: "user",
	host: "data-catalog-db",
	database: "db",
	password: "password",
	port: 5432
});

export default pool;
