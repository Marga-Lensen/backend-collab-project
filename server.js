
import express from "express";
import dotenv from "dotenv";
import connect from "./utils/connectDB.js"; // Import the DB connection function


dotenv.config();

const app = express();
app.use(express.json()); // Middleware for JSON parsing

const PORT = process.env.PORT  // use actually available port from .env

// Try connecting to MongoDB; start server anyway even if connection fails
connect(); // Connect to MongoDB

app.get("/", (req, res) => {
  res.send("Hello co-creator! Let's start building something great 🤓");
});


// Error Middleware
app.use((err, req, res, next) => {
  console.error("❌ Error found:", err);
  res.sendStatus(500);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
