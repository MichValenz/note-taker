const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const {notes} = require("./develop/db/notes.json");

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static("develop/public"));

function findById(id, notesArray) {
  const result = notesArray.filter((note) => note.id === id)[0];
  return result;
}

function createNote(body, notesArray) {
  console.log(body);
  const note = body;
  notesArray.push(note);

  fs.writeFileSync(
    path.join(__dirname, "./develop/db/notes.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;


  
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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./develop/public/index.html"));
});


app.post("/api/notes", (req, res) => {
  console.log(req.body);
  req.body.id = notes.length.toString();

const note = createNote(req.body, notes);

res.json(note);

  
});

app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
});
