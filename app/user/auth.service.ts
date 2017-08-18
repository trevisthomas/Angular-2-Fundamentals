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

   updateCurrentUser(firstName: string, lastName: string) {
       this.currentUser.firstName = firstName
       this.currentUser.lastName = lastName
   }
}

