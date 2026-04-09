const express=require("express");
const router=express.Router();
const useageRouter=require("./useageRouter")
const userRouter=require("./userRouter")
router.use("/userage",useageRouter);
router.use("/user",userRouter);

module.exports=router;