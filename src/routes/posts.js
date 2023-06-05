const router = require("express").Router();
const Post = require("../models/Post");
const upload = require("../uploader");

//create a post
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json("No file uploaded");
    }
    if (!req.body.title) {
      return res.status(400).json("Title is required");
    }
    if (!req.body.desc) {
      return res.status(400).json("Description is required");
    }
    if (!req.body.username) {
      return res.status(400).json("Username is required");
    }
    if (!req.body.categories) {
      return res.status(400).json("Categories is required");
    }
   if(await Post.findOne({title:req.body.title})){
        return res.status(400).json("Title already exists");
    }
    const savePost = await Post.create({
      ...req.body,
      photo: req.file.filename,
    });
    return res.status(200).json(savePost);
  } catch (err) {
    return res.status(500).json(err);
  }
});
//update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatePost = await Post.findByIdAndUpdate(
          req.params.is,
          {
            $set: req.body,
          },
          { new: true }
        );
        return res.status(200).json(updatePost);
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(401).json("You can only update your post");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});
//delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await Post.delete();
        return res.status(200).json("post deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can aonly delete your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json(err);
  }
});
//get all post
router.get("/", async (req, res) => {
  const username = req.query.username;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);

    return res.status(404).json(err);
  }
});
module.exports = router;
