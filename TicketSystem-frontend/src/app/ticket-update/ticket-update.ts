import { Component, input, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TicketsService } from '../tickets.service';

@Component({
  selector: 'app-ticket-update',
  imports: [RouterLink],
  templateUrl: './ticket-update.html',
  styleUrl: './ticket-update.css',
})
export class TicketUpdate implements OnInit {
  id = input.required<string>(); // selected ticket id
  status = signal<string>(''); // selected ticket current status, to be displayed

  constructor(private ticketsService: TicketsService, private router: Router) {}

  ngOnInit(): void {
    // get the current status
    const ticket = this.ticketsService.getTicket(this.id());
    this.status.set(ticket?.status ?? 'not found');

    // if no status found redirect to main page
    if (this.status() === 'not found') this.router.navigate(['/tickets']);
  }

  setStatus(status: string) {
    this.ticketsService.setStatus(this.id(), status);
    this.router.navigate(['/tickets']);
  }
}
