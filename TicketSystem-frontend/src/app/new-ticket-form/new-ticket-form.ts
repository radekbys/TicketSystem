import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TicketsService } from '../tickets.http.service';

@Component({
  selector: 'app-new-ticket-form',
  imports: [RouterLink, FormsModule],
  templateUrl: './new-ticket-form.html',
  styleUrl: './new-ticket-form.css',
})
export class NewTicketForm {
  title = signal('');
  details = signal('');
  success = signal('');

  constructor(private ticketsService: TicketsService) {}

  submitForm() {
    this.ticketsService.createTicket(this.title(), this.details()).subscribe({
      next: (data) => {
        this.success.set(`ticket: ${data.title} was uploaded successfully`);
      },
      error: (err) => console.error('Failed to upload ticket', err),
    });
    this.title.set('');
    this.details.set('');
  }
}
