import { Component, signal } from '@angular/core';
import { TicketsService } from '../tickets.http.service';
import { ITicket } from '../model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tickets',
  imports: [RouterLink],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css',
})
export class Tickets {
  tickets = signal<ITicket[]>([]);

  // below I use constructor to inject service handling backend comunication
  constructor(private ticketsService: TicketsService) {
    this.tickets.set(this.ticketsService.getTickets());
  }
}
