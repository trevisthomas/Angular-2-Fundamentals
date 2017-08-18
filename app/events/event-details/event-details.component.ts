import { Component, OnInit } from '@angular/core'
import { EventService, ISession, IEvent } from '../shared/index'
import { ActivatedRoute, Params } from '@angular/router'

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
        // this.activatedRoute.params.forEach((params: Params) => {

        //     this.event = this.activatedRoute.snapshot.data['event']
        //     this.addMode = false

        // })

        //This fixes the bug that causes the page not to reload when opening a new event in search
        this.activatedRoute.data.forEach((data: Object) => {

            this.event = data['event']
            this.addMode = false

        })
        
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
        // this.eventService.updateEvent(this.event)
        this.eventService.saveEvent(this.event).subscribe(event=>{
            console.log('Actually updated ' + event.id)
        })
        this.addMode = false
    }

    performCancel() {
        this.addMode = false
    }
    
    
}