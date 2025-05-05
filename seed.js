// const bewerbungen = []
// await BewerbungsSchema.insertMany(bewerbungen)

import mongoose from "mongoose";
import Bewerbung from "./models/BewerbungSchema.js";
import fs from "fs/promises";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/bewerbungsarchiv";

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB verbunden.");

    const jsonData = await fs.readFile("./data/startData.json", "utf-8");
    const bewerbungen = JSON.parse(jsonData);

    await Bewerbung.deleteMany(); // Option: Datenbank leeren vor dem Seed
    await Bewerbung.insertMany(bewerbungen);

    console.log("Dummy-Daten erfolgreich eingefügt.");
    process.exit();
  } catch (err) {
    console.error("Fehler beim Seed:", err);
    process.exit(1);
  }
};

seed();
