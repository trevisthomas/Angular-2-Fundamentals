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
import { TOASTR_TOKEN, Toastr } from './common/toastr.service'
import { CollapsibleWell } from './common/collapsible-well.component'
import { appRoutes } from './routes'
import { Error404Component } from './errors/404.component'
import { AuthService } from './user/auth.service'

declare let toastr

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
        DurationPipe
    ],
    providers: [
        EventService, 
        {
            provide: TOASTR_TOKEN,
            useValue: toastr
        }, 
        EventRouteActivator,
        {
            provide: 'canDeactivateCreateEvent',
            useValue: checkDirtyState
        },
        EventListResolver,
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