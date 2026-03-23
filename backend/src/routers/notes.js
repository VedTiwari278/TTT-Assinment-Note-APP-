import express from "express"
const router = express.Router();
import { createNotes, deleteNotes, getNoteById, getNotes, updateNotes } from "../controllers/notes.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

router.post("/create", verifyToken, createNotes);
router.get("/get", verifyToken, getNotes);
router.get("/get/:id", verifyToken, getNoteById);
router.put("/update/:id", verifyToken, updateNotes);
router.delete("/delete/:id", verifyToken, deleteNotes);

export default router;  
