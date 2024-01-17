import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // 获取mongoDB的ObjectIds 并指向到Category collection
  publishAt: {
    type: Number,
    default: null,
  },
  updatedAt: {
    type: Number,
    default: Date.now,
  },
});

export default categorySchema;
