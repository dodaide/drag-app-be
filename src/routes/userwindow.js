import express from "express";
import { verifyRoute, checkAdmin } from "../middleware/authMiddleware.js";
import UserWindowController from "../controllers/UserWindowController.js";

const router = express.Router();

const userWindowController = new UserWindowController();

router.get("/getUserPicked/:id", verifyRoute, userWindowController.getUserPicked);
router.get("/getAllWindows", verifyRoute, userWindowController.getAllWindows);
router.post("/addUserPicked/:id", verifyRoute, checkAdmin, userWindowController.addUserPicked);
router.delete("/deleteUserPicked/:id/:userid", verifyRoute, checkAdmin, userWindowController.deleteUserPicked);

export default router