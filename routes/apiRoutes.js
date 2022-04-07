const router = require('express').Router();
const {notes} = require("../Develop/db/db.json")

router.get("/notes", (req, res) => {
  let results = notes;
  res.json(results);
});

router.post("/notes", (req, res) => {
  
})

router.delete("/notes/:id", (req, res) => {
  
})

module.exports = router