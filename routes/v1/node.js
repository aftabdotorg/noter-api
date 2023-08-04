import express from "express";
import {
  createNotes,
  getNotes,
  getNoteById,
  deleteNote,
  updateNote,
} from "../../controllers/v1/notes.js";

const router = express.Router();

router.get("/", getNotes);

router.post("/", createNotes);

router.get("/:id", getNoteById);

router.delete("/:id", deleteNote);

router.patch("/:id", updateNote);

export default router;
