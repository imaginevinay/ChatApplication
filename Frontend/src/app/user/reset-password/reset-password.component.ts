import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AppService } from './../../app.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public password: any;
  public confirmPassword: any;

  public notMatch: number = 0; //initiale 0 when password and confrim password doesnt match then 1
  constructor(private _route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService,public appservice: AppService, public router: Router, private toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  public goToSignUp: any = () => {

    this.router.navigate(['/sign-up']);

  } // end goToSignUp

  public resetPassword = () => {
    let encodedEmail = this._route.snapshot.paramMap.get('id');
    let decodedEmail = atob(encodedEmail);
    let finalEmail = decodedEmail.substr(0, decodedEmail.length - 17); //here 17 is length of mmy seccretkey
    if (this.password != this.confirmPassword) {
      this.notMatch = 1;

    }
    else {
      console.log(finalEmail)
      let data = {
        "email": finalEmail,
        "password": this.password
      }
      this.spinnerService.show();
      this.appservice.resetPassword(data).subscribe(
        Response => {
          if (Response.status === 200) {
           
              this.spinnerService.hide();
              this.toastr.success(Response.message);
           
            
            setTimeout(() => {

              this.router.navigate(['/']);
  
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

  }//end reset password

}
