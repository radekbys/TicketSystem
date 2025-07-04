import { Component, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TicketsService } from '../tickets.http.service';
import { ITicket } from '../model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticket-details',
  imports: [RouterLink, CommonModule],
  templateUrl: './ticket-details.html',
  styleUrl: './ticket-details.css',
})
export class TicketDetails implements OnInit {
  id = input.required<string>();
  ticket = signal<ITicket | undefined>(undefined);

  constructor(private ticketsService: TicketsService) {}

  ngOnInit(): void {
    this.ticket.set(this.ticketsService.getTicket(this.id()));
  }
}
