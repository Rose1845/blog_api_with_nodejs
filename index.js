const express = require("express");
// cors is used to allow cross origin resource sharing
const cors = require("cors");
const morgan = require("morgan");
const authRoute = require("./routes/auth");
const usersRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const categoryRoutes = require("./routes/categories");


const PORT = 8000;
const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "Access-Control-Request-Method",
      "Access-Control-Request-Headers",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Methods",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Credentials",
      "enctype",
    ],
    exposedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "Access-Control-Request-Method",
      "Access-Control-Request-Headers",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Methods",
      "Access-Control-allow-Credentials",
      "enctype",
    ],
    preflightContinue: false,
  })
);


// app.post("/api/upload", upload.single("file"), (req, res) => {
//   res.status(200).json("File has been uploaded");
// });
app.use(express.static("images"));
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/category", categoryRoutes);
app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`);
});
