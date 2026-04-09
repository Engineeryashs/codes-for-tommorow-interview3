const express=require("express");
const mainRouter=require("./routers/mainRouter");
const app=express();
app.use(express.json());
require("dotenv").config();
app.use("/app/v1",mainRouter);
const port=3000||process.env.PORT;

app.get("/",(req,res)=>{
res.send("Hello bhaiya I am server running on your port")
})

app.listen(port,()=>{
    console.log(`Server is running on the port ${port}`)
})