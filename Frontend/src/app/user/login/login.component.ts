import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AppService } from './../../app.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: any;
  public password: any;
  public emailNeed: number = 1; //this is when user clicks on forgotpassword without giving email
  constructor(public appservice: AppService, private spinnerService: Ng4LoadingSpinnerService,public router: Router, private toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    if(Cookie.get('receiverId')){
      this.router.navigate(['/chat']);

    }
  }

  public goToSignUp: any = () => {

    this.router.navigate(['/sign-up']);

  } // end goToSignUp

  //method to login
  public logInFunction = (): any => {
    let data = {
      'email': this.email,
      'password': this.password
    }

    this.appservice.logIn(data).subscribe(
      Response => {

        if (Response.status === 200) {
          Cookie.set('authtoken', Response.data.authToken);

          Cookie.set('receiverId', Response.data.userDetails.userId);

          Cookie.set('receiverName', Response.data.userDetails.firstName + ' ' + Response.data.userDetails.lastName);

          this.appservice.setUserInfoInLocalStorage(Response.data.userDetails)

          this.router.navigate(['/chat']);


        }
        else {
          this.toastr.error(Response.message);
          
        }
      },
      (err) => {

        this.toastr.error('Server Error!');
       
      });
  }//end

  //method of forgot password
  public forgotPassword = (email): any => {
    if (email == undefined) {
      this.emailNeed = 0;
    }
    else {
      console.log(email);
      this.spinnerService.show();
      this.appservice.forgotPassword(email).subscribe(
        Response => {
          if (Response.status === 200) {

            this.spinnerService.hide();
            this.toastr.success('Mail has been sent.Check for further process!');
            
            setTimeout(() => {

              this.router.navigate(['/login']);
  
            }, 2000);
          }
          else {
            this.spinnerService.hide();
            this.toastr.error(Response.message);
            
          }

        },
        error => {
          this.spinnerService.hide();
          this.toastr.error(`Some Error Occured!`);
         

        });
    }
  }//end 
}
