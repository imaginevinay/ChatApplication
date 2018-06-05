'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let chatRoomSchema = new Schema({
  chatRoomId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  chatRoomName: {
    type: String,
    default: ''
  },
  creator: {
    type: String,
    default: ''
  },
  status: {
    type: Boolean,
    default: true
  },
  
  createdOn :{
    type:Date,
    default:""
  },
  ModifiedOn :{
    type:Date,
    default:""
  }


})


mongoose.model('chatRoom', chatRoomSchema);