import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from './auth.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  templateUrl: 'app/user/profile.component.html',
  styles: [`
    em { float: right; color:#E05C65; padding-left:10px;}
    .error input {background-color: #E3C3C5;}
    .error ::-webkit-input-placeholder { color: #999; }
    .error ::-moz-placeholder { color: #999; }
    .error :-moz-placeholder { color: #999; }
    .error :-ms-input-placeholder { color: #999; }
  `]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup //Class scope group was needed so that we can access the controls from html
  
  constructor(private authService : AuthService, private router: Router) {

  }

  ngOnInit() { //Notice, he didnt do this in the template based form, only the reactive one
    let firstName = new FormControl(this.authService.currentUser.firstName,
      Validators.required)

    let lastName = new FormControl(this.authService.currentUser.lastName,
      Validators.required)

    this.profileForm = new FormGroup({
      firstName: firstName,
      lastName: lastName
    })
  }
  cancel(){
    this.router.navigate(['events'])
  }

  saveProfile(formValues){
    if( this.profileForm.valid ) {
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName)
      this.router.navigate(['events'])
    }
  }

  validateLastName(){
    return this.profileForm.controls.lastName.valid ||
    this.profileForm.controls.lastName.untouched
  }

  validateFirstName(){
    return this.profileForm.controls.firstName.valid ||
    this.profileForm.controls.firstName.untouched
  }
}