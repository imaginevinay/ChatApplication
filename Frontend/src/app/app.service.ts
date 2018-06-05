import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class AppService {
  private baseUrl = "http://groupchatapp.webdeveloperjourney.xyz/api/v1";
  constructor(public http: HttpClient) { }

  //Method to signup functionality
  public signUp = (data): Observable<any> => {

    const param = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('email', data.email)
      .set('mobileNumber', data.mobile)
      .set('password', data.password)


    return this.http.post(`${this.baseUrl}/users/signup`, param);
  }//end 

  //method for login functionality

  //Method to verify email
  public verifyEmail = (data): Observable<any> => {
    const param = new HttpParams()
      .set('hash', data)

    return this.http.put(`${this.baseUrl}/users/verifyEmail`, param);
  }
  //end method

  public logIn = (data): Observable<any> => {
    const param = new HttpParams()
      .set('email', data.email)
      .set('password', data.password)

    return this.http.post(`${this.baseUrl}/users/login`, param);
  }//end

  //forgot password
  public forgotPassword = (email): Observable<any> => {
    const param = new HttpParams()
      .set('email', email)

    return this.http.post(`${this.baseUrl}/users/forgotPassword`, param);
  }

  //reset password function
  public resetPassword = (data): Observable<any> => {
    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password)
    return this.http.put(`${this.baseUrl}/users/resetPassword`, params);


  }//end password function

  public handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error) {

      errorMessage = `${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if



    return errorMessage;

  }  // END handleError

  public getUserInfoFromLocalstorage = () => {

    return JSON.parse(localStorage.getItem('userInfo'));

  } // end getUserInfoFromLocalstorage


  public setUserInfoInLocalStorage = (data) => {

    localStorage.setItem('userInfo', JSON.stringify(data))


  }

// crreating group chat
public createGroup=(data,authToken): Observable<any>=>{
  const params = new HttpParams()
  .set('name', data.name)
  .set('creator', data.creator)
  
return this.http.post(`${this.baseUrl}/users/createGroup?authToken=${authToken}`, params);


}//end

// editing group chat
public editGroup=(data,authToken): Observable<any>=>{
  const params = new HttpParams()
  .set('name', data.name)
 
  
return this.http.put(`${this.baseUrl}/users/${data.chatRoomId}/editGroup?authToken=${authToken}`, params);


}//end

//deleting a room
public deleteGroup=(roomId,authToken): Observable<any>=>{
  
  let data={};
  return this.http.post(`${this.baseUrl}/users/${roomId}/deleteGroup?authToken=${authToken}`,data);

}//end

//Close a room
public close=(roomId,authToken): Observable<any>=>{
  
  let data={};
  return this.http.put(`${this.baseUrl}/users/${roomId}/markAsClose?authToken=${authToken}`,data);

}//end

//get chatRoom List
public getChatRooms=(authToken): Observable<any>=>{
  return this.http.get(`${this.baseUrl}/users/getChatRooms?authToken=${authToken}`);


}
//end

//get chats 
public getChat(receiverId, skip): Observable<any> {   //recevr id means roomid

  return this.http.get(`${this.baseUrl}/users/chat/get/for/room?receiverId=${receiverId}&skip=${skip}&authToken=${Cookie.get('authtoken')}`)
    .do(data => console.log('Data Received'))
    .catch(this.handleError);

} //end

//method to share a rooom link
public shareLink=(data,authToken): Observable<any> =>{
  const params = new HttpParams()
  .set('email', data.email)
  .set('chatRoomId', data.chatRoomId)
  .set('chatRoomName', data.chatRoomName)
  return this.http.post(`${this.baseUrl}/users/share?authToken=${authToken}`, params);

  
}//end

  public logout(): Observable<any> {

    const params = new HttpParams()
      .set('authToken', Cookie.get('authtoken'))

    return this.http.post(`${this.baseUrl}/users/logout`, params);

  } // end logout function




}



