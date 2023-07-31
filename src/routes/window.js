import express from "express";
import WindowController from "../controllers/WindowController.js";
import { verifyRoute, checkAdmin, checkAccess, getIdFromParam } from "../middleware/authMiddleware.js";

const router = express.Router();

const windowController = new WindowController();

router.get("/getAllWindows", verifyRoute, windowController.getAllWindow);
router.get("/getWindow/:id", verifyRoute, getIdFromParam, checkAccess, windowController.getWindow);
router.post("/createWindow", verifyRoute, windowController.createWindow);
router.patch("/editWindow/:id", verifyRoute, checkAdmin, windowController.editWindow);
router.patch("/renameWindow/:id", verifyRoute, checkAdmin, windowController.editWindow);
router.patch("/updateUserToApp/:id", verifyRoute, checkAdmin, windowController.editWindow);
router.delete("/deleteWindow/:id", verifyRoute, checkAdmin, windowController.deleteWindow);

export default router