import Recorder from "../models/Recorder.js";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

export default class RecorderController {
  getRecorder(req, res, next) {
    Recorder.find({ parentId: req.windowId })
      .then((recorders) => res.json(recorders))
      .catch(next);
  }

  addRecorder(req, res, next) {
    const thisWindowId = new ObjectId(req.windowId);
    const formData = { data: req.body, parentId: thisWindowId };
    const recorder = new Recorder(formData);
    recorder
      .save()
      .then((success) => res.json(success))
      .catch(next);
  }

  editRecorder(req, res, next) {
    const formData = { data: req.body };
    Recorder.updateOne({ _id: req.params.id }, formData)
      .then((success) => res.json(success))
      .catch(next);
  }

  deleteRecorder(req, res, next) {
    Recorder.deleteOne({ _id: req.params.id })
      .then(() => res.json("success"))
      .catch(next);
  }
}
