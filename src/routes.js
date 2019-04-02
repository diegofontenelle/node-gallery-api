const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

const Post = require("./models/Post");

routes.get("/posts/:size", async (req, res) => {
  try {
    const size = parseInt(req.params.size) || 0;
    const posts = await Post.find()
      .sort({ createdAt: "desc" })
      .skip(size)
      .limit(12);

    return res.json(posts);
  } catch (error) {
    console.log("error happened");
    return res.send(error);
  }
});

routes.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
  try {
    const { originalname: name, size, key, location: url } = req.file;
    const post = await Post.create({
      name,
      size,
      key,
      url
    });
    return res.json(post);
  } catch (error) {
    return res.json(error);
  }
});

routes.delete("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    await post.remove();

    return res.send();
  } catch (error) {
    console.log("error happened");
    return res.send(error);
  }
});

module.exports = routes;
