const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const {notes} = require("./develop/db/notes.json");

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

function findById(id, notesArray) {
  const result = notesArray.filter((note) => note.id === id)[0];
  return result;
}



app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
});

app.post("/api/notes", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
});
