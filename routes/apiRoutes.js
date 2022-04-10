const fs = require("fs")
const { v4: uuid } = require('uuid')
const path = require("path")

//API for renderning  notes stored on db
module.exports = (app) => {
  app.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, "../db/db.json")))

  //API for storing user added note and renderning updated  notes stored on db.json
  app.post("/api/notes", (req, res) => {
    let newNote = {
      //UUID generates random id
      id: uuid(),
      title: req.body.title,
      text: req.body.text
    };
    let oldNote = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf-8"))
    oldNote.push(newNote)
    fs.writeFileSync("./db/db.json", JSON.stringify(oldNote))
    res.json(oldNote)
  })


  // Get query parameter to delete note
  app.delete("/api/notes/:id", (req, res) => {
    let selNote = req.params.id
    let oldNote = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf-8"))
    const newNote = oldNote.filter(oldNote => oldNote.id != selNote)
    fs.writeFileSync("./db/db.json", JSON.stringify(newNote))
    res.send(newNote)
  })
}