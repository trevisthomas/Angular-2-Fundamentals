import { Component, OnInit } from '@angular/core'
import { EventService } from './shared/event.service'

@Component({
    selector: 'events-list',
    template: `
    <div>
        <h1>Upcoming Angular 2 Events</h1>
        <nav-bar></nav-bar>
        <hr />
        
        <div class="row">
            <div *ngFor="let e of events" class="col-md-5">
                <event-thumbnail #thumbnail (eventClick)="handleEventClicked($event)"
                 [event] = "e"></event-thumbnail>

            </div>
         </div>
    </div>
`
})
export class EventsListComponent implements OnInit {
    events:any[]

    constructor (private eventService: EventService) {
        
    }

    handleEventClicked(data) {
        console.log("recieved: ", data);
    }

    ngOnInit() {
        this.events = this.eventService.getEvents()
    }

}