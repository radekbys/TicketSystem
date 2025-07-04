export interface ITicket {
  // interface representing ticket object as should be recieved from the backend
  id: string;
  title: string;
  content: string;
  status: string;
  creationDate: string;
}

export interface ITokenCredentials {
  // represents object returned by token post request
  refresh: string;
  access: string;
}

export interface ITickets {
  // represents object returned by list get request
  tickets: ITicket[];
}
