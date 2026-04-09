const express=require("express");
const calculateBilling = require("../utils/billing");
const router=express.Router();
const pool=require("../db/db");
router.get("/users/:id/current-usage",async(req,res)=>{
try {
    const userId=req.params.id;
    const usageResult=await pool.query(`SELECT COALESCE(SUM(usedUnits),0) AS total FROM usage_records WHERE userId=$1 AND DATE_TRUNC('month',createdAt)=DATE_TRUNC('month',CURRENT_DATE)`,[userId]);
    console.log(usageResult);
    const planResult=await pool.query(`SELECT p.* FROM subscriptions s JOIN plans p ON s.planId=p.id WHERE s.userId=$1 AND s.isActive=true`,[userId]);
    console.log(planResult);
    const totalUsed=Number(usageResult.rows[0].total);
    const plan=planResult.rows[0];
    res.json({
        totalUsed:totalUsed,
        plan:plan,
        remainingUnits:plan.monthlyQuota-totalUsed
    })
} catch (error) {
    console.log(error);
    res.status(500).json({
        error:error,
        msg:"Internal Server Error"
    })
}
})

router.get("/users/:id/billing-summary",async(req,res)=>{
    try {
        const userId=req.params.id;
            const usageResult=await pool.query(`SELECT COALESCE(SUM(usedUnits),0) AS total FROM usage_records WHERE userId=$1 AND DATE_TRUNC('month',createdAt)=DATE_TRUNC('month',CURRENT_DATE)`,[userId]);
            const planResult=await pool.query(`SELECT p.* FROM subscriptions s JOIN plans p ON s.planId=p.id WHERE s.userId=$1 AND s.isActive=true`,[userId]);
            const totalUsage=Number(usageResult.rows[0].total);
            const plan=planResult.rows[0];
             console.log("Hello world bhaiya i am debugger aapka data agaya hai");
            console.log(plan,totalUsage);
            const billing=calculateBilling(totalUsage,plan.monthlyQuota,plan.extraChargePerUnit);
            console.log(" Aapka Billing calculate horha hai");
            console.log(billing);
            res.json({
                msg:"Success",
                totalUsage:totalUsage,
                planQuota:plan.monthlyQuota,
                extraUnits:billing.extraUnits,
                extraCharges:billing.extraCharges,
                plan:plan
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Internal Server Error"
        })
    }
})

module.exports=router;