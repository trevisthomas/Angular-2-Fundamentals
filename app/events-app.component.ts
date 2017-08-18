import { Component } from '@angular/core'
import { AuthService } from './user/auth.service'
@Component({
    selector: 'events-app',
    // template: '<h2>Hello world</h2>'
    template: `
        <nav-bar></nav-bar>
        <hr />
        <router-outlet></router-outlet>
    `
})
export class EventsAppComponent {
    constructor(private authService: AuthService) {

    }

    ngOnInit(){
        this.authService.checkAuthenticationStatus()
    }
}