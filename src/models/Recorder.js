import mongoose from "mongoose";

const RecorderSchema = new mongoose.Schema({
  data: Object,
  parentId: mongoose.Schema.Types.ObjectId,
});

const Recorder = mongoose.model("recorder", RecorderSchema);

export default Recorder;