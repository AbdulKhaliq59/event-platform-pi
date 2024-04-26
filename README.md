## Event Management Platform

A Backend API for managing events organized by company, enabling users to browse upcoming events, book tickets, and manage their bookings, while administrators have access to an admin dashboard for event management.

### Documentation

#### Endpoints:

- `/: GET`- Home welcome message
- `/signup: POST`- Create new account
- `/signin: POST`- Login
- `/event: POST`- Create new event
- `/events: GET `- Retrieve a list of upcoming events.
- `/event/{id}: GET `- Retrieve details of a specific event.
- `/event/{id}: DELETE `- Delete specific event.
- `/event/{id}: PATCH `- Update specific event.
- `/booking: POST` - user make booking
- `/user/tickets: GET `- Retrieve bookings made by user.
- `/user/tickets/{id}: DELETE` - Cancel bookings made user.
- `/booked-tickets: GET`- get booked tickets information

### Getting Started

1. clone the this repository: `git clone` [event-platform-api](https://github.com/AbdulKhaliq59/event-platform-pi)
2. Navigate to the backend directory `cd event-platform-pi`
3. Install dependencies: `npm install`
4. Set up environment variable: Create `.env` file add variable referred to the `.env.example`
5. Configure `MONGO DB` locally or remotely
6. Configure `Cloudinary`

### Run The Service

1. Open terminal
2. Run the backend server: `npm run dev`
3. test `http://localhost:4040`

## Testing

- Open `Postman` or any other App for `API Testing`
- Test this link [event-MP-API](https://event-platform-pi.onrender.com)

### Dependencies

- @hapi/joi
- axios
- bcrypt
- body-parser
- cloudinary
- cors
- dotenv
- express
- jsonwebtoken
- joi
- moment
- mongoose


#### CREDENTIALS

##### Admin

- email: `admin@example.com`
- password: `password@12345`