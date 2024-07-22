const { application } = require("express");
const express = require("express");
const { JWT_SECRET } = require("../config"); 
const {users } = require("../db"); 
const jwt = require('jsonwebtoken');

const authMiddleware=(async (req,res,next)=>{

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log("-----------------------767726------");

  if (!token) {
    return res.sendStatus(401);
  }

  const decoded= jwt.verify(token,JWT_SECRET);
  req.userId=decoded.userId;
  const user=await users.findOne({_id:req.userId});
  req.username=user.username;
  next();
});

module.exports=authMiddleware;