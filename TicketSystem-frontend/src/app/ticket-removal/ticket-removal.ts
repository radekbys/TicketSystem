import { Component, input, signal, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TicketsService } from '../tickets.http.service';

@Component({
  selector: 'app-ticket-removal',
  imports: [],
  templateUrl: './ticket-removal.html',
  styleUrl: './ticket-removal.css',
})
export class TicketRemoval implements OnInit {
  id = input.required<string>();

  titleAndStatus = signal<string>(''); // this is displayed after loading selected ticket

  // constructor injecting httpService and router
  constructor(private ticketsService: TicketsService, private router: Router) {}

  // load ddata for cvurrently selected ticket on initialization
  ngOnInit() {
    this.ticketsService.getTicket(this.id()).subscribe({
      next: (data) => {
        this.titleAndStatus.set(
          (data?.title ?? ' ') + ' | ' + (data?.status ?? ' ')
        );
      },
      error: (err) => console.error('Failed to load tickets', err),
    });
  }

  // remove ticket and redirect to main page when done
  deleteTicket() {
    this.ticketsService.deleteTicket(this.id()).subscribe({
      next: () => this.router.navigate(['/tickets']),
    });
  }

  // this fuction is called when user selects no
  redirectToMainPage() {
    this.router.navigate(['/tickets']);
  }
}
