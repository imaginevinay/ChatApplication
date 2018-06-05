const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")

const hash = require("./../middlewares/hash")

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    // defining routes.

    
    // params: firstName, lastName, email, mobileNumber, password
     app.post(`${baseUrl}/signup`, hash.hash,userController.signUpFunction); 
     /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/signup api for Signup.
     *
     * @apiParam {string} firstName First Name of the user. (body params) (required)
     * @apiParam {string} lastName  Last Name of the user. (body params) (required)
     * @apiParam {string} email     Email of the user. (body params) (required)
     * @apiParam {string} password  Password of the user. (body params) (required)
     * @apiParam {string} mobileNumber  Mobile Number of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {json} Success-Response:
        {
    "error": false,
    "message": "User created",
    "status": 200,
    "data": {
        "userId": "rkWlVp1RM",
        "firstName": "Anchal",
        "lastName": "Nigam",
        "email": "anchalnigamm@gmail.com",
        "mobileNumber": 9026224948,
        "hash": "8ug67ar1zoyrndloe73ztai17xa4jafi",
        "active": false,
        "createdOn": "2018-05-09T00:42:17.000Z",
        "_id": "5af243e929485a1718f18c53",
        "__v": 0
    }
}
    */
   

    // params: email, password.
    app.post(`${baseUrl}/login`, userController.loginFunction);
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for user login.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {json} Success-Response:
          {
    "error": false,
    "message": "Login Successful",
    "status": 200,
    "data": {
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkhKUkJHMGxSZiIsImlhdCI6MTUyNTg5NTc1MDM4OSwiZXhwIjoxNTI1OTgyMTUwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZHdpc29yQ2hhdCIsImRhdGEiOnsidXNlcklkIjoicjFfckRXbFJNIiwiZmlyc3ROYW1lIjoiQW5jaGFsIiwibGFzdE5hbWUiOiJOaWdhbSIsImVtYWlsIjoiYW5jaGFsbmlnYW1tQGdtYWlsLmNvbSIsIm1vYmlsZU51bWJlciI6OTAyNjIyNDk0OCwiaGFzaCI6IjRxYnhva2o5amQ4NDB1N2wzNmRpd3MwMzNkYmI4ZmJyN3EiLCJhY3RpdmUiOnRydWV9fQ.uTIKh4NeWvWPR0ImzA7Ad-JpJGIiMesjjXYJjh0TWoo",
        "userDetails": {
            "userId": "r1_rDWlRM",
            "firstName": "Anchal",
            "lastName": "Nigam",
            "email": "anchalnigamm@gmail.com",
            "mobileNumber": 9026224948,
            "hash": "4qbxokj9jd840u7l36diws033dbb8fbr7q",
            "active": true
        }
    }
}
  
     @apiErrorExample {json} Error-Response:
    *
    * {
    "error": true,
    "message": "User has not Verified!",
    "status": 400,
    "data": null
}
{
    "error": true,
    "message": "Wrong Password!Login Failed",
    "status": 400,
    "data": null
}
    */

    
   app.put(`${baseUrl}/verifyEmail`, userController.verifyEmail);
    /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {put} /api/v1/users/verifyEmail api for verifying Email.
     *
     * @apiParam {string} hash hash which is provided in email link. (body params) (required)
     * 
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {json} Success-Response:
          {
    "error": false,
    "message": "User Verified Successfully",
    "status": 200,
    "data": {
        
        "userId": "rkWlVp1RM",
        "firstName": "Anchal",
        "lastName": "Nigam",
        "email": "anchalnigamm@gmail.com",
        "mobileNumber": 9026224948,
        "hash": "8ug67ar1zoyrndloe73ztai17xa4jafi",
        "active": true,      
        "createdOn": "2018-05-09T00:42:17.000Z",
        "_id": "5af243e929485a1718f18c53",
        "__v": 0
    
        
    }
}
  
     @apiErrorExample {json} Error-Response:
    *
    * {
    "error": true,
    "message": "Hash is missing",
    "status": 403,
    "data": null
}
{
    "error": true,
    "message": "User Not found",
    "status": 404,
    "data": null
}
    */


   
   app.post(`${baseUrl}/forgotPassword`,userController.forgotPassword);
   /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/forgotPassword api for sending mail for password change.
     *
     * @apiParam {string} email Email of the user. (body params) (required)
     * 
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {json} Success-Response:
          {
    "error": false,
    "message": "Mail Sent Successful!",
    "status": 200,
    "data": null
}
  
     @apiErrorExample {json} Error-Response:
    *
    * {
    "error": true,
    "message": "Server Error!Sent Mail Failed.",
    "status": 500,
    "data": null
}

    */



   app.put(`${baseUrl}/resetPassword`,userController.resetPassword);
   /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {put} /api/v1/users/resetPassword api for resetting password.
     *
     * @apiParam {string} email Email of the user which is provided at email link by encrypting using btoa. (body params) (required)
     *  @apiParam {string} password password of the user. (body params) (required)
     * 
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {json} Success-Response:
          {
    "error": false,
    "message": "Password changed successfully!",
    "status": 200,
    "data": {
        "userId": "r1_rDWlRM",
        "firstName": "Anchal",
        "lastName": "Nigam",
        "password": "$2a$10$vbpX8zsNdvVwWDQyrO9KVux7N6HuQqnN2dgBRjD3MIb3AMYbukSQW",
        "email": "anchalnigamm@gmail.com",
        "mobileNumber": 9026224948,
        "hash": "4qbxokj9jd840u7l36diws033dbb8fbr7q",
        "active": true,
        "createdOn": "2018-05-09T05:29:36.000Z",
        "_id": "5af28740b7d71526585e5125",
        "__v": 0
    }
}
  
     @apiErrorExample {json} Error-Response:
    *
    * {
    "error": true,
    "message": "One or more parameter is missing",
    "status": 403,
    "data": null
}
{
    "error": true,
    "message": "Error Occured!",
    "status": 500,
    "data": null
}

    */


//This is all for checking purpose
   app.get(`${baseUrl}/view/all`, userController.getAllUser);


   app.put(`${baseUrl}/:userId/edit`, userController.editUser);

   app.post(`${baseUrl}/:userId/delete`, userController.deleteUser);
//end 

   
    app.post(`${baseUrl}/logout`, userController.logout);
   /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/logout to logout user.
     *
     * @apiParam {string} authToken Auth Token of the user. (auth headers) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Logged Out Successfully",
            "status": 200,
            "data": null

        }
        @apiErrorExample {json} Error-Response:
    *
    * {
    "error": true,
    "message": "Already Logged Out or Invalid UserId",
    "status": 404,
    "data": null
}
{
    "error": true,
    "message": "Error Occured!",
    "status": 500,
    "data": null
}
    */




}
