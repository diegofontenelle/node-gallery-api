require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const routes = require("../src/routes");
const app = express();
let server;
var deleteId;

beforeAll(async done => {
  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
  });

  app.use(routes);
  app.use(express.json());
  app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
  );
  app.use(express.urlencoded({ extended: true }));
  server = app.listen(process.env.PORT || 4000);

  done();
});

afterAll(async () => {
  await server.close();
  await mongoose.disconnect();
});

test("The request returns status 200", async done => {
  const response = await request(app).get("/posts");

  expect(response.status).toBe(200);
  done();
});

test("The returned value is an array", async done => {
  const response = await request(app).get("/posts");
  expect(Array.isArray(response.body)).toBe(true);
  done();
});

test("Should skip the specified amount of posts", async done => {
  const skipedResponse = await request(app).get("/posts/1");
  const response = await request(app).get("/posts");

  expect(response.body.length > skipedResponse.body.length).toBe(true);
  done();
});

test("Should fail to upload an unsupported file type", async done => {
  let filePath = __dirname + "/files/mockPdf.pdf";

  const response = await request(app)
    .post("/posts")
    .attach("file", filePath);

  expect(response.status).toBe(500);
  done();
});

test("Should fail to upload supported file type that is over 5mb", async done => {
  let filePath = __dirname + "/files/bigImage.jpg";
  jest.setTimeout(30000);

  const response = await request(app)
    .post("/posts")
    .attach("file", filePath);

  expect(response.status).toBe(500);
  done();
});

test("Should upload an Image that is less than 5mb", async done => {
  let filePath = __dirname + "/files/small_image.jpg";

  const response = await request(app)
    .post("/posts")
    .attach("file", filePath);

  deleteId = response.body._id;
  expect(response.status).toBe(200);
  done();
});

test("Should delete the post", async done => {
  const response = await request(app).delete(`/posts/${deleteId}`);

  expect(response.status).toBe(200);
  done();
});
