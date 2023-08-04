const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");

const app = express();
const PORT = 3001;

let notes = [];

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to Noter !");
});

app.get("/v1/notes", (req, res) => {
  res.send(notes);
});

app.get("/v2/notes", (req, res) => {
  console.log(notes);
  res.send(notes);
});

app.post("/v1/create", (req, res) => {
  //   console.log(req.body);
  const note = req.body;
  notes.push({ ...note, id: uuid.v4() });
  res.send(`Created a note of title ${note.title}!`);
});

app.get("/v1/note/:id", (req, res) => {
  const { id } = req.params;
  const note = notes.find((note) => note.id === id);
  res.send(note);
});

app.delete("/v1/note/:id", (req, res) => {
  const { id } = req.params;

  notes = notes.filter((note) => note.id !== id);
  res.send(`A note ${id} has been deleted.`);
});

app.patch("/v1/note/:id", (req, res) => {
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
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
