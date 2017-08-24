import { VoterService } from './voter.service'
import { ISession } from '../shared/event.model'
import { Observable } from 'rxjs/RX'


describe('Voter Service', () => {
    let voterService: VoterService
    let mockHttp

    beforeEach(()=>{
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post'])
        voterService = new VoterService(mockHttp)
    })

    describe('delete voter', ()=>{
        it('should delete voter from the list of voters', ()=>{
            var session = { id: 6, voters: ["joe", "john"] }

            mockHttp.delete.and.returnValue(Observable.of(false))
            voterService.deleteVoter(3, <ISession>session, "joe")

            expect(session.voters.length).toBe(1)
            expect(session.voters[0]).toBe("john")
        })
        it('Should call http delete with the right value', ()=>{
            // /api/events/${eventId}/sessions/${session.id}/voters/${voterName}
            var session = { id: 6, voters: ["joe", "john"] }

            mockHttp.delete.and.returnValue(Observable.of(false))
            voterService.deleteVoter(3, <ISession>session, "joe")

            expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe', jasmine.any(Object))
        })
    })

    describe('add voter', ()=>{
         it('Should call http delete with the right value', ()=>{
            // /api/events/${eventId}/sessions/${session.id}/voters/${voterName}
            var session = { id: 6, voters: [, "john"] }

            mockHttp.post.and.returnValue(Observable.of(false))
            voterService.addVoter(3, <ISession>session, "joe")

            expect(mockHttp.post).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe', "{}", jasmine.any(Object))
        })
    })
})
