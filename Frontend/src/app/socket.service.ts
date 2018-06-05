import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";
@Injectable()
export class SocketService {
  private url = 'http://localhost:3000';

  private socket;

  constructor(public http: HttpClient) {
    // connection is being created.
    // that handshake
    this.socket = io(this.url);

  }

  //method to listen to verify user event
  public verifyUser = () => {
    return Observable.create((observer) => {
      this.socket.on('verifyUser', (data) => {
        observer.next(data);
      }); //end socket
    });//end observable

  }//end verify user event

//emit event
public setUser=(authToken)=>{
  this.socket.emit('setUser',authToken);
}//end of this event

//method to listen online user list
public onlineUserList = () => {

    return Observable.create((observer) => {

      this.socket.on("online-user-list", (userList) => {

        observer.next(userList);

      }); // end Socket

    }); // end Observable

  } // end onlineUserList

 //method to join a room
 public joinRoom=(roomId,roomName,joinUser)=>{
    let data={
      'roomId':roomId,
      'roomName':roomName,
      'joinedUser':joinUser
    }
     this.socket.emit('joinRoom',(data));
 }//end

 //method to set how many rooms are joined by individual
 public setJoinedRoom=()=>{
  return Observable.create((observer) => {

    this.socket.on("setJoinedRoom", (joinedRoom) => {

      observer.next(joinedRoom);

    }); // end Socket

  }); // end Observable

 }//end
  



 //message sending
public SendChatMessage = (chatMsgObject) => {

  this.socket.emit('room-msg', chatMsgObject);

} // end SendChatMessage

public chatByRoomId = () => {

  return Observable.create((observer) => {
    
    this.socket.on('receiveMsg', (data) => {

      observer.next(data);

    }); // end Socket

  }); // end Observable

} // end chatByRoomId

//typing events emiting and listening start
public typing=(data)=>{
  this.socket.emit('typing',data);
}//end

public getTypingUser=()=>{
  return Observable.create((observer) => {
    
    this.socket.on('userTyping', (data) => {

      observer.next(data);

    }); // end Socket

  }); // end Observable
}


 public exitSocket = () : any =>{
  
   this.socket.emit('disconnection');


}// end exit socket
 




}
