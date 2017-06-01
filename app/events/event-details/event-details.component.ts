import { Component, OnInit } from '@angular/core'
import { EventService, ISession } from '../shared/index'
import { ActivatedRoute } from '@angular/router'
import {  } from ''

@Component({
    templateUrl: '/app/events/event-details/event-details.component.html',
    styles: [`
        .container { padding-left: 20px; padding-right: 20px; }
        .event-image { height: 100px; }
        a {cursor: pointer}
    `] 
})

export class EventDetailsComponent implements OnInit  {
    event:any
    addMode: Boolean = false
    filterBy: string = 'all'
    sortBy: string = 'name'

    constructor(private eventService: EventService, 
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(){
        let id = + this.activatedRoute.snapshot.params['id']
        //TREVIS!  The goofy plus converts the value to a number
        this.event = this.eventService.getEvent(id)
    }

    addSession(){
        this.addMode = true
        console.log("add")
    }
    //
    performSaveNewSession(session: ISession){
        console.log('i am working: ' + session)

        const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id))
        session.id = nextId + 1

        this.event.sessions.push(session)
        this.eventService.updateEvent(this.event)
        this.addMode = false
    }

    performCancel() {
        this.addMode = false
    }
    
    
}