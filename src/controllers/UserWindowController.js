import UserWindow from "../models/UserWindow.js";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

export default class UserWindowController {
  getAllWindows(req, res, next) {
    const thisUserId = new ObjectId(req.userId);
    UserWindow.aggregate([
      {
        $lookup: {
          from: "windows",
          localField: "windowId",
          foreignField: "_id",
          as: "window",
        },
      },
      {
        $unwind: "$window",
      },
      {
        $match: {
          userId: thisUserId,
        },
      },
      {
        $project: {
          _id: "$window._id",
          name: "$window.name",
        },
      },
    ])
      .then((success) => {
        res.json(success);
      })
      .catch(next);
  }

  getUserPicked(req, res, next) {
    const thisWindowId = new ObjectId(req.params.id);
    UserWindow.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $match: {
          windowId: thisWindowId,
        },
      },
      {
        $project: {
          _id: "$user._id",
          username: "$user.username",
        },
      },
    ])
      .then((success) => {
        res.json(success);
      })
      .catch(next);
  }

  addUserPicked(req, res, next) {
    const formData = {
      userId: new ObjectId(req.body.userId),
      windowId: new ObjectId(req.body.windowId),
    };
    const userWindow = new UserWindow(formData);
    userWindow
      .save()
      .then(() => {
        res.json("success");
      })
      .catch(next);
  }

  deleteUserPicked(req, res, next) {
    const { userid, id } = req.params;
    UserWindow.deleteOne({ userId: userid, windowId: id })
      .then(() => {
        res.json("success");
      })
      .catch(next);
  }
}
