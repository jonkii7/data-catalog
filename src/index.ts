import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

// Start the Express server and listen on the specified PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
