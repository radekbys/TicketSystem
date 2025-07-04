import { Injectable } from '@angular/core';
import { ITicket, ITickets, ITokenCredentials } from './model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject, switchMap } from 'rxjs';

// this is a service responsible for communication with the backend
// it is an injectable, there is only one instance of it in the project
@Injectable({ providedIn: 'root' })
export class TicketsService {
  private token$ = new ReplaySubject<ITokenCredentials>(1); // Emits once when token arrives
  private baseUrl = 'https://ticketsystem-326356427471.europe-west1.run.app'; // base url to the hosted backend

  constructor(private httpClient: HttpClient) {
    // in this constructor I request jwt token from the backend

    const url = `${this.baseUrl}/api/token/`;
    const body = JSON.stringify({ username: 'radekbys', password: 'password' });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });

    this.httpClient.post<ITokenCredentials>(url, body, { headers }).subscribe({
      next: (token) => {
        this.token$.next(token);
        this.token$.complete(); // Ensures late subscribers still get the value
      },
      error: (err) => {
        console.error('Login failed', err);
        this.token$.error(err);
      },
    });
  }

  // Gets the observable with a list of all tickets
  getTickets(): Observable<ITickets> {
    return this.token$.pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token.access}`,
        });
        return this.httpClient.get<ITickets>(`${this.baseUrl}/api/tickets/`, {
          headers,
        });
      })
    );
  }

  // Gets the observable with the ticket of a given id
  getTicket(id: string): Observable<ITicket> {
    return this.token$.pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token.access}`,
        });
        return this.httpClient.get<ITicket>(
          `${this.baseUrl}/api/tickets/${id}`,
          {
            headers,
          }
        );
      })
    );
  }

  // sends a post request to the server with a new ticket
  createTicket(title: string, details: string): Observable<ITicket> {
    return this.token$.pipe(
      switchMap((token) => {
        const body = JSON.stringify({
          title: title,
          content: details,
          status: 'Open',
        });
        const headers = new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${token.access}`,
        });

        return this.httpClient.post<ITicket>(
          `${this.baseUrl}/api/tickets/`,
          body,
          {
            headers,
          }
        );
      })
    );
  }

  // send a delete request and return observable
  deleteTicket(id: string) {
    return this.token$.pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token.access}`,
        });
        return this.httpClient.delete(`${this.baseUrl}/api/tickets/${id}/`, {
          headers,
        });
      })
    );
  }

  // send a put request and return observable
  setStatus(id: string, status: string, title: string, content: string) {
    return this.token$.pipe(
      switchMap((token) => {
        const body = JSON.stringify({
          title: title,
          content: content,
          status: status,
        });
        const headers = new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${token.access}`,
        });

        return this.httpClient.put<ITicket>(
          `${this.baseUrl}/api/tickets/${id}/`,
          body,
          {
            headers,
          }
        );
      })
    );
  }
}
