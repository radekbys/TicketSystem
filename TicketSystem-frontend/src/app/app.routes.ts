import { Routes } from '@angular/router';
import { Tickets } from './tickets/tickets';
import { NewTicketForm } from './new-ticket-form/new-ticket-form';
import { TicketDetails } from './ticket-details/ticket-details';
import { TicketRemoval } from './ticket-removal/ticket-removal';
import { TicketUpdate } from './ticket-update/ticket-update';

export const routes: Routes = [
  {
    //route to the mane page with ticket list
    path: 'tickets',
    component: Tickets,
  },
  {
    //route to the ticket creation form
    path: 'new-ticket',
    component: NewTicketForm,
  },
  {
    //route to the ticket details
    path: 'ticket-details/:id',
    component: TicketDetails,
  },
  {
    //route to the ticket deletion confirmation dialogue/view
    path: 'remove-ticket/:id',
    component: TicketRemoval,
  },
  {
    //route to the ticket deletion confirmation dialogue/view
    path: 'update-ticket/:id',
    component: TicketUpdate,
  },
  {
    path: '**',
    redirectTo: 'tickets',
  },
];
