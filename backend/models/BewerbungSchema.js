// hier können wir Felder definieren, die wir in der DB speichern wollen
// die Eingaben können wir später machen


/* 
name / Nummer // ObjectId kommt von MongoDB

anfangsdatum

gehaltsvorstellung

remote / vor ort

.... 


bei Arrays können wir gebrauch machen von enum, z.B. 
beim tech stack geben wir die 4 optionen vor

z.B. Arbeitszeit: enum ["vollzeit", "teilzeit", "werkstudent", "praktikum"]


*/

// import mongoose from "mongoose";

// const BewerbungSchema = new mongoose.Schema({


//     /* hier kommt das Herzstück */
// })
import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const BewerbungSchema = new Schema({
  unternehmen: { type: String, required: true, trim: true },
  vorname: { type: String, trim: true },
  nachname: { type: String, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Bitte geben Sie eine gültige E-Mail-Adresse ein']
  },
  telefon: {
    type: String,
    trim: true,
    match: [/^\+?[0-9\s\-()]{7,20}$/, 'Bitte geben Sie eine gültige Telefonnummer ein']
  },
  position: { type: String, required: true, trim: true },
  arbeitsort: { type: String, enum: ['remote', 'vor Ort', 'hybrid'], default: 'vor Ort' },
  anschreiben: { type: String, trim: true },
  lebenslaufLink: { type: String, trim: true },
  dokumente: [{ name: String, link: String }],
  referenznummer: { type: String, unique: true, trim: true },
  interneNotizen: { type: String, trim: true },
  bewerbungsdatum: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['versendet', 'in Bearbeitung', 'abgelehnt', 'Vertragsverhandlung'],
    default: 'versendet'
  },
  statusGeaendertAm: { type: Date },
  bearbeitetVon: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
BewerbungSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    this.statusGeaendertAm = new Date();
  }
  next();
});
const Bewerbung = model('Bewerbung', BewerbungSchema);
export default Bewerbung;
