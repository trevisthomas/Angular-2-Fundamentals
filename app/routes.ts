import { Routes } from '@angular/router'

import {
    EventsListComponent,
    EventDetailsComponent,
    EventListResolver,
    EventResolver,
    // EventRouteActivator,
    CreateEventComponent,
    CreateSessionComponent
} from './events/index'

import { Error404Component } from './errors/404.component'

export const appRoutes: Routes = [
    //Order here is important!
    { path: 'events/new', component: CreateEventComponent },
    { 
        path: 'events', 
        component: EventsListComponent, 
        resolve: { 
            events: EventListResolver 
        }  
    },

    { path: 'events/:id', component: EventDetailsComponent, resolve: {event: EventResolver}},
    { path: '404', component: Error404Component  },
    { path: '', redirectTo: '/events', pathMatch: 'full' },
    { path: 'user', loadChildren: 'app/user/user.module#UserModule' },
    { path: 'events/session/new', component: CreateSessionComponent }
    
]