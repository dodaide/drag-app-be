import express from "express";
import RecorderController from "../controllers/RecorderController.js";
import { verifyRoute, checkAccess, getIdFromParam, getRecordParentId } from "../middleware/authMiddleware.js";

const router = express.Router();

const recorderController = new RecorderController();

router.get("/getRecorder/:id", verifyRoute, getIdFromParam, checkAccess, recorderController.getRecorder);
router.post("/addRecorder/:id", verifyRoute, getIdFromParam, checkAccess, recorderController.addRecorder);
router.put("/editRecorder/:id", verifyRoute, getRecordParentId, checkAccess, recorderController.editRecorder);
router.delete("/deleteRecorder/:id", verifyRoute, getRecordParentId, checkAccess, recorderController.deleteRecorder);

export default router