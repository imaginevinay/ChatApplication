// calling the module 
var express = require('express');

//creating an instance 
var app = express();

let hash=(req,res,next)=>{
    let hash=Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    + Math.random().toString(36).substring(2, 15);
    req.hash=hash;
    next();
}//end hash

module.exports={
    hash:hash
}