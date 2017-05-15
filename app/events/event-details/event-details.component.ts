import { Component, OnInit } from '@angular/core'
import { EventService } from '../shared/event.service'
import { ActivatedRoute } from '@angular/router'

@Component({
    templateUrl: '/app/events/event-details/event-details.component.html',
    styles: [`
        .container { padding-left: 20px; padding-right: 20px; }
        .event-image { height: 100px; }
    `] 
})

export class EventDetailsComponent implements OnInit  {
    event:any

    constructor(private eventService: EventService, 
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(){
        let id = + this.activatedRoute.snapshot.params['id']
        //TREVIS!  The goofy plus converts the value to a number
        this.event = this.eventService.getEvent(id)
    }
}