import { Component, Input, OnChanges } from '@angular/core'
import { ISession } from '../shared/index'
import { AuthService } from '../../user/auth.service'
import { VoterService } from './voter.service'

@Component({

    selector: 'session-list',
    templateUrl: '/app/events/event-details/session-list.component.html',
    
})

export class SessionListComponent implements OnChanges {
    @Input() sessions: ISession[]
    @Input() filterBy: string
    @Input() sortBy: string
    @Input() eventId: number
    visibleSessions: ISession[] = []

    constructor(private authService: AuthService,  private voterService: VoterService) {

    } 

    ngOnChanges(){
        if(this.sessions) { //If we have sessions.  Because this gets fired whenever either input gets changed.  We dont want to apply this unless the sessions are set
            this.filterSessions(this.filterBy)
            this.sortSessions(this.sortBy)
        }
    }

    toggleVote(session: ISession) {
        if (this.userHasVoted(session)) {
            this.voterService.deleteVoter(this.eventId, session, this.authService.currentUser.userName)
        } else {
            this.voterService.addVoter(this.eventId, session, this.authService.currentUser.userName)
        }

        if(this.sortBy === 'votes') {
            this.visibleSessions.sort(sortByVotesDesc);
        }
    }

    userHasVoted(session: ISession){
        return this.voterService.userHasVoted(session, this.authService.currentUser.userName);
    }

    filterSessions(filter: string){
        console.log("Performing filter: " + filter)
        if(filter === 'all'){
            this.visibleSessions = this.sessions.slice(0)
        } else {
            this.visibleSessions = this.sessions.filter(s => {return s.level.toLocaleLowerCase() === filter})
        }
    }

    sortSessions(sortBy: string) {
        console.log("Performing sort: " + sortBy)
        if(sortBy === 'votes') {
            this.visibleSessions.sort(sortByVotesDesc)
        } else { //name
            this.visibleSessions.sort(sortByNameAsc)
        }
    }
}

function sortByNameAsc(s1: ISession, s2: ISession): number {
    if(s1.name > s2.name) {
        return 1
    } else if (s1.name === s2.name){
        return 0
    } else {
        return -1
    }
}

function sortByVotesDesc(s1: ISession, s2: ISession): number {
    return s2.voters.length - s1.voters.length
}