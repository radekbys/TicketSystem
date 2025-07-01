import { Routes } from '@angular/router';
import { Tickets } from './tickets/tickets';
import { NewTicketForm } from './new-ticket-form/new-ticket-form';
import { TicketDetails } from './ticket-details/ticket-details';
import { TicketRemoval } from './ticket-removal/ticket-removal';
import { TicketUpdate } from './ticket-update/ticket-update';

export const routes: Routes = [
  {
    path: 'tickets',
    component: Tickets,
  },
  {
    path: 'new-ticket',
    component: NewTicketForm,
  },
  {
    path: 'ticket-details',
    component: TicketDetails,
  },
  {
    path: 'remove-ticket',
    component: TicketRemoval,
  },
  {
    path: 'update-ticket',
    component: TicketUpdate,
  },
  {
    path: '**',
    redirectTo: 'tickets',
  },
];
