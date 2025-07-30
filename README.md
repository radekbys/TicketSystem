# TicketSystem
This is a recruitment assignment from NOTBUG company. Styling was not a part of this assignment, so it contains barely any css.

backend contains a django rest-framework app
frontend contains an angular application

### to run app use "nvm use" to set correct node version, 
### then navigate to TicketSystem-frontend and run "npm install && npm start", 
### should be working, because backend is already hosted

backend is hosted using google cloud run service https://ticketsystem-326356427471.europe-west1.run.app
backend endpoints:

1. Getting JWT token POST
https://ticketsystem-326356427471.europe-west1.run.app/api/token/ 
{
  "username": "radekbys",
  "password": "password"
}

2. List GET
   
https://ticketsystem-326356427471.europe-west1.run.app/api/tickets/

3. Get details GET
   
https://ticketsystem-326356427471.europe-west1.run.app/api/tickets/<id>/

4. Update PUT
   
https://ticketsystem-326356427471.europe-west1.run.app/api/tickets/<id>/

{
      "title": "test",
      "content": "this is a post test ticket",
      "status": "Closed"
}

5. add a new ticket POST
   
https://ticketsystem-326356427471.europe-west1.run.app/api/tickets/

{
  "title": "test",
  "content": "this is a post test ticket",
  "status": "Open"
}

6. DELETE
    
http://127.0.0.1:8000/api/tickets/<id>/


backend has been tested using Hoppscotch, requests for testing included in TicketSystem_Hoppscotch.json

Dockerfile is used by googgle cloud run service, works also for offline use
