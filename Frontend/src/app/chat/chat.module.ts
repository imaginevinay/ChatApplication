import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ChatRouteGuardService } from './chat-route-guard.service';
import { ModalModule } from 'ngx-bootstrap';
import { GroupChatComponent } from './group-chat/group-chat.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild([ 
      { path: 'chat', component: ChatBoxComponent,
      canActivate:[ChatRouteGuardService]},
      { path: 'chat/:chatRoomId/:chatRoomName', component: ChatBoxComponent},

      {path:'group-chat/:chatRoomId',component:GroupChatComponent},
      {path:'group-chat/:chatRoomId/:chatRoomName',component:GroupChatComponent},
      {path:'group-chat',component:GroupChatComponent}
    ]),
    SharedModule
  ],
  declarations: [ChatBoxComponent, GroupChatComponent],
  providers:[ChatRouteGuardService]
})
export class ChatModule { }
