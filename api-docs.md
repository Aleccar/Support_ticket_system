# Api Documentation 
A more **in-depth** description of all endpoints and how to call them.

## Table of Contents:
- [User Endpoints](#user-endpoints-user)
- [Ticket Endpoints](#ticket-endpoints-tickets)
- [Comment Endpoints](#comment-endpoints-ticketsidcomments)
- [Additional Information](#additional-information)

-----

## Example templates:
### User Endpoints (`/user`)

`POST /user/register`
Registers a new user.
**Request Body:**
```json
{
    "username" : "exampleUsername9000",
    "email": "example@email.com",
    "password": "ExAmpl3PaSSw0rD!",
    "role": "user | support"
}
```
**Response:**
- `201 Created:` - returns a success message on a successful registration.
- `400 Bad Request` - if required fields are missing.

-----
`POST /user/login`
Authenticates user credentials.
**Request Body:**
```json
{
    "email": "example@email.com",
    "password": "ExAmpl3PaSSw0rD!"
}
```
**Response:**
- `200 OK` - returns a JWT-token on correct format and matching credentials.
    ``` json
    {
        "token": "eyJhbGciOiPIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzYXJuYW1lIjoiQWxlY2NhciIsImVtYWlsIj4iYWxleGFuZGVyQHN0cmFuZC5pdCIsInJvbGUiOiJzd6Bwb3h0IiwiaWF0IjoxNzUxNTYxMTAzLsJleHAiqjE3NTE1NzE6MDs9.GXyknM3UO5NsazJ9xQsYwPuHfuJ7jtO0OQ4BN_4yNp4"
    }
    ```
(The token above is fake and for demonstration only.)
- `400 Bad Request` - If required fields are missing.

-----
`GET /user/me`
Fetches the currently logged in user.
**Headers:**
```http
Authorization: Bearer <token>
```
**Response:**
- `200 Success` - returns user information.
- `500 Bad Request` - If header is missing or incorrectly formatted.

-----

## Ticket Endpoints (`/tickets`)

`GET /tickets`
Fetches all tickets tied to user ID.
**Headers:**
```http
Authorization: Bearer <token>
```
**Response:**
- `200 OK` - Returns all ticket objects.
``` json
{
    "tickets": [
        {
            "id": number,
            "subject": "string",
            "category": "string",
            "description": "string",
            "status": "Open | In_Progress | Closed",
            "creator_id": number,
            "assigned_to": number,
            "created_at": "timestamp without time zone (6)",
            "updated_at": "timestamp without time zone (6)"
        }
    ]
}
```

- `401 Forbidden` - If header is missing or incorrectly formatted.

-----
`GET /tickets/:id`
Fetches a specific ticket by ID.
**Headers:**
```http
Authorization: Bearer <token>
```
**Response:**
- `200 OK` - Returns ticket objects.
``` json
{
    "id": integer,
    "subject": "string",
    "category": "string",
    "description": "string",
    "status": "Open | In_Progress | Closed",
    "creator_id": integer,
    "assigned_to": integer,
    "created_at": "timestamp without time zone (6)",
    "updated_at": "timestamp without time zone (6)"
}
```
- `403 Forbidden` - If the user is not the creator or support.
- `404 Not Found` - If the ticket with specified ID does not exist.

-----
`POST /tickets/create`
Creates a new ticket.
**Headers:**
```http
Authorization: Bearer <token>
```
**Request Body:**
```json
{
    "subject": "Example",
    "category": "Example 2",
    "description": "Example 3, but longer this time. Much longer in fact. I could go on for quite a while about how long this example can be... However, I will not."
}
```
**Response:**
`201 Created` - Returns a success message on creation.
`400 Bad Request` - If any required fields are missing.

-----
`PUT /tickets/:id`
Updates an existing ticket by ID.
**Headers:**
```http
Authorization: Bearer <token>
```
**Request Body:**
```json
{
    "subject": "user & support access.      string",
    "category": "user & support access.     string",
    "description": "user & support access.  string",
    "status": "support only access.         Open | In_Progress | Closed",
    "assigned_to": "support only access.    string"
}
```
**Response:**
`200 OK` - Returns a success message on successful update.
`400 Bad Request` - On faulty format of status.
`403 Forbidden` - If you are not support and are trying to update status or assigned_to.

-----
`DELETE /tickets/:id`
Deletes a ticket by specified ID.
**Headers:**
```http
Authorization: Bearer <token>
```
**Response:**
`200 OK` - Returns a success message on successful deletion.
`404 Not Found` - On trying to delete a ticket that does not exist.

-----

## Comment Endpoints (`/tickets/:id/comments`)
Only accessible to support users.

`GET /tickets/:id/comments`     
Fetches all comments tied to a specified Ticket-ID
**Headers:**
```http
Authorization: Bearer <token>
```
**Response:**
`200 OK` - returns all comments made on the specified Ticket-ID.
``` json
[
    {
        "id": integer,
        "ticket_id": integer,
        "priority": "Low | Medium | High",
        "comment": "string",
        "author_id": integer,
        "created_at": "timestamp without time zone (6)"
    }
]
```
`404 Not Found` - If there are not existing comments on the specified Ticket-ID.
`403 Forbidden` - If any non-support user tries to access comments.


-----
`POST /tickets/:id/comments`
Creates a new comment on a specified Ticket-ID.
**Headers:**
```http
Authorization: Bearer <token>
```
**Request Body:**
```json 
{
    "priority": "optional --- Low | Medium | High",
    "comment": "string"
}
```
**Response:**
`201 Created` - Returns a success message on successfully created comment.
`400 Bad Request` - On missing fields or incorrect types for priority.
`404 Not Found` - On trying to create a comment for a non-existing ticket.
`403 Forbidden` - On a non-support user attempting to create a comment.

-----
`PUT /tickets/:id/comments`
Updates an existing comment by ID.
**Headers:**
```http
Authorization: Bearer <token>
```
**Request Body:**
```json
{
    "priority": "optional --- Low | Medium | High",
    "comment": " optional --- string"
}
```
**Response:**
`200 OK` - Returns a success message on successfully updating a comment.
`400 Bad Request` - On missing both fields or incorrect types for priority.
`404 Not Found` - On trying to create a comment for a non-existing ticket.
`403 Forbidden` - On a non-support user attempting to create a comment.

-----
`DELETE /tickets/:id/comments`
Deletes a comment based on ID.
**Headers:**
```http
Authorization: Bearer <token>
```
**Response:**
`200 OK` - Returns a success message on successfully deleting a comment.
`404 Not Found` - On trying to delete a comment that does not exist.
`403 Forbidden` - On a non-support user attempting to delete a comment.

-----
`DELETE /tickets/:id/comments/all`
Deletes all comments tied to a ticket ID.
**Headers:**
```http
Authorization: Bearer <token>
```
**Response:**
`200 OK` - Returns a success message on successfully deleting comments.
`404 Not Found` - On deleting comments for a non-existing ticket, or when a ticket has no comments.
`403 Forbidden` - On a non-support user attempting to delete a comment.

-----

## Additional Information
For any server related issues a `500 Server Error` response will be thrown. 


There are a few `enum` types (pre-determined standard values) in the database. 
Those are as follows:
| Priority | status     | role     |
|:---      |   :----:   |     ----:|
| Low      | Open       | user     |
| Medium   | In_Progress| support  |
| High     | Closed     |          |

