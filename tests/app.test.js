const app = require("../app");
const request = require("supertest");

//test independent?
//must i run npm test everytime

test("GET/ should return list of songs ", async () => {
  const response = await request(app).get("/songs");
  expect(response.status).toEqual(200);
  expect(response.body).toMatchObject([
    { id: 1, name: "Adele", artist: "Hello" },
    { id: 2, name: "MJ", artist: "Billie Jean" },
    { id: 3, name: "Ed Sheeren", artist: "Photograph" }
  ]);
});

test("POST/ should return a new pizza object ", async () => {
  const TEST_DATA = { id: 4, name: "Madonna", artist: "Like a Virgin" };
  const responseGet = await request(app).get("/songs");
  const NEW_DATA = responseGet.body.concat(TEST_DATA);

  const responsePost = await request(app)
    .post("/songs")
    .send(TEST_DATA);
  expect(responsePost.status).toEqual(201);
  expect(responsePost.body).toMatchObject(TEST_DATA);

  const responseNewGet = await request(app).get("/songs");
  expect(NEW_DATA).toMatchObject(responseNewGet.body);
});

test("GET/ should return a song with id", async () => {
  const response = await request(app).get("/songs/1");
  expect(response.status).toEqual(200);
  expect(response.body).toMatchObject({
    id: 1,
    name: "Adele",
    artist: "Hello"
  });
});

test("PUT/ should edit a song with id and return edited song", async () => {
  const TEST_DATA = { id: 2, name: "ABBA", artist: "Dancing Queen" };
  const response = await request(app)
    .put("/songs/2")
    .send(TEST_DATA);

  expect(response.status).toEqual(200);
  expect(response.body).toMatchObject(TEST_DATA);

  const responseGet = await request(app).get("/songs");
  expect(responseGet.status).toEqual(200);
  expect(responseGet.body).toEqual([
    { id: 1, name: "Adele", artist: "Hello" },
    { id: 2, name: "ABBA", artist: "Dancing Queen" },
    { id: 3, name: "Ed Sheeren", artist: "Photograph" },
    { id: 4, name: "Madonna", artist: "Like a Virgin" }
  ]);
});

test("DELETE/ should delete a song id", async () => {
  const response = await request(app).delete("/songs/4");
  expect(response.status).toEqual(200);
  expect(response.body).toMatchObject({
    id: 4,
    name: "Madonna",
    artist: "Like a Virgin"
  });

  const responseGet = await request(app).get("/songs");
  expect(responseGet.status).toEqual(200);
  expect(responseGet.body).toMatchObject([
    { id: 1, name: "Adele", artist: "Hello" },
    { id: 2, name: "ABBA", artist: "Dancing Queen" },
    { id: 3, name: "Ed Sheeren", artist: "Photograph" }
  ]);
});
