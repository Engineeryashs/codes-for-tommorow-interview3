function calculateBilling(totalUsage,quota,extraChargePerUnit){
    let extraUnits=0;
    let extraCharges=0;
    if(totalUsage>quota)
    {
        extraUnits=totalUsage-quota;
        extraCharges=extraUnits*extraChargePerUnit;
    }
    return {
        extraUnits,
        extraCharges:Number(extraCharges.toFixed(2)),
    };
}
module.exports=calculateBilling;