// calling the module 
var express = require('express');

//creating an instance 
var app = express();

// we have to include events module - core nodejs 
var events = require('events');

// you have create an instance of event emitter
var eventEmitter = new events.EventEmitter();

//for sending mails
var nodemailer = require('nodemailer');

eventEmitter.on('WelcomeEmail',(data)=>{
    console.log(data)
    
 var transporter = nodemailer.createTransport({
     service: 'Gmail',
     auth: {
            user: 'saknigam12@gmail.com',
            pass: 'sakanchal1295@'
        }
    });


const mailOptions = {
 from: 'saknigam12@email.com', // sender address
 to: data.email, // list of receivers
 subject: 'Please confirm your Email account', // Subject line
 text: `Hi! ${data.name},
 Please Click on the link to verify your email.`,// plain text body
 html:'<a href="http://localhost:4200/verify/'+data.hash+'">http://localhost:4200/'+data.hash+'</a>'
};
console.log(mailOptions)
transporter.sendMail(mailOptions, function (err, info) {
 if(err){
   console.log(err)
   
 }
 else{
   console.log(info);
   
 }
});
});

exports.emitter=eventEmitter;