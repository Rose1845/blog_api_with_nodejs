const express=require('express')
const PORT=5000
const app=express()
app.use(express.json())
const dotenv=require('dotenv')
dotenv.config()
const mongoose=require('mongoose')
const authRoute=require("./routes/auth")
const usersRoutes=require("./routes/users")
const postRoutes=require("./routes/posts")
const categoryRoutes=require("./routes/categories")

const multer=require("multer")

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },filename:(req,file,cb)=>{
        cb(null,"gello");
    },
})
const upload=multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded")
})
// conectio to db
mongoose.connect(process.env.MONGO_URL,{

    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true
}).then(console.log("connected to db"))
.catch((err)=>console.log(err))

app.use("/api/auth",authRoute)
app.use("/api/users",usersRoutes)
app.use("/api/posts",postRoutes)
app.use("/api/category",categoryRoutes)
app.listen(PORT,()=>{
    console.log(`server runing on port ${PORT}`);
})