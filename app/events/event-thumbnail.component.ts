import { Component, Input, Output, EventEmitter } from '@angular/core'

/*Note: You can also hide things like this: <div [hidden] = "!event?.onlineUrl"> 
this allows you to use html to show and hide, as opposed to using *ngIf which 
removes the entire element from the dom completely.
*/
@Component({
    selector: 'event-thumbnail',
    template: `
        <div [routerLink]="['/events', event.id]" class="well hoverwell thumbnail">
            <h2>{{event.name}}</h2>
            <div>Date: {{event?.date}}</div>

            <div [ngClass] = "getStartTimeClass()" [ngSwitch] = "event?.time">
                Time: {{event?.time}}
                <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
                <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
                <span *ngSwitchDefault>(Normal Start)</span>
            </div>
            <div>Price: \${{event?.price}}</div>
            <div *ngIf="event?.location">
                <span>Location: {{event?.location?.address}}</span>
                <span class="pad-left"></span>
                <span>{{event?.location?.city}}, {{event?.location?.country}}</span>
            </div>
            <div *ngIf="event?.onlineUrl">
                <span>Online URL: {{event?.onlineUrl}}</span>
            </div>
        </div>
    `, 
    styles : [`
        .green {color: green; !important;}
        .bold {font-weight: bold;}
        .thumbnail { min-height: 210px; }
        .pad-left { margin-left: 10px; }
        .well { color: #bbb;}
    `]
})
export class EventThumbnailComponent {
    @Input() event : any //Typescript varible declaration
    @Output() eventClick = new EventEmitter()

    someProperty:any = "Some message"

    getStartTimeClass(){
        if (this.event && this.event.time ==='8:00 am') {
            /**
             * You can return an object where the keys are the style elements and 
             * the vales are truthy functions.
             * 
             * You can return a string of space seperated class names.
             * 
             * or you can return an array of class names
             */
            return ['green', 'bold'] 
        } else {
            return []
        }
    }
    
}