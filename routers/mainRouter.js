const express=require("express");
const router=express.Router();
const useageRouter=require("./useageRouter")
const userRouter=require("./userRouter")
router.get("/",(req,res)=>{
res.send("Hello bhaiya I am server running on your port")
})

router.use("/userage",useageRouter);
router.use("/user",userRouter);

module.exports=router;