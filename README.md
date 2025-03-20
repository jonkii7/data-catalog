# Data Catalog API

Simplified version of a Data Catalog API service that manages the core entities and their relationships. This service will be used by data teams to organise their event tracking and ensure data quality through validation schemas.

## Features
- Retrieve, create, update, and delete properties
- Retrieve, create, update, and delete events
- Associate properties with events
- Retrieve, create and delete tracking plans
- Associate events with tracking plans

## Technologies Used

- **Node.js** - Backend framework
- **Express.js** - Web server framework
- **PostgreSQL** - Database for storing events, properties, and tracking plans
- **Docker** - For containerizing the application and database

## Prerequisites

- **Docker** and **Docker Compose**: For running the application and database in containers.

## Project Setup
1. **Clone the repository**
```bash
git clone https://github.com/jonkii7/data-catalog.git
cd data-catalog
```

2. **Docker setup**

This project uses Docker for both the Node.js application and PostgreSQL database.

Build the Docker Images and Start Containers
Run the following command to build and start the Docker containers:
```bash
docker-compose up --build
```
  This will:

- Build the Docker images for the application and PostgreSQL database.
- Start both containers.

3. **Database Setup**
The PostgreSQL database will be automatically set up with Docker. The migrations and schema creation will occur as the containers start up.

4. **Running the Application**
Once the containers are up and running, the backend API will be accessible at http://localhost:3000.
You can see below the available endpoints.
---
## API Routes Documentation

### Properties Routes

#### `GET /properties`
Retrieve all properties.

#### `GET /properties/:pid`
Retrieve a property by id.

#### `POST /properties`
Create a new property.

#### `PUT /properties/:pid`
Update a property by id.

#### `DELETE /properties/:pid`
Delete a property by id.

---

### Events Routes

#### `GET /events`
Retrieve all events.

#### `GET /events/:eid`
Retrieve an event by id.

#### `POST /events`
Create a new event.

#### `PUT /events/:eid`
Update an event by id.

#### `DELETE /events/:eid`
Delete an event by id.

#### `POST /events/:eid/properties`
Add properties to an event.

#### `DELETE /events/:eid/properties/:pid`
Remove a property from an event.

---

### Tracking Plans Routes

#### `GET /tracking-plans/:tid`
Retrieve a tracking plan by id.

#### `POST /tracking-plans`
Create a new tracking plan.

#### `DELETE /tracking-plans/:tid`
Delete a tracking plan by id.

#### `POST /tracking-plans/:tid/events`
Add events to a tracking plan.

#### `DELETE /tracking-plans/:tid/events/:eid`
Remove an event from a tracking plan.

## Future improvements
- Add `GET /tracking-plans` endpoint to get all tracking plans
- Add `PUT /tracking-plans/:tid` endpoint to update a tracking plan
- Each event has **additionalProperties** key which defines if undefined properties are allowed to be present in the event or not. Ask about this and implement it properly.
- Each property within the event has **required** key which defines if property is mandatory on the event or not. Ask about this and implement it properly.
- API documentation using Swagger
- Implement tests for the application
- Create .env file and take all environmental variables from it. I didn't add it because now is easier to run it, without the need to create .env .
- API security implementations