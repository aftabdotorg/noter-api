import express from "express";
import bodyParser from "body-parser";
import notesRoutesV1 from "./routes/v1/node.js";
import notesRoutesV2 from "./routes/v2/node.js";

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

app.use("/v1/notes", notesRoutesV1);
app.use("/v2/notes", notesRoutesV2);

app.get("/", (req, res) => {
  res.send("Welcome to Noter !");
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
