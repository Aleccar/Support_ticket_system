# support-ticket-system
A simple support ticket system that allows users create tickets stored in a PostgreSQL database. Support personnel are able to view all tickets, assign them to users, and write comments.

------

# Tech Stack
### *A quick summary of the tools used in the API.*
- Node.js & Express - Server and Routing
- Prisma - ORM for database logic
- jsonwebtoken & bcrypt - User authentication and password encryption
- dotenv - environment variable management 
- morgan - HTTP request logging

------

# API Endpoints
### *A brief summary of all the endpoints. for a more detailed view, see `api-docs.md` (WIP)*

## User Endpoints (`/user`)
- `POST /user/register`
*Registers a new user. Requires `username`, `email`, `password`, and `role`*
- `POST /user/login`    
*Validates user credentials and returns a JWT token* 
- `GET /user/me`
*Returns currently logged-in user's information*


## Ticket Endpoints (`/tickets`)
- `GET /tickets`
*Returns all tickets created by the logged-in user OR returns all tickets if the user is support staff*
- `GET /tickets/:id`
*Returns a ticket with the specified ID*
- `POST /tickets/create`
*Creates a new ticket. Requires `subject`, `category`, and `description`* 
- `PUT /tickets/:id`
*Updates a ticket. users can update personal tickets; support staff can update any*
- `DELETE /tickets/:id`
*Deletes personal tickets; support staff can delete any*

## Comment Endpoints (`/tickets/:id/comments`)
- `GET /tickets/:id/comments`     
*Returns all comments by ticket ID*
- `POST /tickets/:id/comments`
*Creates a comment. `comment` is required, `priority` is optional*
- `PUT /tickets/:id/comments`
*Updates an existing comment*
- `DELETE /tickets/:id/comments`
*Deletes a comment based on ID*
- `DELETE /tickets/:id/comments/all`
*Deletes all comments tied to a ticket ID*

------

# Set up
### *A quick guide to set up and run the project locally*

## 1. Clone the repository
```
git clone https://github.com/Aleccar/Support_ticket_system.git
cd Support_ticket_system
```

## Install dependencies
``` 
npm install 
```

## Set up environment variables
Create a `.env` file in the root directory with the following: 
```
PORT=the_port_you_want_to_use
DATABASE_URL=your_postgres_connection_url
JWT_SECRET=your_jwt_secret_key
```
- Replace `*the_port_you_want_to_use*`with whatever port you want the server to run on (optional, defaults to 3000).
- Replace `*your_postgres_connection_url*` with a local or remote PostreSQL database url. 
- Replace `*your_jwt_secret_key*` with a secure secret key for JWT signing.

## Set up database
Run the following command to apply the schema to your database:
```
npx prisma migrate dev --name init
```

## Start the server
```
npm run dev
```
Server should now run at: http://localhost:3000 