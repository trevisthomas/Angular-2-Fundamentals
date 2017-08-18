import { Component, OnInit, Inject } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from './auth.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { TOASTR_TOKEN, Toastr } from '../common/toastr.service'

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
  firstName: FormControl
  lastName: FormControl  

  constructor(private authService : AuthService, 
    private router: Router,
    @Inject(TOASTR_TOKEN) private toastrService : Toastr ) {
  }

  ngOnInit() { //Notice, he didnt do this in the template based form, only the reactive one
    this.firstName = new FormControl(this.authService.currentUser.firstName,
      [Validators.required, Validators.pattern('[a-zA-Z].*')])

    this.lastName = new FormControl(this.authService.currentUser.lastName,
      [Validators.required, Validators.pattern('[a-zA-Z].*')])

    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }
  cancel(){
    this.router.navigate(['events'])
  }

  saveProfile(formValues){
    console.log("Saving profile" + formValues);

    if( this.profileForm.valid ) {
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName).subscribe( () => {
        this.toastrService.success("Profile Saved")
      })

      
      // this.router.navigate(['events'])
    }
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/user/login']);
    })
  }

  validateLastName(){
    return this.lastName.valid ||
    this.lastName.untouched
  }

  validateFirstName(){
    return this.firstName.valid ||
    this.firstName.untouched
  }
}