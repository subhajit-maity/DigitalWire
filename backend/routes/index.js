const express = require("express");

const userrouter=require('./user.js');
const accountrouter=require('./account.js');

const router=express.Router();
router.use('/user',userrouter);
router.use('/account',accountrouter);


module.exports =router;
