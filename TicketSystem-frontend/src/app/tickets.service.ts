import { Injectable, WritableSignal } from '@angular/core';
import { ITicket } from './model';

@Injectable({ providedIn: 'root' })
export class TicketsService {
  private tickets: ITicket[];

  constructor() {
    this.tickets = [
      {
        id: '1',
        title: 'Login not working',
        content: 'User unable to log in with valid credentials.',
        status: 'Open',
        creationDate: '2025-07-01T10:30:00Z',
      },
      {
        id: '2',
        title: 'Error on checkout page',
        content: 'Unexpected 500 error when submitting the checkout form.',
        status: 'In Progress',
        creationDate: '2025-06-28T15:45:00Z',
      },
      {
        id: '3',
        title: 'Feature request: Dark mode',
        content: 'Would love to have a dark mode toggle in settings.',
        status: 'Closed',
        creationDate: '2025-06-20T09:00:00Z',
      },
      {
        id: '4',
        title: 'Missing translation on homepage',
        content: "The 'Contact us' button is not translated to French.",
        status: 'Open',
        creationDate: '2025-06-30T13:20:00Z',
      },
    ];
  }

  getTickets() {
    return this.tickets;
  }

  getTicket(id: string) {
    return this.tickets.find((t) => t.id === id);
  }

  createTicket(title: string, details: string) {
    const date = new Date(Date.now()).toString();
    const id = Date.now().toString();
    const status = 'Open';

    const newTicket = {
      id: id,
      title: title,
      content: details,
      status: status,
      creationDate: date,
    };

    this.tickets.push(newTicket);
  }

  deleteTicket(id: string) {
    this.tickets = this.tickets.filter((t) => t.id !== id);
  }

  setStatus(id: string, status: string) {
    for (let i = 0; i < this.tickets.length; i++) {
      if (this.tickets[i].id === id) {
        this.tickets[i].status = status;
      }
    }
  }
}
