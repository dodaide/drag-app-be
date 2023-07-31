import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NotFound } from "../middleware/errorHandle.js";

export default class UserController {
  async login(req, res, next) {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json("User not found");
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json("Username or password not true");
      }
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET
      );
      res.json(accessToken);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res) {
    res.clearCookie("access_token", { path: "/" });
    res.json({ message: "Logout successful" });
  }

  async register(req, res, next) {
    const { su_username, su_password } = req.body;
    try {
      const user = await User.findOne({ username: su_username });
      if (user) {
        return res.status(400).json("User already exists");
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(su_password, salt);
      const newUser = new User({
        username: su_username,
        password: hashedPassword,
      });
      await newUser.save();
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET
      );
      res.status(201).json(accessToken);
    } catch (err) {
      next(err);
    }
  }

  getUser(req, res, next) {
    User.findOne({ _id: req.userId }, "username")
      .then((success) => {
        if (success) res.json(success);
        else {
          const error = new NotFound();
          next(error);
        }
      })
      .catch(next);
  }

  getUserById(req, res, next) {
    const id = req.params.id;
    User.findOne({ _id: id }, "username")
      .then((success) => res.json(success))
      .catch(next);
  }

  getAllUsers(req, res, next) {
    User.find({}, "_id username")
      .then((success) => {
        const filterRespons = success.filter(
          (person) => person._id.toString() != req.userId
        );
        res.json(filterRespons);
      })
      .catch(next);
  }
}
