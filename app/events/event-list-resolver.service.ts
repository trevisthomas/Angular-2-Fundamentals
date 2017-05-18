import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { EventService } from './shared/event.service'

@Injectable()
export class EventListResolver implements Resolve<any> {

    constructor (private eventService: EventService) {

    }

    resolve(){

        //Notice that the argument to map is a closure that takes a list of events and returns it.
        return this.eventService.getEvents().map(events => events)

    }
}