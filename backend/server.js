
import express from "express";
import dotenv from "dotenv";
import connect from "./utils/connectDB.js"; // Import the DB connection function
import Bewerbung from "./models/BewerbungSchema.js"; // Import the Bewerbung model
import cors from "cors"; // wichtig für die Kommunikation zwischen Frontend und Backend

const app = express();
app.use(express.json()); // Middleware for JSON parsing
app.use(cors()); // Enable CORS for all routes
dotenv.config();
const PORT = process.env.PORT  // use actually available port from .env

// Try connecting to MongoDB; start server anyway even if connection fails
connect(); // Connect to MongoDB

// einmalig ausführen
/* Bewerbung.collection.dropIndex('referenznummer_1')
  .then(() => console.log('✅ Alter referenznummer-Index gelöscht'))
  .catch(err => console.warn('⚠️ Kein referenznummer-Index vorhanden oder anderer Fehler:', err.message)); */


app.get("/", (req, res) => {
  res.send("Hello co-creator! Let's start building something great 🤓");
});

////////////////// GET & POST /bewerbungen ////////////////////////////////
// Routes
app.get("/bewerbungen", async (req, res) => {
  try {
    const bewerbungen = await Bewerbung.find().sort({ createdAt: -1 });
    res.json(bewerbungen);
  } catch (err) {
    res.status(500).json({ error: "Fehler beim Abrufen der Bewerbungen" });
  }
});

app.post("/bewerbungen", async (req, res) => {
  try {
    console.log("📥 Eingehende Daten:", req.body); // <--- NEU
    const neueBewerbung = new Bewerbung(req.body);
    await neueBewerbung.save();
    res.status(201).json(neueBewerbung);
  } catch (err) {
    console.error("❌ Fehler beim Speichern:", err.message, err.errors);   // <--- Zeigt Validierungsfehler
    res.status(500).json({ 
      error: err.message || "Fehler beim Speichern der Bewerbung",
      details: err.errors || null
    });
  }
});
/////////////////////////////////////////////////////

// Error Middleware
app.use((err, req, res, next) => {
  console.error("❌ Error found:", err);
  res.sendStatus(500);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
