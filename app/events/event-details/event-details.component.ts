import { Component, OnInit } from '@angular/core'
import { EventService, ISession } from '../shared/index'
import { ActivatedRoute, Params } from '@angular/router'
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
        
        //In order to re-reoute to this page from this page with a new id, you need to subscribe to the parameter's to be notified when the parameter changes!
        this.activatedRoute.params.forEach((params: Params) => {
            this.event = this.eventService.getEvent(+params['id'])
            this.addMode = false
        })
        //I dont fully understand what is going on above with this callback.  Why is the for each necessary?

        
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