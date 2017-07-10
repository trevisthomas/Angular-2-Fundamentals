import { Injectable } from '@angular/core'
import { ISession } from '../shared/event.model'
// import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router'
// import { EventService } from '../shared/event.service'


@Injectable()
export class VoterService{
    // constructor(private eventService: EventService, private router: Router) {

    // }

    deleteVoter(session: ISession, voterName: string) {
        session.voters = session.voters.filter( voter => voter !== voterName)
    }

    addVoter(session: ISession, voterName: string) {
        session.voters.push(voterName)
    }

    userHasVoted(session: ISession, voterName: string) {
        return session.voters.some(voter => voter === voterName)
    }
}