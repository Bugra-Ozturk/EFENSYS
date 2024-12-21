import mongoose from "mongoose";

const measurementSchema = new mongoose.Schema({
  methane: { type: Number, required: true },
  propane: { type: Number, required: true },
  isobutane: { type: Number, required: true },
  hydrogen: { type: Number, required: true },
  date: { type: Date, default: Date.now }, 
});

const bookSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  author: { type: String, required: true },
  description: { type: String },
  measurements: [measurementSchema], 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
