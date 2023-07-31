import jwt from "jsonwebtoken";
import Window from "../models/Window.js";
import { ADMIN, USER } from "../config/constant.js";
import UserWindow from "../models/UserWindow.js";
import Recorder from "../models/Recorder.js";
import { NotFound, Unauthorized } from "./errorHandle.js";

export const verifyRoute = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    const error = new Unauthorized("Authorization token not found");
    next(error);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    next(error);
  }
};

export const checkAdmin = (req, res, next) => {
  const id = req.params.id;
  Window.findOne({ _id: id })
    .then((success) => {
      if (!success) {
        const error = new NotFound("Window not found");
        next(error);
      }
      if (req.userId !== success.createBy) {
        const error = new Error("Not available");
        next(error);
      }
      next();
    })
    .catch(next);
};

export const checkAccess = (req, res, next) => {
  const id = req.windowId;
  Window.findOne({ _id: id })
    .then((success) => {
      if (!success) {
        const error = new NotFound("Window not found");
        next(error);
      }
      if (req.userId === success.createBy) {
        req.role = ADMIN;
        next();
      } else {
        UserWindow.findOne({ userId: req.userId, windowId: id })
          .then((success) => {
            if (!success) {
              const error = new Error("Not available");
              next(error);
            }
            req.role = USER;
            next();
          })
          .catch(next);
      }
    })
    .catch(next);
};

export const getIdFromParam = (req, res, next) => {
  const id = req.params.id;
  req.windowId = id;
  next();
};

export const getRecordParentId = (req, res, next) => {
  const id = req.params.id;
  Recorder.findOne({ _id: id })
    .then((success) => {
      if (!success) {
        const error = new NotFound();
        next(error);
      }
      req.windowId = success.parentId;
      next();
    })
    .catch(next);
};
