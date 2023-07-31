import mongoose from "mongoose";

const UserWindowSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  windowId: mongoose.Schema.Types.ObjectId,
});

const UserWindow = mongoose.model("userwindows", UserWindowSchema);

export default UserWindow;