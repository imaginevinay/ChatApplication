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
    
    let transporter = nodemailer.createTransport({
        host: 'in-v3.mailjet.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: '3f95879a671b565f0abbea1a7f2f79f1', // generated ethereal user
            pass:'bd05b13b6fa36c8441f975297ad6b9cc' // generated ethereal password
        },
        tls : {
            rejectUnauthorised : false
        }
    });


const mailOptions = {
 from: '"Edwisor Chat App" <vinay.varshney28@gmail.com>', // sender address
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