const express=require("express");
const router=express.Router();

const pool=require("../db/db");

router.post("/usage",async (req,res)=>{
try {
    const {userId,action,usedUnits}=req.body;
    const result=await pool.query(`INSERT INTO usage_records(userId,action,usedUnits) VALUES($1 $2 $3) RETURNING *`,[userId,action,usedUnits]);
    console.log(result);
    res.json({
        msg:"Succesfuly sent",
        data:result.rows[0]
    });
} catch (error) {
    console.log(error);
    res.status(500).json({
        message:"Server Error"
    })
}
})

module.exports=router;