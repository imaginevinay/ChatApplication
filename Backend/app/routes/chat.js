const express = require('express');
const router = express.Router();
const chatController = require("./../../app/controllers/chatController");
const appConfig = require("./../../config/appConfig");
const auth = require('./../middlewares/authorization')
module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;
    // defining routes.

    
    // params: Group Name
    app.post(`${baseUrl}/createGroup`,auth.isAuthorized,chatController.createGroup);
         /**
     * @apiGroup Chat
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/createGroup api for Create Group.
     *
     * @apiParam {string} name Name of the Group. (body params) (required)
     * @apiParam {string} creator Name of the Group Creator. (body params) (required)
     * @apiParam {string} authToken Authorization Token of user. (query params) (required)
     
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {json} Success-Response:
        {
    "error": false,
    "message": "Chat Room created",
    "status": 200,
    "data": {
        "chatRoomId": "HyoGijIAM",
        "chatRoomName": "FunTime",
        "creator": "Anchal Nigam",
        "status": true,
        "createdOn": "2018-05-14T06:22:10.000Z",
        "ModifiedOn": "2018-05-14T06:22:10.000Z",
        "_id": "5af92b12da5e940688878b61",
        "__v": 0
    }
}
 @apiErrorExample {json} Error-Response:
    *
    {
    "error": true,
    "message": "Invalid Or Expired AuthorizationKey",
    "status": 404,
    "data": null
}
{
    "error": true,
    "message": "One or more parameter is missing",
    "status": 403,
    "data": null
}
    */
   

    app.get(`${baseUrl}/getChatRooms`,auth.isAuthorized,chatController.getGroup);
      /**
     * @apiGroup Chat
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/getChatRooms api for getting all Groups.
     
     * @apiParam {string} authToken Authorization Token of user. (query params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {json} Success-Response:
        {
    "error": false,
    "message": "All Group Chats Details Found",
    "status": 200,
    "data": [
        {
            "chatRoomId": "rJlamPICz",
            "chatRoomName": "Edit Testing ",
            "creator": "Anchal Nigam",
            "status": true,
            "createdOn": "2018-05-14T01:17:43.000Z",
            "ModifiedOn": "2018-05-14T01:17:43.000Z"
        },
        {
            "chatRoomId": "BypaQDLCf",
            "chatRoomName": "Testing Group2",
            "creator": "Anchal Nigam",
            "status": true,
            "createdOn": "2018-05-14T01:17:56.000Z",
            "ModifiedOn": "2018-05-14T01:17:56.000Z"
        }
        ]
}
 @apiErrorExample {json} Error-Response:
    *
    {
    "error": true,
    "message": "Invalid Or Expired AuthorizationKey",
    "status": 404,
    "data": null
}
{
    "error": true,
    "message": "No chat Room Found",
    "status": 404,
    "data": null
}
    */
 //This is for getting chats of specific room
   app.get(`${baseUrl}/chat/get/for/room`,auth.isAuthorized,chatController.getChats);
     /**
     * @apiGroup Chat
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/chat/get/for/room api for getting all Chats for specific Group.
     
     * @apiParam {string} authToken Authorization Token of user. (query params) (required)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {json} Success-Response:
        {
    "error": false,
    "message": "All Chats Listed",
    "status": 200,
    "data": [
        {
            "senderName": "Sakshi Nigam",
            "senderId": "r1uZaizRG",
            "receiverName": "Testing Group1",
            "receiverId": "rJlamPICz",
            "message": "hello evry1!",
            "chatId": "Sk6UCqURG",
            "createdOn": "2018-05-14T05:27:48.903Z",
            "modifiedOn": "2018-05-14T05:27:51.034Z"
        },
        {
            "senderName": "Anchal Nigam",
            "senderId": "r1_rDWlRM",
            "receiverName": "Edit Testing ",
            "receiverId": "rJlamPICz",
            "message": "kse ho??",
            "chatId": "ryqKAqUCf",
            "createdOn": "2018-05-14T05:28:34.331Z",
            "modifiedOn": "2018-05-14T05:28:36.344Z"
        }
    ]
}
 @apiErrorExample {json} Error-Response:
    *
    {
    "error": true,
    "message": "Invalid Or Expired AuthorizationKey",
    "status": 404,
    "data": null
}
{
    "error": true,
    "message": "No chat Found",
    "status": 404,
    "data": null
}
    */
   app.post(`${baseUrl}/share`,auth.isAuthorized,chatController.shareLink);

   /**
     * @apiGroup Chat
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/share api for Sharing your Group via email.
     *
     *  @apiParam {string} authToken Authorization Token of user. (query params) (required)
     * @apiParam {string} email Email of the user to whom you want to share your Group link. (body params) (required)
     * @apiParam {string} chatRoomId Id of Room . (body params) (required)
       @apiParam {string} chatRoomName Name of Room . (body params) (required)
     
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {json} Success-Response:
        {
    "error": false,
    "message": "Mail Sent Successful",
    "status": 200,
    "data": null
}
 @apiErrorExample {json} Error-Response:
    *
    {
    "error": true,
    "message": "Invalid Or Expired AuthorizationKey",
    "status": 404,
    "data": null
}
{
    "error": true,
    "message": "Server Error!Sent Mail Failed.",
    "status": 500,
    "data": null
}
    */

   app.put(`${baseUrl}/:chatRoomId/editGroup`, auth.isAuthorized,chatController.editGroup);
   /**
     * @apiGroup Chat
     * @apiVersion  1.0.0
     * @api {put} /api/v1/users/:chatRoomId/editGroup api for Editing Group.
     *
     *  @apiParam {string} authToken Authorization Token of user. (query params) (required)
     *  @apiParam {string} name Name of the Group. (body params) (required)
     *  @apiParam {string} chatRoomId Id of the Group. (Pass in url) (required)
     * 
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {json} Success-Response:
          {
    "error": false,
    "message": "Updated successfully!",
    "status": 200,
    "data": {
        "chatRoomId": "By5izz8CG",
        "chatRoomName": "Edit Group",
        "creator": "Anchal Nigam",
        "status": false,
        "createdOn": "2018-05-13T19:31:45.000Z",
        "ModifiedOn": "2018-05-13T19:31:45.000Z",
        "_id": "5af892a19162322b9828e0cb",
        "__v": 0
    }
}
  
     @apiErrorExample {json} Error-Response:
     *
     * {
    "error": true,
    "message": "No Chat Room Found!",
    "status": 404,
    "data": null
}
    {
    "error": true,
    "message": "Invalid Or Expired AuthorizationKey",
    "status": 404,
    "data": null
}
    */

   app.post(`${baseUrl}/:chatRoomId/deleteGroup`,auth.isAuthorized, chatController.deleteGroup);
    /**
     * @apiGroup Chat
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/:chatRoomId/deleteGroup api for Deleting Group.
     *
     * 
     *  @apiParam {string} authToken Authorization Token of user. (query params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {json} Success-Response:
         {
    "error": false,
    "message": "Deleted the chatRoom successfully",
    "status": 200,
    "data": null
}
  
     @apiErrorExample {json} Error-Response:
     {
    "error": true,
    "message": "No ChatRoom Found",
    "status": 404,
    "data": null
}
    {
    "error": true,
    "message": "Invalid Or Expired AuthorizationKey",
    "status": 404,
    "data": null
}
    */

   app.put(`${baseUrl}/:chatRoomId/markAsClose`, auth.isAuthorized,chatController.close);
   /**
     * @apiGroup Chat
     * @apiVersion  1.0.0
     * @api {put} /api/v1/users/:chatRoomId/markAsClose api for Closing Group.
     *
     *  @apiParam {string} authToken Authorization Token of user. (query params) (required)
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {json} Success-Response:
          {
    "error": false,
    "message": "Chat Room has been marked as close",
    "status": 200,
    "data": null
}
     @apiErrorExample {json} Error-Response:
     *
     * {
    "error": true,
    "message": "No Chat Room Found!",
    "status": 404,
    "data": null
}
    {
    "error": true,
    "message": "Invalid Or Expired AuthorizationKey",
    "status": 404,
    "data": null
}
    */


}//end


