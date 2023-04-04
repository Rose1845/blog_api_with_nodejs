const router = require("express").Router();
const Post = require("../models/Post");
// update
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (err) {
    res.status(500).json(err);
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
            res.status(200).json(updatePost)
          } catch(err) {
            res.status(500).json(err)

          }
        }else{
            res.status(401).json("You can aonly update your post")
        }
      } catch (err) {
        res.status(500).json(err);
      }
    
  
});
//delete a post
router.delete("/:id", async (req, res) => {
      
    try {
      const post = await Post.findById(req.params.id);
      if (post.username === req.body.username) {
        try {
         await Post.delete()
          res.status(200).json("post deleted")
        } catch(err) {
          res.status(500).json(err)

        }
      }else{
          res.status(401).json("You can aonly delete your post")
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
    const username=req.query
    const catName=req.query.cat
    try {
      let posts;
      if(username){
        posts=await Post.find({username})
      }else if(catName){
        posts=await Post.find({categories:{
            $in:[catName]
        }})
      }else{
        posts=await Post.find()
      }
      res.status(200).json(posts)
    } catch (err) {
      res.status(404).json(err);
    }
  });
module.exports = router;
