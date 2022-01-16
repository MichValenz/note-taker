const express = require("express");


const app = express();
const notes = require(".develop/db/db.json")








app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
});