import { Injectable } from '@angular/core'
import { Subject, Observable } from 'rxjs/RX'
import { IUser } from './user.model'

@Injectable()
export class AuthService {
   currentUser: IUser 

   loginUser(userName: string, password: string) {
       this.currentUser = {
           id: 1,
           firstName: 'John',
           lastName: 'Papa',
           userName: userName 
       }
   }

   isAuthenticated() : Boolean{
       return !!this.currentUser
   }
}

