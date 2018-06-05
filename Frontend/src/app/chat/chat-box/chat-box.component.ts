import { Component, OnInit, ViewContainerRef,ViewChild, ElementRef } from '@angular/core';
import { SocketService } from './../../socket.service';
import { AppService } from './../../app.service';

import {ActivatedRoute, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  providers: [SocketService]
})
export class ChatBoxComponent implements OnInit {
  public authToken: any;
  public userInfo: any;
  public receiverId: any;
  public receiverName: any;
  public userList: any = [];
  public chatRooms:any=[];
  public joinRooms:any=[];   //rooms that are joined by user
  public unreadMsgList:any=[];
  public disconnectedSocket: boolean;
  public messageText: any; 
  public messageList: any = []; // stores the current message list display in chat box
  public pageValue: number = 0;
  public loadingPreviousChat: boolean = false;
  public scrollToChatTop:boolean= false;
  public unreadList:any =[];
  public unreadOfflineList:any=[];
  public count;
  public typingUserName:String='';
  public typingUserId:String='';
  public roomId:any;
  public param1:string;
  public param2:string;
  public param3:string;
 
  
  constructor( public AppService: AppService,
    public SocketService: SocketService,
    public router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastsManager,
    vcr: ViewContainerRef) {
      this.receiverId = Cookie.get('receiverId');

      this.receiverName = Cookie.get('receiverName');
      
      this.toastr.setRootViewContainerRef(vcr);
  
     }

  ngOnInit() {
    this.authToken = Cookie.get('authtoken');
    this.receiverId = Cookie.get("receiverId");

    this.receiverName =  Cookie.get('receiverName');
    console.log(this.authToken)
    this.userInfo = this.AppService.getUserInfoFromLocalstorage();
    this.AppService.getChatRooms(this.authToken).subscribe(
      Response=>{
         this.chatRooms=Response.data;
        
         this.userList = [];
         if(this.chatRooms!==null){
      for(let i of this.chatRooms) {
            i.chatting="false";
    
         }
        }
        
         console.log(this.chatRooms)
      },
      error=>{
        this.toastr.error('some error occured');
      });
     
      //this part is for joining room via link
      this.param1=this._route.snapshot.paramMap.get('chatRoomId');
      this.param2=this._route.snapshot.paramMap.get('chatRoomName');
      if(this.param1 && this.param2){
        this.param2=atob(this.param2);
        this.roomJoining(this.param1,this.param2);
        this.roomSelectedToChat(this.param1,this.param2);
      }
      //end
      if(this.receiverId!=null && this.receiverId!=undefined && this.receiverId!=''){
      this.roomSelectedToChat(this.receiverId,this.receiverName);
    }

 
    this.verifyUserConfirmation();
   
    this.getMessageFromAUser();
    this.getOnTypingData();
    this.setJoinedRoom();
  }

  

  public verifyUserConfirmation: any = () => {
     this.SocketService.verifyUser().subscribe(
      (data) => {
        
        this.disconnectedSocket = false;
        this.SocketService.setUser(this.authToken);
        
        this.getOnlineUserList();
      });
}//end



//  Online user list methdlist start 
public getOnlineUserList :any =()=>{

  this.SocketService.onlineUserList()
    .subscribe((userList) => {
     
      this.userList = [];
      for(let i of userList) {
      

        let temp = { 'userId': i.userId, 'name': i.fullName, 'unread': 0, 'chatting': false };

        this.userList.push(temp);  
        

     
    }
      console.log(this.userList)
     


    }); // end online-user-list
    
} //online userlist methd end

//Method to select a room for chatting
public roomSelectedToChat=(roomId,roomName) =>{
  console.log('clicked');
  this.chatRooms.map((room)=>{
    if(room.chatRoomId==roomId){
      room.chatting=true;
    }
    else{
      room.chatting=false;
    }
      
  });
  Cookie.set('receiverId', roomId);

  Cookie.set('receiverName', roomName);


  this.receiverName = roomName;

  this.receiverId = roomId;
  

  this.messageList = [];

  this.pageValue = 0;
  this.getPreviousChatWithAUser();



}//end select room

//method to check whether the user has joined chat room or not
public joinRoomStatus=(roomId):boolean=>{
  if(this.joinRooms.length>0){
     if(this.joinRooms.indexOf(roomId)!=-1){
       return true;
     }
     else{
       return false;
     }
  }
  else{
    return false;     //no room join
  }
}//end

//method to start room joining process
public roomJoining=(roomId,roomName)=>{
  console.log('clicked join room')
   let name=`${this.userInfo.firstName} ${this.userInfo.lastName}`;
  this.SocketService.joinRoom(roomId,roomName,name);
  

}//end

//method to get message from serverabout joining
public setJoinedRoom=()=>{
  this.SocketService.setJoinedRoom().subscribe(
    data=>{
      console.log(data)
      this.joinRooms.push(data.roomId);
      this.joinRooms=this.joinRooms.filter((val,index)=>{
         return this.joinRooms.indexOf(val)==index;
      });
      console.log(data.roomId);
      let name=`${this.userInfo.firstName} ${this.userInfo.lastName}`;
      if(data.joinedUser==name){
        this.toastr.success(`You have Joined ${data.roomName} room`)
      }
      else{
        this.toastr.success(`${data.joinedUser} have Joined ${data.roomName} room`)
      }
     
      console.log(this.joinRooms)
    }
  )

}//end 

//methid to send message using enter
public sendMessageUsingKeypress: any = (event: any) => {
 
  if (event.keyCode === 13) { // 13 is keycode of enter.

    this.sendMessage();

  }

} // end sendMessageUsingKeypress


//Method to send message
public sendMessage: any = () => {

  if(this.messageText){

    let chatMsgObject = {
      senderName: this.userInfo.firstName + " " + this.userInfo.lastName,
      senderId: this.userInfo.userId,
      receiverName: Cookie.get('receiverName'),
      receiverId: Cookie.get('receiverId'),
      message: this.messageText,
      createdOn: new Date()
    } // end chatMsgObject
  
    this.SocketService.SendChatMessage(chatMsgObject);
    this.pushToChatWindow(chatMsgObject);
      
    

  }
  else{
    this.toastr.warning('text message can not be empty')

  }

} // end sendMessage

//Method to push your chats to chat window
public pushToChatWindow : any =(data)=>{

  this.messageText="";
 
  
  this.messageList.push(data);
  this.scrollToChatTop = false;


}// end push to chat window

//Method to get all messages from all users of chat Room
public getMessageFromAUser :any =()=>{
 
  this.SocketService.chatByRoomId()
  .subscribe((data)=>{
    if(data.senderId==this.typingUserId){
      
      this.roomId="";
      this.typingUserName="";
    }
    
    (this.receiverId==data.receiverId)?this.messageList.push(data) : '';
    /* this.unreadMessages();  */
    this.toastr.success(`${data.senderName} says : ${data.message}`)
    this.scrollToChatTop=false;
  
  });//end subscribe

}// end get message from a user 

//Getting previous messages f chat Room
public getPreviousChatWithAUser :any = ()=>{
  let previousData = (this.messageList.length > 0 ? this.messageList.slice() : []);
 
  this.AppService.getChat(this.receiverId, this.pageValue * 10)
  .subscribe((apiResponse) => {


    if (apiResponse.status == 200) {

      this.messageList = apiResponse.data.concat(previousData);

    } else {

      this.messageList = previousData;
      this.toastr.warning('No Messages available')

     

    }

    this.loadingPreviousChat = false;

  }, (err) => {

    this.toastr.error('some error occured')


  });

}//end

//This is for typing,it notifies evry1 of room that who is typing
public onTyping=(event: any) =>{ 

 //when enter is pressed then typing emit event should not be called
  if(event.keyCode != 13 ){
    let data={
      "typingUser":this.userInfo.firstName,
      "typingUserId":this.userInfo.userId,
      "roomId":this.receiverId
    }
 //this is for when user types but clear the message text then evry1 should notify that now user is not typing
    if(this.messageText==''){
      let data={
        "typingUser":'',
        "typingUserId":'',
        "roomId":this.receiverId
      }
      
      this.SocketService.typing(data);
      
    } //end

    //this is when user is typing then evry1 should get notifictan that some1 is typing
    if(this.messageText!=''){
    
    console.log(`typing`);
   
    this.SocketService.typing(data);
    
  }
  }
 
 
}//end onTyping function

//function to get data of ontyping like who is typing and room Id info
public getOnTypingData=()=>{
  this.SocketService.getTypingUser().subscribe(
    (typedUserData)=>{
      
      this.typingUserName=typedUserData.typingUser;
      this.typingUserId=typedUserData.typingUserId;
      this.roomId=typedUserData.roomId;
      console.log(this.roomId);
      
      

    }
  );

}//end

public loadEarlierPageOfChat: any = () => {

  this.loadingPreviousChat = true;

  this.pageValue++;
  this.scrollToChatTop = true;

  this.getPreviousChatWithAUser() 

} // end 

public logout: any = () => {

  this.AppService.logout()
    .subscribe((apiResponse) => {

      if (apiResponse.status === 200) {
        console.log("logout called")
        Cookie.delete('authtoken');

        Cookie.delete('receiverId');

        Cookie.delete('receiverName');

        this.SocketService.exitSocket();

        this.router.navigate(['/']);

      } else {
        this.toastr.error(apiResponse.message)

      } // end condition

    }, (err) => {
      this.toastr.error('some error occured')


    });

} // end logout 


}
