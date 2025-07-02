import { Component, input, signal, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TicketsService } from '../tickets.service';

@Component({
  selector: 'app-ticket-removal',
  imports: [],
  templateUrl: './ticket-removal.html',
  styleUrl: './ticket-removal.css',
})
export class TicketRemoval implements OnInit {
  id = input.required<string>();

  titleAndStatus = signal<string>('');

  constructor(private ticketsService: TicketsService, private router: Router) {}

  ngOnInit() {
    const ticket = this.ticketsService.getTicket(this.id());
    this.titleAndStatus.set(
      (ticket?.title ?? ' ') + ' | ' + (ticket?.status ?? ' ')
    );
  }

  deleteTicket() {
    this.ticketsService.deleteTicket(this.id());
    this.router.navigate(['/tickets']);
  }
  redirectToMainPage() {
    this.router.navigate(['/tickets']);
  }
}
