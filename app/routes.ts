import { Routes } from '@angular/router'
import { EventsListComponent } from './events/events-list.component'
import { EventDetailsComponent } from './events/event-details/event-details.component'
import { CreateEventComponent } from './events/create-event.component'
import { Error404Component } from './errors/404.component'
import { EventRouteActivator } from './events/event-details/event-route-activator.service'


export const appRoutes: Routes = [
    //Order here is important!
    { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
    { path: 'events', component: EventsListComponent  },
    { path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivator]  },
    { path: '404', component: Error404Component  },
    { path: '', redirectTo: '/events', pathMatch: 'full' }
    
]