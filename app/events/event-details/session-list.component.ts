import { Component, Input, OnChanges } from '@angular/core'
import { ISession } from '../shared/index'


@Component({

    selector: 'session-list',
    templateUrl: '/app/events/event-details/session-list.component.html',
    
})

export class SessionListComponent implements OnChanges {
    @Input() sessions: ISession[]
    @Input() filterBy: string
    visibleSessions: ISession[] = []

    ngOnChanges(){
        if(this.sessions) { //If we have sessions.  Because this gets fired whenever either input gets changed.  We dont want to apply this unless the sessions are set
            this.filterSessions(this.filterBy)
        }
    }

    filterSessions(filter: string){
        if(filter === 'all'){
            this.visibleSessions = this.sessions.slice(0)
        } else {
            this.visibleSessions = this.sessions.filter(s => {return s.level.toLocaleLowerCase() === filter})
        }
    }
}