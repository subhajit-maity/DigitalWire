const { application } = require("express");
const express = require("express");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config");
const {users } = require("../db");
const {Account}=require("../db");
const authMiddleware = require("./middleware");
const router=express.Router();


//signup
router.post('/signup',async (req,res)=>{

    var body=req.body;
    console.log(body);
    var username=body.username;
    var firstname=body.firstname;
    var lastname=body.lastname;
    var password=body.password;
    var email=body.email;
    
    const existingUser=await users.findOne({username:username,email:email});
    


    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        });
    }

    const user=await users.create({
        username:username,
        firstname:firstname,
        lastname:lastname,
        password:password,
        email:email
    });

    
    const userId = user._id;


    // create an account
    const amnt=Math.floor((Math.random()*10001));
     const accn=await Account.create({
        userId:userId,
        balance:amnt,
     });


     const token = jwt.sign({
        userId
    }, JWT_SECRET);


    res.status(200).json({
        message: "User created successfully",
        tokenid: "Bearer " + token,
    });
});


//signin
router.post('/signin',async (req,res)=>{
const username=req.body.username;
const password=req.body.password;
const email=req.body.email;

var userexist= await users.findOne({username:username,password:password});

if(userexist){
    const userId = userexist._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.status(200).json({
        token: `Bearer `+ token
    });
}else{
    res.status(411).json({
        message: "Error while logging in"
    });
}
});


//update
router.put('/',authMiddleware,async (req,res)=>{
    const newpassword=req.body.password;

    if(newpassword.length<=6){
        res.status(411).json({
            message: "Error while updating information"
        });
    }
    const result =  await users.updateOne({ _id: req.userId }, req.body);
    const updateduse= await users.findOne({_id:req.userId});
    console.log(updateduse);
    console.log(req.userId);

    res.json({
        message: "Updated successfully"
    }) 
});



router.get("/bulk",authMiddleware, async (req,res)=>{
const filter=req.query.filter || "";
console.log('----------------------');
console.log(filter);
console.log('----------------------');
var queryUsers;
try{
    queryUsers = await users.find({
    $or: [
        { firstname: { "$regex": filter } },
        { lastname: { "$regex": filter } }
    ]
});

}catch(err){
    res.status(400).json({message:"incorrect input"})
}


console.log(queryUsers);
if (!queryUsers) {
    console.error('Error occurred while querying users');
    return;
}



res.json({
    user: queryUsers.map(user => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id
    }))
})
});


module.exports =router;
