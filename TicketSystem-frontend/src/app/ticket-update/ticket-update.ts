import { Component, input, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TicketsService } from '../tickets.http.service';

@Component({
  selector: 'app-ticket-update',
  imports: [RouterLink],
  templateUrl: './ticket-update.html',
  styleUrl: './ticket-update.css',
})
export class TicketUpdate implements OnInit {
  id = input.required<string>(); // selected ticket id
  status = signal<string>(''); // selected ticket current status, to be displayed
  title = '';
  content = '';

  // injecting httpservice and router in constructor
  constructor(private ticketsService: TicketsService, private router: Router) {}

  // loading current info about selected ticket on initialization
  ngOnInit(): void {
    this.ticketsService.getTicket(this.id()).subscribe({
      next: (data) => {
        this.status.set(data.status);
        this.title = data.title;
        this.content = data.content;
      },
      error: (err) => console.error('Failed to load tickets', err),
    });
  }

  // sending a put request with new status
  setStatus(status: string) {
    this.ticketsService
      .setStatus(this.id(), status, this.title, this.content)
      .subscribe({
        next: () => this.router.navigate(['/tickets']),
      });
  }
}
