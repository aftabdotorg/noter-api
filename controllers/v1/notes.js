import { v4 as uuidv4 } from "uuid";
import validator from "express-validator";

const { validationResult } = validator;
let notes = [];

export const getNotes = (req, res) => {
  res.send(notes);
};

export const createNotes = (req, res) => {
  const errors = validationResult(req);

  // ! validation
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(errors);
  const note = req.body;
  notes.push({ ...note, id: uuidv4() });
  res.send(`Created a note of title ${note.title}!`);
};

export const getNoteById = (req, res) => {
  const { id } = req.params;
  const note = notes.find((note) => note.id === id);
  res.send(note);
};

export const deleteNote = (req, res) => {
  const { id } = req.params;

  notes = notes.filter((note) => note.id !== id);
  res.send(`A note ${id} has been deleted.`);
};

export const updateNote = (req, res) => {
  const { id } = req.params;
  const { title, content, isDraft } = req.body;
  console.log(title, content, isDraft);
  let note = notes.find((note) => note.id === id);

  if (title) {
    note.title = title;
  }

  if (content) {
    note.content = content;
  }

  if (isDraft) {
    note.isDraft = isDraft;
  }

  res.send(`Updated ${id} with ease.`);
};
