const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
var btoa = require('btoa');
const token = require('../libs/tokenLib')
const AuthModel = mongoose.model('Auth')
//for sending mails
var nodemailer = require('nodemailer');
/* Models */
const chatRoomModel = mongoose.model('chatRoom');

const ChatModel = mongoose.model('Chat')

let createGroup=(req,res)=>{
    let RoomCreation=()=>{
        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.name) || check.isEmpty(req.body.creator)) {

                
                let apiResponse = response.generate(true, 'One or more parameter is missing', 403, null)
                res.send(apiResponse)
            }
            else{
                let newRoom = new chatRoomModel({
                    chatRoomId: shortid.generate(),
                    chatRoomName:req.body.name,
                    creator:req.body.creator,
                    

                    createdOn: time.now(),
                    ModifiedOn:time.now()
                });
               
                newRoom.save((err, newRoom) => {
                    if (err) {
                        console.log(err)
                        logger.error(err.message, 'chatController: createGroup', 10)
                        let apiResponse = response.generate(true, 'Failed to create new Group', 500, null)
                        reject(apiResponse)
                    } else {
                        let newRoomObj = newRoom.toObject();
                        newRoomObj.creatorId=req.body.creatorId;
                        resolve(newRoomObj)
                    }
                })
            }//else part end

        });

    }//end room creation

    

    RoomCreation()
    
    .then((resolve) => {
        delete resolve.creatorId
        
        let apiResponse = response.generate(false, 'Chat Room created', 200, resolve)
        res.send(apiResponse)
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    })

}//end

//get chat rooms
let getGroup=(req,res)=>{
    chatRoomModel.find({'status':true})
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'chat Controller: getGroup', 10)
                let apiResponse = response.generate(true, 'Failed To Find Groups Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No chatRoom Found', 'Chat Controller: getGroup')
                let apiResponse = response.generate(true, 'No chatRoom Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Group Chats Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}
//end get chat rooms

//get chats
let getChats=(req,res)=>{
    // function to validate params.
  let validateParams = () => {
    return new Promise((resolve, reject) => {
      if (check.isEmpty(req.query.receiverId)) {
        logger.info('parameters missing', 'chat controller : getChats', 9)
        let apiResponse = response.generate(true, 'parameters missing.', 403, null)
        reject(apiResponse)
      } else {
        resolve()
      }
    })
  } // end of the validateParams function.

  // function to get chats.
  let findChats = () => {
    return new Promise((resolve, reject) => {
      // creating find query.
      let findQuery = {'receiverId':req.query.receiverId};  //here recvr is room which is recving all chats
    
      ChatModel.find(findQuery)
        .select('-_id -__v ')
        
         .limit(10)
        .skip(parseInt(req.query.skip) || 0)
        .lean()
       
        .exec((err, result) => {
          if (err) {
            console.log(err)
            logger.error(err.message, 'Chat Controller: getChats', 10)
            let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
            reject(apiResponse)
          } else if (check.isEmpty(result)) {
            logger.info('No Chat Found', 'Chat Controller: getChats')
            let apiResponse = response.generate(true, 'No Chat Found', 404, null)
            reject(apiResponse)
          } else {
            console.log('chat found and listed.')


            resolve(result)
          }
        })
    })
  } // end of the findChats function.
  // making promise call.
  validateParams()
    .then(findChats)
    .then((result) => {
      let apiResponse = response.generate(false, 'All Chats Listed', 200, result)
      res.send(apiResponse)
    })
    .catch((error) => {
      res.send(error)
    })
}//end get chats

//method to share a group link
let shareLink=(req,res)=>{
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
               user: 'saknigam12@gmail.com',
               pass: 'sakanchal1295@'
           }
       });
     
   let secretKey="mychoiceypassword";
   let emailEncrypt=btoa(req.body.email+secretKey);
   
   const mailOptions = {
    from: 'saknigam12@email.com', // sender address
    to: req.body.email, // list of receivers
    subject: 'Let\'s Chat', // Subject line
    html: "<p>Hi!,<br/>Let\'s connect with each other via EdChat.<a href='http://localhost:4200/chat/"+req.body.chatRoomId+"/"+req.body.chatRoomName+"'>Click here</a> to Join!</p>"
   
   };
   console.log(mailOptions)
   transporter.sendMail(mailOptions, function (err, info) {
    if(err){
      console.log(err);
      logger.error('Sent Mail Failed!', 'User Controller: forgotPassword', 10)
      let apiResponse = response.generate(true, 'Server Error!Sent Mail Failed.', 500, null)
      res.send(apiResponse)

      
    }
    else{
      console.log(info);
      logger.error('Mail Sent Successful!', 'User Controller: forgotPassword', 10)
        let apiResponse = response.generate(false, 'Mail Sent Successful!', 200, null)
        res.send(apiResponse)
    }
   });
}//end

let editGroup= (req, res) => {
    if (check.isEmpty(req.params.chatRoomId)) {

        console.log('Chat Room Id should be passed')
        let apiResponse = response.generate(true, 'Chat Room Id Id is missing', 403, null)
        res.send(apiResponse)
    }
    else{
        
        chatRoomModel.findOne({ 'chatRoomId': req.params.chatRoomId })
        .exec((err,result)=>{

            if(err){
                console.log(err)
                logger.error(err.message, 'chat Controller: editGroup', 10)
                let apiResponse=response.generate(true,"Error Occured!",500,null);
                res.send(apiResponse)
            }
            else if (check.isEmpty(result)) {
                console.log('No Chat Room Found')
                logger.info('No Chat Room Found', 'Chat Controller: editChat',5)
                let apiResponse=response.generate(true,"No Chat Room Found!",404,null);
                res.send(apiResponse)
               
            }
            else{
                result.chatRoomName=req.body.name;
                result.save((error,resul)=>{
                    if (error) {
                        console.log(error)
                        logger.error(err.message, 'Chat Controller: editChat', 10)
                        let apiResponse=response.generate(true,"Error Occured!",500,null);
                        res.send(apiResponse)
                    }
                    else {
                        console.log("Edited successfully")
                        logger.info(' Updated Successfully!', 'User Controller: editUser',5)
                        let apiResponse=response.generate(false,"Updated successfully!",200,resul);
                        res.send(apiResponse)
    
                    }
                });
            }

        });
    }
}//edit functionn end

//Delete user
let deleteGroup = (req, res) => {
    if (check.isEmpty(req.params.chatRoomId)) {

        console.log('Chat Room Id should be passed')
        let apiResponse = response.generate(true, 'Chat Room Id is missing', 403, null)
        res.send(apiResponse)
    }
    else{
    chatRoomModel.remove({ 'chatRoomId': req.params.chatRoomId })
    .exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'Chat Controller: deleteGroup', 10)
            let apiResponse = response.generate(true, 'Failed To delete ChatRoom', 500, null)
            res.send(apiResponse)
        } else if (result.n == 0) {
            logger.info('No ChatRoom Found', 'Chat Controller: deleteGroup')
            let apiResponse = response.generate(true, 'No ChatRoom Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Deleted the chatRoom successfully', 200, null)
            res.send(apiResponse)
        }
    });// end user model find and remove

    }
}//end delete function

//close a room method
let close=(req,res)=>{
    // function to validate params.
    let validateParams = () => {
        return new Promise((resolve, reject) => {
          if (check.isEmpty(req.params.chatRoomId)) {
            logger.info('parameter missing', 'close', 9)
            let apiResponse = response.generate(true, 'parameter missing.', 403, null)
            reject(apiResponse)
          } else {
            resolve()
          }
        })
      } // end of the validateParams function.
    
      // function to mark chat as seen.
      let modifyChatRoom = () => {
        return new Promise((resolve, reject) => {
          let findQuery = {
            chatRoomId: req.params.chatRoomId
          }
    
          let updateQuery = {
             status:false
          }
    
          chatRoomModel.update(findQuery, updateQuery, {multi: true})
          .exec((err, result) => {
            if (err) {
              console.log(err)
              logger.error(err.message, 'Chat Controller: Close', 10)
              let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
              reject(apiResponse)
            } else if (result.n === 0) {
              logger.info('No Chat Room Found', 'Chat Controller: Close')
              let apiResponse = response.generate(true, 'No Chat Room Found', 404, null)
              reject(apiResponse)
            } else {
              console.log('Chat Room found and updated.')
    
              resolve(result)
            }
          })
        })
      } // end of the modifyChat function.
    
      // making promise call.
      validateParams()
        .then(modifyChatRoom)
        .then((result) => {
          let apiResponse = response.generate(false, 'Chat Room has been marked as close', 200, null)
          res.send(apiResponse)
        })
        .catch((error) => {
          res.send(error)
        })

}//end

module.exports={
    createGroup:createGroup,
    getGroup:getGroup,
    getChats:getChats,
    shareLink:shareLink,
    editGroup:editGroup,
    deleteGroup:deleteGroup,
    close:close
}
