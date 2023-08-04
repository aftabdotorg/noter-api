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

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.post("/create", (req, res) => {
  //   console.log(req.body);
  const note = req.body;
  notes.push({ ...note, id: uuid.v4() });
  res.send(`Created a note of title ${note.title}!`);
});

app.get("/note/:id", (req, res) => {
  const { id } = req.params;
  const note = notes.find((note) => note.id === id);
  res.send(note);
});

app.delete("/note/:id", (req, res) => {
  const { id } = req.params;

  notes = notes.filter((note) => note.id !== id);
  res.send(`A note ${id} has been deleted.`);
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
