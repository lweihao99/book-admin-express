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
    type: mongoose.Schema.Types.ObjectId, // 跟category进行关联
    ref: "Category",
  },
  stock: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
  publishAt: {
    type: Number,
    default: null,
  },
  createdAt: {
    type: Number,
    default: Date.now,
  },
  updatedAt: {
    type: Number,
    default: Date.now,
  },
});

export default bookSchema;
