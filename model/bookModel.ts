import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
  },
  category: {
    // todo
    type: String,
  },
  stock: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
  publish: {
    type: Number,
    default: null,
  },
  CreatedAt: {
    type: Number,
    default: Date.now,
  },
  updatedAt: {
    type: Number,
    default: Date.now,
  },
});

export default bookSchema;