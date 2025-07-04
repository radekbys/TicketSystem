import { Component, signal, OnInit } from '@angular/core';
import { TicketsService } from '../tickets.http.service';
import { ITicket } from '../model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tickets',
  imports: [RouterLink],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css',
})
export class Tickets implements OnInit {
  tickets = signal<ITicket[]>([]);

  // inject service handling backend comunication
  constructor(private ticketsService: TicketsService) {}

  // load list of tickets on initialization
  ngOnInit(): void {
    this.ticketsService.getTickets().subscribe({
      next: (data) => this.tickets.set(data.tickets),
      error: (err) => console.error('Failed to load tickets', err),
    });
  }
}
