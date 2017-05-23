import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from './auth.service'
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  templateUrl: 'app/user/profile.component.html',
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup //Class scope group was needed so that we can access the controls from html

  constructor(private authService : AuthService, private router: Router) {

  }

  ngOnInit() { //Notice, he didnt do this in the template based form, only the reactive one
    let firstName = new FormControl(this.authService.currentUser.firstName)

    let lastName = new FormControl(this.authService.currentUser.lastName)

    this.profileForm = new FormGroup({
      firstName: firstName,
      lastName: lastName
    })
  }
  cancel(){
    this.router.navigate(['events'])
  }

  saveProfile(formValues){
    this.authService.updateCurrentUser(formValues.firstName, formValues.lastName)
    this.router.navigate(['events'])
  }
}