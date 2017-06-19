import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'



import {
    EventsListComponent,
    EventThumbnailComponent,
    EventService,
    EventDetailsComponent,
    EventRouteActivator,
    EventListResolver,
    CreateEventComponent,
    CreateSessionComponent,
    SessionListComponent,
    DurationPipe
} from './events/index'

import { EventsAppComponent } from './events-app.component'
import { NavBarComponent } from './nav/navbar.component'
import { 
    TOASTR_TOKEN, 
    Toastr, 
    CollapsibleWell, 
    JQ_TOKEN,
    SimpleModalComponent,
    ModalTriggerDirective
} from './common/index'

import { appRoutes } from './routes'
import { Error404Component } from './errors/404.component'
import { AuthService } from './user/auth.service'

declare let toastr
declare let jQuery: Object 

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        FormsModule, ReactiveFormsModule],
        
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        NavBarComponent,
        EventDetailsComponent,
        CreateEventComponent,
        Error404Component,
        CreateSessionComponent,
        SessionListComponent,
        CollapsibleWell,
        DurationPipe,
        SimpleModalComponent,
        ModalTriggerDirective
    ],
    providers: [
        EventService, 
        {
            provide: TOASTR_TOKEN,
            useValue: toastr
        },
        { provide: JQ_TOKEN, useValue: jQuery}, 
        EventRouteActivator,
        {
            provide: 'canDeactivateCreateEvent',
            useValue: checkDirtyState
        },
        { //Note! This long hand way allows you to return a different class instance than the Provide.  He gave an example of using a specific logger, like FileLogger
            provide: EventListResolver,
            useClass: EventListResolver
        }
        ,
        AuthService, //Notie that services providers can be registered at the app level even if they are defined in a sub module.  Note that this is only true for providers, not imports or declarations
    ],
    bootstrap: [EventsAppComponent]
})

export class AppModule {}



function checkDirtyState(component: CreateEventComponent){

    if(component.isDirty) {
        return window.confirm('You have not saved this event, do you really want to cancel?')
    }
    return true
    
}