import multer from "multer";
import express from "express";
import dotenv from "dotenv";
import connect from "./utils/connectDB.js"; // Import the DB connection function
// import Bewerbung from "./models/BewerbungSchema.js"; // Import the Bewerbung model
import Bewerbung from "./models/BewerbungSchema-fileUpload.js"; // Import the Bewerbung model
import cors from "cors"; // wichtig für die Kommunikation zwischen Frontend und Backend

const app = express();
dotenv.config();
const PORT = process.env.PORT  // use actually available port from .env

// const upload = multer(); // Kein Speicherpfad definiert
// const upload = multer({ dest: "uploads/" });

// Statt `dest: 'uploads/'`
const storage = multer.memoryStorage();
const upload = multer({ storage });
//########### Multer Storage für Dateien mit Erweiterung - gilt nur für local storage in uploads/ ############
// const storage = multer.diskStorage({
/*   destination: (req, file, cb) => {
    cb(null, "uploads/"); // Zielordner für die hochgeladenen Dateien
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname); // Holen der Dateierweiterung
    const filename = Date.now() + extname; // Dateiname mit Zeitstempel und Erweiterung
    cb(null, filename); // Die Datei wird mit dem neuen Namen gespeichert
  }
}); */

// Multer-Upload konfigurieren
// const upload = multer({ storage: storage });
//###########################################


app.use(express.json()); // Middleware for JSON parsing
app.use(express.urlencoded({ extended: true })); // auch für FormData wichtig
app.use(cors()); // Enable CORS for all routes

// Try connecting to MongoDB; start server anyway even if connection fails
connect(); // Connect to MongoDB

// einmalig ausführen
/* Bewerbung.collection.dropIndex('referenznummer_1')
  .then(() => console.log('✅ Alter referenznummer-Index gelöscht'))
  .catch(err => console.warn('⚠️ Kein referenznummer-Index vorhanden oder anderer Fehler:', err.message)); */


app.get("/", (req, res) => {
  res.send("Hello co-creator! Let's start building something great 🤓");
});

////////// File Upload Route nur für eine Datei; nur Lebenslauf  /////////////////
/* app.post("/bewerbungen/upload", upload.single("lebenslauf"), async (req, res) => {
  try {
    const { firma, stelle, datum, art, lebenslauf_version } = req.body;
    const lebenslauf_datei = req.file.buffer.toString("base64"); // Konvertiere Buffer in Base64-String

    const neueBewerbung = new Bewerbung({
      firma,
      stelle,
      datum,
      art,
      lebenslauf_version,
      lebenslauf_datei,
    });

    await neueBewerbung.save();
    res.status(201).json(neueBewerbung);
  } catch (err) {
    console.error("❌ Fehler beim Speichern:", err.message, err.errors);
    res.status(500).json({ 
      error: err.message || "Fehler beim Speichern der Bewerbung",
      details: err.errors || null
    });
  }
}); */

////////// Route zum POST für Bewerbungen mit nur Metadaten  /////////
// app.post("/bewerbungen", upload.none(), async (req, res) => {

////// POST Route für Bewerbungen mit Metadaten & Dateiupload /////////  
app.post("/bewerbungen", upload.fields([

  { name: "lebenslauf_datei", maxCount: 1 }, // Lebenslauf
  { name: "anschreiben_datei", maxCount: 1 }, // Anschreiben
]), async (req, res) => {

  console.log("📨 POST /bewerbungen wurde getroffen");

  try {
  const { firma, stelle, datum, art, lebenslauf_version, anschreiben_format, anschreiben_text } = req.body;
  
  // Dateien abrufen
  const lebenslaufBuffer = req.files["lebenslauf_datei"]?.[0]?.buffer;
  const anschreibenBuffer = req.files["anschreiben_datei"]?.[0]?.buffer;

  // Optional: Base64-Kodierung (wenn du das Feld im Schema als String erwartest)
  // Base64-Kodierung der Datei (optional, wenn du das in der DB speichern willst)  ==> JA, das will ich. Später wieder von base64 zu pdf (vorschau)
  const lebenslaufBase64 = lebenslaufBuffer?.toString("base64") || null;
  const anschreibenBase64 = anschreibenBuffer?.toString("base64") || null;

  console.log("📥 Eingehende Daten:", req.body); // <--- NEU Zeigt die Metadaten an
  console.log("📥 Eingehende Dateien:", req.files); // Zeigt die hochgeladenen Dateien an


  const neueBewerbung = new Bewerbung({
    firma,
    stelle,
    datum: new Date(datum),datum,
    art,
    lebenslauf_version,
    anschreiben_format,
    anschreiben_text,
    lebenslauf_datei: lebenslaufBase64,
    anschreiben_datei: anschreibenBase64,
  }); 

  // console.log("📥 Neue Bewerbung (Metadaten):", neueBewerbung);

 
    const gespeicherteBewerbung = await neueBewerbung.save();
    res.status(201).json({ message: "Bewerbung gespeichert", neueBewerbung: gespeicherteBewerbung });
  } catch (error) {
    console.error("❌ Fehler beim Speichern:", error);
    res.status(500).json({ error: error.message });
  }
  
  console.log("Formular empfangen:");
  console.log("Body:", req.body);
  console.log("Files:", req.files);
  // res.json({ message: "Erfolg", data: req.body });   // kein zweimal response schicken
});

// Route zum Abrufen der Bewerbungen (GET)
app.get("/bewerbungen", async (req, res) => {
  try {
    const bewerbungen = await Bewerbung.find().sort({ createdAt: -1 });
    res.json(bewerbungen);
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Abrufen der Bewerbungen" });
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
