import mongoose from "mongoose";

const WindowSchema = new mongoose.Schema({
  name: String,
  windows: Array,
  createBy: String,
});

const Window = mongoose.model("window", WindowSchema);

export default Window;