//imprt modules
const socketio=require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('./loggerLib.js');
const tokenLib = require("./tokenLib.js");
const check = require("./checkLib.js");
const response = require('./responseLib')

const events=require('events');
const eventEmitter = new events.EventEmitter();
/* Model */
const ChatModel = mongoose.model('Chat');
/* end chat model */

//my server where initialization of socket.io takes place and events driven functionality present
let setServer=(server)=>{
    let allOnlineUsers=[];
    let io = socketio.listen(server);
    
    let myIo = io.of('')
    myIo.on('connection',(socket)=>{
        console.log(`connection takes place--next to verify user`);
        //emiting event to verify user
       socket.emit('verifyUser',"");
       //listening setuser event for verifying user
       socket.on('setUser',(authToken)=>{
        console.log("set-user called");
        tokenLib.verifyClaimWithoutSecret(authToken,(err,user)=>{
            if(err){
                console.log('authentication error');
            }
            else{
                console.log("user is verified..setting details");
                let currentUser = user.data;
                
                // setting socket user id 
                socket.userId = currentUser.userId
                let fullName = `${currentUser.firstName} ${currentUser.lastName}`
               
                let userObj = {userId:currentUser.userId,fullName:fullName}
                allOnlineUsers.push(userObj)
                allOnlineUsers=allOnlineUsers.filter((val,index)=>{
                    return allOnlineUsers.indexOf(val)==index;
                });
               
                console.log(allOnlineUsers);
                 // setting room name
                 socket.room = 'edChat'
                 // joining chat-group room.
                 socket.join(socket.room)
                 myIo.emit('online-user-list',allOnlineUsers);

             
            }
        });

       });
       
       //Join a room
       socket.on('joinRoom',(data)=>{
          socket.room=data.roomId;
          socket.join(socket.room,()=>{
              console.log('joined room '+data.roomId);
              myIo.to(data.roomId).emit('setJoinedRoom',data);
          });

       });//end join a room

       // message for room
       socket.on('room-msg',chatMessage=>{
        console.log(chatMessage);
        chatMessage.chatId=shortid.generate();
        setTimeout(()=>{
            eventEmitter.emit('chat-save',chatMessage);
        },2000);
        socket.to(chatMessage.receiverId).broadcast.emit('receiveMsg',chatMessage);
        
   });  // end message for room

   //typing event listening
   socket.on('typing', (data) => {
    
    console.log(data)
       
    socket.to(data.roomId).broadcast.emit('userTyping',(data));
    

   });//end typing ever listening

       //disconnect socket
       socket.on('disconnection', () => {
        // disconnect the user from socket
        // remove the user from online list
        // unsubscribe the user from his own channel

        console.log("user is disconnected");
        // console.log(socket.connectorName);
        console.log(socket.userId);


        var removeIndex = allOnlineUsers.map(function(user) { return user.userId; }).indexOf(socket.userId);
        allOnlineUsers.splice(removeIndex,1)
        console.log(allOnlineUsers)

        myIo.emit('online-user-list',allOnlineUsers);
        socket.leave(socket.room)
        socket.disconnect(0);
    }) // end of on disconnect

    //disconnect socket
    socket.on('disconnect', () => {
        // disconnect the user from socket
        // remove the user from online list
        // unsubscribe the user from his own channel

        console.log("user is disconnected");
        // console.log(socket.connectorName);
        console.log(socket.userId);


        var removeIndex = allOnlineUsers.map(function(user) { return user.userId; }).indexOf(socket.userId);
        allOnlineUsers.splice(removeIndex,1)
        console.log(allOnlineUsers)

        myIo.emit('online-user-list',allOnlineUsers);
        socket.leave(socket.room)
        socket.disconnect(0);
    }) // end of on disconnect




    });


}//end function

//saving chat
eventEmitter.on('chat-save',(data)=>{
    let newChat = new ChatModel({

        chatId: data.chatId,
        senderName: data.senderName,
        senderId: data.senderId,
        receiverName: data.receiverName || '',
        receiverId: data.receiverId || '',
        message: data.message,
        
        createdOn: data.createdOn

    });
    newChat.save((err,result) => {
        if(err){
            console.log(`error occurred: ${err}`);
        }
        else if (check.isEmpty(result)){
            console.log("Chat Is Not Saved.");
        }
        else {
            console.log("Chat Saved.");
            console.log(result);
        }
    });
}); //end saving chat

module.exports={
    setServer:setServer
  }