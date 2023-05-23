const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const upload = require("../uploader");
// register user
router.post("/register", upload.single("profilePic"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json("No file uploaded");
    }
    if (!req.body.username) {
      return res.status(400).json("Username is required");
    }
    if (!req.body.email) {
      return res.status(400).json("Email is required");
    }
    if (!req.body.password) {
      return res.status(400).json("Password is required");
    }
    if (
      await User.findOne({ email: req.body.email, username: req.body.username })
    ) {
      return res.status(400).json("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
      profilePic: req.file.filename,
    });
    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = User.findOne({ username: req.body.username });
    !user && res.status(400).json("wrong credentials");
    const validated = await bcrypt.compare(re.body.password, user.password);

    !validated & res.status(400).json("wrong credentials");
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
