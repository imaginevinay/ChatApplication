import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AppService } from './../../app.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
import { HttpResponseBase } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public firstName: string;
  public lastName: string;
  public mobile: number;
  public email: any;
  public password: any;
 
  constructor(public appservice: AppService, public router: Router, private toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {

  }

  //Method to go to login page
  public goToSignIn = () => {
    this.router.navigate(['/']);
  } //end


  //method for calling signup function which is in app service and do signup functionality
  public signUpFunction = (): any => {
    let data = {
      "firstName": this.firstName,
      "lastName": this.lastName,
      "email": this.email,
      "password": this.password,
      "mobile": this.mobile
     
    }

    this.appservice.signUp(data).subscribe(
      Response => {
        
        if (Response.status === 200) {
          this.toastr.success('Signup Successful!Confirm your Email to proceed further.');
          setTimeout(() => {

            this.goToSignIn();

          }, 2000);
        }
        else {
          this.toastr.error(Response.message);
        }


      },
      error => {
       
        this.toastr.error('some error occured');

      });

  }//end
}
