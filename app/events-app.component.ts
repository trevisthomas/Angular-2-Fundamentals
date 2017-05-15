import { Component } from '@angular/core'

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

}