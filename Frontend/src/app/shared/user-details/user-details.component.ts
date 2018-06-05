import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { AppService } from './../../app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {  ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() userFirstName: string;
  @Input() userLastName: string;
  @Input() userStatus: string;
  @Input() roomId: string;
  @Input() list: string;
  @Input() messageRead ?: number;
  public roomName:string;
  public firstChar: string;
  public authToken:any;
  constructor( public AppService: AppService,private _route: ActivatedRoute,public router: Router,private toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit(): void {
    
    this.roomName=btoa(this.userFirstName);
    this.firstChar = this.userFirstName[0];
    

  } // end ngOnInit
 
  


}
