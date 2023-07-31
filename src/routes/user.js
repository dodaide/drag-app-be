import express from "express";
import UserController from "../controllers/UserController.js";
import { verifyRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

const userController = new UserController();

router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/logout", userController.logout);
router.get("/user/getUserById/:id", userController.getUserById);
router.get("/user/getUser", verifyRoute, userController.getUser);
router.get("/user/getAllUsers", verifyRoute, userController.getAllUsers);

export default router