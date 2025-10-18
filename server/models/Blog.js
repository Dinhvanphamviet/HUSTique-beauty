import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["Chăm sóc tóc", "Chăm sóc cơ thể", "Chăm sóc da mặt"],
      required: true,
    },
    description: { type: String, required: true },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
