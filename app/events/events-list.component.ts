import { Component, OnInit } from '@angular/core'
import { EventService } from './shared/event.service'
import { ToastrService } from '../common/toastr.service'

@Component({
    template: `
    <div>
        <h1>Upcoming Angular 2 Events</h1>
        
        <div class="row">
            <div *ngFor="let e of events" class="col-md-5">
                <event-thumbnail (click)="handleThumbnailClicked(e.name)"
                 [event] = "e"></event-thumbnail>

            </div>
         </div>
    </div>
`
})
export class EventsListComponent implements OnInit {
    events:any

    //Remember that this 'private' business in TypeScript is short hand for defining and setting a local var
    constructor (private eventService: EventService, private toastrService: ToastrService) {
        
    }

    handleThumbnailClicked(eventName) {
        this.toastrService.success(eventName);
    }

    ngOnInit() {
        this.eventService.getEvents().subscribe(events => { this.events = events})
    }

}