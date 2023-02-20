const express= require('express');
const {connection} =require("./configs/db");
const { postRoute } = require('./routes/post.route');
const { userRoute } = require('./routes/user.route');
const {authentication}=require('./middlewares/auth');

require("dotenv").config()
const app = express();

app.use(express.json());
app.use("/users", userRoute)
app.use(authentication)
app.use("/posts", postRoute)
app.get("/", (req, res) => {
    res.send("Home page")
})

app.listen(process.env.port, async()=>{
        try{
            await connection
            console.log("database connection established")
            console.log("server listening on port 5000")
        }catch(err){
            console.log("some errr in connection")
        }
   
})