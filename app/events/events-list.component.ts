import { Component, OnInit } from '@angular/core'
import { EventService } from './shared/event.service'
import { ActivatedRoute } from '@angular/router'
import { IEvent } from './shared/event.model'

@Component({
    template: `
    <div>
        <h1>Upcoming Angular 2 Events</h1>
        
        <div class="row">
            <div *ngFor="let e of events" class="col-md-5">
                <event-thumbnail
                 [event] = "e"></event-thumbnail>

            </div>
         </div>
    </div>
`
})
export class EventsListComponent implements OnInit {
    events:[IEvent]

    //Remember that this 'private' business in TypeScript is short hand for defining and setting a local var
    constructor (private eventService: EventService, 
                 private router: ActivatedRoute) {
        
    }

    ngOnInit() {
        this.events = this.router.snapshot.data['events']
    }

}