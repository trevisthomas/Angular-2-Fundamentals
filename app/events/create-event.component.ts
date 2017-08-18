import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { EventService } from './shared/event.service'

@Component({
    templateUrl: 'app/events/create-event.component.html',
    styles: [`
    em { float: right; color:#E05C65; padding-left:10px;}
    .error input, .error select, .error textarea {background-color: #E3C3C5;}
    .error ::-webkit-input-placeholder { color: #999; }
    .error ::-moz-placeholder { color: #999; }
    .error :-moz-placeholder { color: #999; }
    .error :-ms-input-placeholder { color: #999; }
  `]
})
export class CreateEventComponent {
    constructor (private router: Router, private eventService: EventService) {

    }

    cancel (){
        this.router.navigate(['/events'])
    }

    isDirty: Boolean = true

    saveEvent(formValues){
        console.log("Save called")

        
        this.eventService.saveEvent(formValues).subscribe(event => {
            this.isDirty = false
            this.router.navigate(['/events'])
        })
        
    }
}