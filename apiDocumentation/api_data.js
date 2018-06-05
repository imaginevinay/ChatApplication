define({ "api": [
  {
    "group": "Chat",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/chat/get/for/room",
    "title": "api for getting all Chats for specific Group.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "        {\n    \"error\": false,\n    \"message\": \"All Chats Listed\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"senderName\": \"Sakshi Nigam\",\n            \"senderId\": \"r1uZaizRG\",\n            \"receiverName\": \"Testing Group1\",\n            \"receiverId\": \"rJlamPICz\",\n            \"message\": \"hello evry1!\",\n            \"chatId\": \"Sk6UCqURG\",\n            \"createdOn\": \"2018-05-14T05:27:48.903Z\",\n            \"modifiedOn\": \"2018-05-14T05:27:51.034Z\"\n        },\n        {\n            \"senderName\": \"Anchal Nigam\",\n            \"senderId\": \"r1_rDWlRM\",\n            \"receiverName\": \"Edit Testing \",\n            \"receiverId\": \"rJlamPICz\",\n            \"message\": \"kse ho??\",\n            \"chatId\": \"ryqKAqUCf\",\n            \"createdOn\": \"2018-05-14T05:28:34.331Z\",\n            \"modifiedOn\": \"2018-05-14T05:28:36.344Z\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n    {\n    \"error\": true,\n    \"message\": \"Invalid Or Expired AuthorizationKey\",\n    \"status\": 404,\n    \"data\": null\n}\n{\n    \"error\": true,\n    \"message\": \"No chat Found\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/chat.js",
    "groupTitle": "Chat",
    "name": "GetApiV1UsersChatGetForRoom"
  },
  {
    "group": "Chat",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/getChatRooms",
    "title": "api for getting all Groups.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "        {\n    \"error\": false,\n    \"message\": \"All Group Chats Details Found\",\n    \"status\": 200,\n    \"data\": [\n        {\n            \"chatRoomId\": \"rJlamPICz\",\n            \"chatRoomName\": \"Edit Testing \",\n            \"creator\": \"Anchal Nigam\",\n            \"status\": true,\n            \"createdOn\": \"2018-05-14T01:17:43.000Z\",\n            \"ModifiedOn\": \"2018-05-14T01:17:43.000Z\"\n        },\n        {\n            \"chatRoomId\": \"BypaQDLCf\",\n            \"chatRoomName\": \"Testing Group2\",\n            \"creator\": \"Anchal Nigam\",\n            \"status\": true,\n            \"createdOn\": \"2018-05-14T01:17:56.000Z\",\n            \"ModifiedOn\": \"2018-05-14T01:17:56.000Z\"\n        }\n        ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n    {\n    \"error\": true,\n    \"message\": \"Invalid Or Expired AuthorizationKey\",\n    \"status\": 404,\n    \"data\": null\n}\n{\n    \"error\": true,\n    \"message\": \"No chat Room Found\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/chat.js",
    "groupTitle": "Chat",
    "name": "GetApiV1UsersGetchatrooms"
  },
  {
    "group": "Chat",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/:chatRoomId/deleteGroup",
    "title": "api for Deleting Group.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "         {\n    \"error\": false,\n    \"message\": \"Deleted the chatRoom successfully\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "     {\n    \"error\": true,\n    \"message\": \"No ChatRoom Found\",\n    \"status\": 404,\n    \"data\": null\n}\n    {\n    \"error\": true,\n    \"message\": \"Invalid Or Expired AuthorizationKey\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/chat.js",
    "groupTitle": "Chat",
    "name": "PostApiV1UsersChatroomidDeletegroup"
  },
  {
    "group": "Chat",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/createGroup",
    "title": "api for Create Group.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Group. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "creator",
            "description": "<p>Name of the Group Creator. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "        {\n    \"error\": false,\n    \"message\": \"Chat Room created\",\n    \"status\": 200,\n    \"data\": {\n        \"chatRoomId\": \"HyoGijIAM\",\n        \"chatRoomName\": \"FunTime\",\n        \"creator\": \"Anchal Nigam\",\n        \"status\": true,\n        \"createdOn\": \"2018-05-14T06:22:10.000Z\",\n        \"ModifiedOn\": \"2018-05-14T06:22:10.000Z\",\n        \"_id\": \"5af92b12da5e940688878b61\",\n        \"__v\": 0\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n    {\n    \"error\": true,\n    \"message\": \"Invalid Or Expired AuthorizationKey\",\n    \"status\": 404,\n    \"data\": null\n}\n{\n    \"error\": true,\n    \"message\": \"One or more parameter is missing\",\n    \"status\": 403,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/chat.js",
    "groupTitle": "Chat",
    "name": "PostApiV1UsersCreategroup"
  },
  {
    "group": "Chat",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/share",
    "title": "api for Sharing your Group via email.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user to whom you want to share your Group link. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "chatRoomId",
            "description": "<p>Id of Room . (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "chatRoomName",
            "description": "<p>Name of Room . (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "        {\n    \"error\": false,\n    \"message\": \"Mail Sent Successful\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n    {\n    \"error\": true,\n    \"message\": \"Invalid Or Expired AuthorizationKey\",\n    \"status\": 404,\n    \"data\": null\n}\n{\n    \"error\": true,\n    \"message\": \"Server Error!Sent Mail Failed.\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/chat.js",
    "groupTitle": "Chat",
    "name": "PostApiV1UsersShare"
  },
  {
    "group": "Chat",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/users/:chatRoomId/editGroup",
    "title": "api for Editing Group.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of user. (query params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Group. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "chatRoomId",
            "description": "<p>Id of the Group. (Pass in url) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "          {\n    \"error\": false,\n    \"message\": \"Updated successfully!\",\n    \"status\": 200,\n    \"data\": {\n        \"chatRoomId\": \"By5izz8CG\",\n        \"chatRoomName\": \"Edit Group\",\n        \"creator\": \"Anchal Nigam\",\n        \"status\": false,\n        \"createdOn\": \"2018-05-13T19:31:45.000Z\",\n        \"ModifiedOn\": \"2018-05-13T19:31:45.000Z\",\n        \"_id\": \"5af892a19162322b9828e0cb\",\n        \"__v\": 0\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"No Chat Room Found!\",\n    \"status\": 404,\n    \"data\": null\n}\n    {\n    \"error\": true,\n    \"message\": \"Invalid Or Expired AuthorizationKey\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/chat.js",
    "groupTitle": "Chat",
    "name": "PutApiV1UsersChatroomidEditgroup"
  },
  {
    "group": "Chat",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/users/:chatRoomId/markAsClose",
    "title": "api for Closing Group.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Authorization Token of user. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "          {\n    \"error\": false,\n    \"message\": \"Chat Room has been marked as close\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"No Chat Room Found!\",\n    \"status\": 404,\n    \"data\": null\n}\n    {\n    \"error\": true,\n    \"message\": \"Invalid Or Expired AuthorizationKey\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/chat.js",
    "groupTitle": "Chat",
    "name": "PutApiV1UsersChatroomidMarkasclose"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/forgotPassword",
    "title": "api for sending mail for password change.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "          {\n    \"error\": false,\n    \"message\": \"Mail Sent Successful!\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Server Error!Sent Mail Failed.\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersForgotpassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "          {\n    \"error\": false,\n    \"message\": \"Login Successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkhKUkJHMGxSZiIsImlhdCI6MTUyNTg5NTc1MDM4OSwiZXhwIjoxNTI1OTgyMTUwLCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZHdpc29yQ2hhdCIsImRhdGEiOnsidXNlcklkIjoicjFfckRXbFJNIiwiZmlyc3ROYW1lIjoiQW5jaGFsIiwibGFzdE5hbWUiOiJOaWdhbSIsImVtYWlsIjoiYW5jaGFsbmlnYW1tQGdtYWlsLmNvbSIsIm1vYmlsZU51bWJlciI6OTAyNjIyNDk0OCwiaGFzaCI6IjRxYnhva2o5amQ4NDB1N2wzNmRpd3MwMzNkYmI4ZmJyN3EiLCJhY3RpdmUiOnRydWV9fQ.uTIKh4NeWvWPR0ImzA7Ad-JpJGIiMesjjXYJjh0TWoo\",\n        \"userDetails\": {\n            \"userId\": \"r1_rDWlRM\",\n            \"firstName\": \"Anchal\",\n            \"lastName\": \"Nigam\",\n            \"email\": \"anchalnigamm@gmail.com\",\n            \"mobileNumber\": 9026224948,\n            \"hash\": \"4qbxokj9jd840u7l36diws033dbb8fbr7q\",\n            \"active\": true\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"User has not Verified!\",\n    \"status\": 400,\n    \"data\": null\n}\n{\n    \"error\": true,\n    \"message\": \"Wrong Password!Login Failed\",\n    \"status\": 400,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "to logout user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>Auth Token of the user. (auth headers) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Logged Out Successfully\",\n    \"status\": 200,\n    \"data\": null\n\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Already Logged Out or Invalid UserId\",\n    \"status\": 404,\n    \"data\": null\n}\n{\n    \"error\": true,\n    \"message\": \"Error Occured!\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogout"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for Signup.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Mobile Number of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "        {\n    \"error\": false,\n    \"message\": \"User created\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": \"rkWlVp1RM\",\n        \"firstName\": \"Anchal\",\n        \"lastName\": \"Nigam\",\n        \"email\": \"anchalnigamm@gmail.com\",\n        \"mobileNumber\": 9026224948,\n        \"hash\": \"8ug67ar1zoyrndloe73ztai17xa4jafi\",\n        \"active\": false,\n        \"createdOn\": \"2018-05-09T00:42:17.000Z\",\n        \"_id\": \"5af243e929485a1718f18c53\",\n        \"__v\": 0\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSignup"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/users/resetPassword",
    "title": "api for resetting password.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user which is provided at email link by encrypting using btoa. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "          {\n    \"error\": false,\n    \"message\": \"Password changed successfully!\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": \"r1_rDWlRM\",\n        \"firstName\": \"Anchal\",\n        \"lastName\": \"Nigam\",\n        \"password\": \"$2a$10$vbpX8zsNdvVwWDQyrO9KVux7N6HuQqnN2dgBRjD3MIb3AMYbukSQW\",\n        \"email\": \"anchalnigamm@gmail.com\",\n        \"mobileNumber\": 9026224948,\n        \"hash\": \"4qbxokj9jd840u7l36diws033dbb8fbr7q\",\n        \"active\": true,\n        \"createdOn\": \"2018-05-09T05:29:36.000Z\",\n        \"_id\": \"5af28740b7d71526585e5125\",\n        \"__v\": 0\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"One or more parameter is missing\",\n    \"status\": 403,\n    \"data\": null\n}\n{\n    \"error\": true,\n    \"message\": \"Error Occured!\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "users",
    "name": "PutApiV1UsersResetpassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/users/verifyEmail",
    "title": "api for verifying Email.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "hash",
            "description": "<p>hash which is provided in email link. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "          {\n    \"error\": false,\n    \"message\": \"User Verified Successfully\",\n    \"status\": 200,\n    \"data\": {\n        \n        \"userId\": \"rkWlVp1RM\",\n        \"firstName\": \"Anchal\",\n        \"lastName\": \"Nigam\",\n        \"email\": \"anchalnigamm@gmail.com\",\n        \"mobileNumber\": 9026224948,\n        \"hash\": \"8ug67ar1zoyrndloe73ztai17xa4jafi\",\n        \"active\": true,      \n        \"createdOn\": \"2018-05-09T00:42:17.000Z\",\n        \"_id\": \"5af243e929485a1718f18c53\",\n        \"__v\": 0\n    \n        \n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n    \"error\": true,\n    \"message\": \"Hash is missing\",\n    \"status\": 403,\n    \"data\": null\n}\n{\n    \"error\": true,\n    \"message\": \"User Not found\",\n    \"status\": 404,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "users",
    "name": "PutApiV1UsersVerifyemail"
  }
] });
