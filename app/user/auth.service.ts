import { Injectable } from '@angular/core'
import { Subject, Observable } from 'rxjs/RX'
import { IUser } from './user.model'
import { Http, Response, RequestOptions, Headers } from '@angular/http'

@Injectable()
export class AuthService {
   currentUser: IUser 

   constructor(private http: Http) {
       
   }

   loginUser(userName: string, password: string) {
       let headers = new Headers({'Content-Type': 'application/json'})
        let options = new RequestOptions({ headers: headers})
        let loginInfo = {username: userName, password: password};
        console.log("Loging in: " + userName)

        return this.http.post('/api/login', 
            JSON.stringify(loginInfo), options).do((response: Response) => {
                if(response){
                    console.log("Loging successful: " + userName)
                    this.currentUser = <IUser>response.json().user;
                }
        }).catch(error => {
            return Observable.of(false)
        })
   }

   isAuthenticated() : Boolean{
       return !!this.currentUser
   }

   checkAuthenticationStatus(){
    console.log('Checking for current identity')
    //Trevis, what if you just used the response and checked to see if it's json is truthy instead of treating this like 'any'?
       return this.http.get('/api/currentIdentity').map((response: any) => {
           console.log("Response is: " + response.json())
           if(response._body){
               console.log("I have someting ")
            return response.json()
           } else {
               console.log("I have nothing")
               return {}
           }
           
       }).do(currentUser => {
           if(!!currentUser.userName) {
               console.log("I think that i'm logged in")
               this.currentUser = currentUser
           } else {
               console.log("I'm not logged in")
           }
       }).subscribe()
   }

   updateCurrentUser(firstName: string, lastName: string) {
       this.currentUser.firstName = firstName
       this.currentUser.lastName = lastName
   }
}

