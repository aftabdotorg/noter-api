import express from "express";
import validator from "express-validator";
import {
  createNotes,
  getNotes,
  getNoteById,
  deleteNote,
  updateNote,
} from "../../controllers/v1/notes.js";

const { body } = validator;
const router = express.Router();

router.get("/", getNotes);

router.post(
  "/",
  body("title").exists(),
  body("isDraft").isBoolean(),
  createNotes
);

router.get("/:id", getNoteById);

router.delete("/:id", deleteNote);

router.patch("/:id", updateNote);

export default router;
