import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AppService } from './../../app.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {  ActivatedRoute,Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent implements OnInit {
  public groupName:String;
  public receiverName:String;
  public authToken:String;
  public receiverId:String;
  public param1:String;
  public param2:String;
  public email:any;
  public groupChat:boolean=true;
  public share:boolean=false;
  public editChat:boolean=false;
  public deleteChat:boolean=false;
  public markAsClose:boolean=false;
  
  constructor(public appservice: AppService, private _route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService,public router: Router, private toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.receiverName = Cookie.get('receiverName');
    this.receiverId = Cookie.get("receiverId");
    this.authToken = Cookie.get('authtoken');
    this.param1 = this._route.snapshot.paramMap.get('chatRoomId');
    this.param2=this._route.snapshot.paramMap.get('chatRoomName');
    if(this.param1 && !this.param2){
      this.editChat=true;
      this.groupChat=false;
     
      
    }
   
    if(this.param1 && this.param2){
      if(this.param1 && this.param2=="delete"){
        this.deleteChat=true;
        this.groupChat=false;
        
      this.delete(this.param1);
      }
      else if(this.param1 && this.param2=="close"){
         this.markAsClose=true;
         this.groupChat=false;
         this.close(this.param1);
      }
      else  {
      
        this.share=true;
        this.groupChat=false;
       
      }
     

    }
  
  }

  //Method to create group
  public createGroup=()=>{
    let data={
      "name":this.groupName,
      "creator" :this.receiverName,
     
       
    }
    this.appservice.createGroup(data,this.authToken).subscribe(
      Response=>{
        if (Response.status === 200) {

          this.toastr.success('Chat Room Created');
          setTimeout(() => {

            this.router.navigate(['/chat']);

          }, 2000);

        }
        else{
          this.toastr.error(Response.message);
        }

      },
      error=>{
        this.toastr.error('some error occured');
      }
    )
  }//end

  //Method to edit group
  public editGroup=()=>{
    let data={
      "name":this.groupName,
      "chatRoomId":this.param1
      
       
    }
    console.log(this.param1)
    this.appservice.editGroup(data,this.authToken).subscribe(
      Response=>{
        if (Response.status === 200) {

          this.toastr.success('Chat Room Edited Successfully!');
          setTimeout(() => {

            this.router.navigate(['/chat']);

          }, 2000);

        }
        else{
          this.toastr.error(Response.message);
        }

      },
      error=>{
        this.toastr.error('some error occured');
      }
    )
  }//end

  //Method to share a link
  public shareLink=()=>{
    let data={
      "chatRoomId":this.param1,
      "chatRoomName":this.param2,
      "email":this.email,

    }
    this.spinnerService.show();
    this.appservice.shareLink(data,this.authToken).subscribe(
      Response => {
        if (Response.status === 200) {
          this.spinnerService.hide();
          this.toastr.success('Link has been Successfully Shared!');
          setTimeout(() => {

            this.router.navigate(['/chat']);

          }, 2000);
        }
        else{
          this.spinnerService.hide();
          this.toastr.error(Response.message);
        }
        },
      error => {
        this.spinnerService.hide();
          this.toastr.error(`Some Error Occured!`);
       
      });

  }//end

  //method to delete a chat.
  public delete=(roomId)=>{
    console.log(roomId);
     this.appservice.deleteGroup(roomId,this.authToken).subscribe(
      Response=>{
        if (Response.status === 200) {

          this.toastr.success('Chat Room Deleted Successfully!');
          setTimeout(() => {

            this.router.navigate(['/chat']);

          }, 2000);

        }
        else{
          this.toastr.error(Response.message);
        }

      },
      error=>{
        this.toastr.error('some error occured');
      }
     )
  }//end

  public close=(roomId)=>{
    this.appservice.close(roomId,this.authToken).subscribe(
      Response=>{
        if (Response.status === 200) {

          this.toastr.success('Chat Room has been Marked as Close!');
          setTimeout(() => {

            this.router.navigate(['/chat']);

          }, 2000);

        }
        else{
          this.toastr.error(Response.message);
        }

      },
      error=>{
        this.toastr.error('some error occured');
      }
    );
  }

}
