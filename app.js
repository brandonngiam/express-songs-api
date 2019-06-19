const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let songs = [
  { id: 1, name: "Adele", artist: "Hello" },
  { id: 2, name: "MJ", artist: "Billie Jean" },
  { id: 3, name: "Ed Sheeren", artist: "Photograph" }
];

//return list of all songs
app.get("/songs", (req, res) => {
  res.status(200).send(songs);
});

//create a new song, and return new song
app.post("/songs", (req, res) => {
  songs.push(req.body);
  res.status(201).send(req.body);
});

//return a song with id
app.get("/songs/:id", (req, res) => {
  const songID = Number(req.params.id);
  const song = songs.filter(x => x["id"] === songID)[0];
  res.status(200);
  res.send(song);
});

//edit a song with id, and return edited song
app.put("/songs/:id", (req, res) => {
  const songID = Number(req.params.id);
  const songToUpdate = songs.find(x => x["id"] === songID);
  songToUpdate["name"] = req.body.name;
  songToUpdate["artist"] = req.body.artist;

  res.status(200);
  res.send(songToUpdate);
});

//delete a song with id, and return deleted song
app.delete("/songs/:id", (req, res) => {
  const songID = Number(req.params.id);
  const songToDelete = songs.find(x => x["id"] === songID);
  songs.splice(songs.indexOf(songToDelete), 1);
  console.log(songs);
  res.status(200);
  res.send(songToDelete);
});

app.listen(PORT);
console.log(`Server listening on port ${PORT}`);

module.exports = app;
