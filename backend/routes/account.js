const express=require("express");
const { Account } = require("../db");
const authMiddleware = require("./middleware");
const router = express.Router();
const mongoose = require('mongoose');


//getting balance
router.get('/balance',authMiddleware,async (req,res)=>{

    const accn=await Account.findOne({
        userId:req.userId
    });

    if(accn){
        res.status(200).json({
            balance:accn.balance,
            username:req.username
        });
    }else{
        res.status(401).json({
            message:"Sorry some error occurred",
        });

    }   
});




//transfer
router.post('/transfer',authMiddleware, async (req,res)=>{

    const { amount, to } = req.body;

    
    console.log(amount);

    // Fetch the accounts within the transaction
    try{
        const account = await Account.findOne({ userId: req.userId });

        if (!account || account.balance < amount) {
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }
    
        const toAccount = await Account.findOne({ userId: to });
    
        if (!toAccount) {
            return res.status(400).json({
                message: "Invalid account"
            });
        }
    
        // Perform the transfer
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } });
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } });
        res.json({
            message: "Transfer successful"
        });
    

    }catch(e){
        console.log(e);
        res.json({
            message:"Sorry some error occurred"
        });
    }
    
   

    

});

module.exports=router;
