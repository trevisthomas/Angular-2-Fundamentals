import { Routes } from '@angular/router'
import { EventsListComponent } from './events/events-list.component'
import { EventDetailsComponent } from './events/event-details/event-details.component'
import { CreateEventComponent } from './events/create-event.component'

export const appRoutes: Routes = [
    //Order here is important!
    { path: 'events/new', component: CreateEventComponent },
    { path: 'events', component: EventsListComponent  },
    { path: 'events/:id', component: EventDetailsComponent  },
    { path: '', redirectTo: '/events', pathMatch: 'full' }
    
]