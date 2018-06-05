import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
   
    RouterModule.forChild([
      { path: 'sign-up', component: SignupComponent },
      {path:'verify/:hash' ,component: VerifyEmailComponent},
      {path:'reset/:id',component:ResetPasswordComponent},
      
      
      
    ])
  ],
  declarations: [LoginComponent, SignupComponent, VerifyEmailComponent, ResetPasswordComponent]
})
export class UserModule { }
