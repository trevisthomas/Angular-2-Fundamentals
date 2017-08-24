import { Injectable } from '@angular/core'
import { ISession } from '../shared/event.model'
import { Http, Response, RequestOptions, Headers } from '@angular/http'
import { Subject, Observable } from 'rxjs/RX'

@Injectable()
export class VoterService{
    // constructor(private eventService: EventService, private router: Router) {

    // }

    constructor(private http: Http) {

    }

    deleteVoter(eventId: number, session: ISession, voterName: string) {
        session.voters = session.voters.filter( voter => voter !== voterName)

        let headers = new Headers({'Content-Type': 'application/json'})
        let options = new RequestOptions({ headers: headers})

        let url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`

        this.http.delete(url, options).catch(this.handleError).subscribe()
    }

    addVoter(eventId: number, session: ISession, voterName: string) {
        session.voters.push(voterName)
        
        let headers = new Headers({'Content-Type': 'application/json'})
        let options = new RequestOptions({ headers: headers})
        console.log("Saving: " + event)

        let url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`

        this.http.post(url, JSON.stringify({}), options).catch(this.handleError).subscribe()
    }

    userHasVoted(session: ISession, voterName: string) {
        return session.voters.some(voter => voter === voterName)
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText)
    }
}