import Window from "../models/Window.js";
import Recorder from "../models/Recorder.js";
import UserWindow from "../models/UserWindow.js";

export default class WindowController {
  getAllWindow(req, res, next) {
    Window.find({ createBy: req.userId }, "_id name")
      .then((success) => res.json(success))
      .catch(next);
  }

  getWindow(req, res, next) {
    Window.findOne({ _id: req.params.id })
      .then((success) => {
        const respon = { ...success._doc };
        respon.role = req.role;
        res.json(respon);
      })
      .catch(next);
  }

  createWindow(req, res, next) {
    const formData = {
      name: req.body.name,
      windows: [],
      createBy: req.userId,
      people: [],
    };
    const window = new Window(formData);
    window
      .save()
      .then((success) => {
        res.json({ _id: success._id, name: success.name });
      })
      .catch(next);
  }

  editWindow(req, res, next) {
    let formData;
    const id = req.params.id;

    if (req.path.includes("renameWindow")) formData = { name: req.body.name };
    else if (req.path.includes("editWindow"))
      formData = { windows: req.body.windows };
    else if (req.path.includes("updateUserToApp"))
      formData = { people: req.body };

    Window.updateOne({ _id: id }, formData)
      .then((success) => res.json(success))
      .catch(next);
  }

  deleteWindow(req, res, next) {
    const id = req.params.id;
    Window.deleteOne({ _id: id })
      .then(() => {
        return Promise.all([
          Recorder.deleteMany({ parentId: id }),
          UserWindow.deleteMany({ windowId: id }),
        ]);
      })
      .then(() => {
        res.json("success");
      })
      .catch(next);
  }
}
