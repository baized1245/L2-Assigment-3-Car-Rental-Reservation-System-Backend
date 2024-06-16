# Assigment-2

# Car Rental Reservation System Backend

## Introduction

This is the backend for a Car Rental Reservation System, built using TypeScript, Express.js, and MongoDB with Mongoose ODM. The application allows users and administrators to manage car rentals with features such as authentication, authorization, CRUD operations, and transactional support.

## Features

### Admin Actions

- **Car Management**: Create, update, and soft delete car entries.
- **Booking Oversight**: View all bookings.
- **Ride Cost Calculation**: Calculate and update the total cost of completed rentals.

### User Actions

- **Book a Ride**: Book a car by specifying carId and startTime.
- **Rental History**: View booking history.

## Models

### User Model

- `name`: Name of the user.
- `email`: Contact email address.
- `role`: User role (`user` or `admin`).
- `password`: Account password.
- `phone`: Contact phone number.
- `address`: Physical address.

### Car Model

- `name`: Name of the car.
- `description`: Description of the car.
- `color`: Color of the car.
- `isElectric`: Boolean indicating if the car is electric.
- `status`: Availability status of the car (default: `available`).
- `features`: Array of car features (e.g., `["Bluetooth", "AC", "Sunroof"]`).
- `pricePerHour`: Cost per hour for renting the car.
- `isDeleted`: Boolean indicating if the car has been soft deleted (default: `false`).

### Booking Model

- `date`: Date of the booking.
- `user`: Reference to the user who made the booking.
- `car`: Reference to the booked car.
- `startTime`: Start time of the booking in 24-hour format.
- `endTime`: End time of the booking in 24-hour format.
- `totalCost`: Total cost of the booking (default: `0`).

## API Endpoints

### Authentication

- **Sign Up**: `/api/auth/signup` (POST)
- **Sign In**: `/api/auth/signin` (POST)

### Car Management (Admin Only)

- **Create a Car**: `/api/cars` (POST)
- **Get All Cars**: `/api/cars` (GET)
- **Get A Car**: `/api/cars/:id` (GET)
- **Update A Car**: `/api/cars/:id` (PUT)
- **Delete A Car**: `/api/cars/:id` (DELETE)

### Booking Management

- **Get All Bookings (Admin Only)**: `/api/bookings` (GET)
- **Book a Car**: `/api/bookings` (POST)
- **Get User's Bookings**: `/api/bookings/my-bookings` (GET)
- **Return The Car (Admin Only)**: `/api/cars/return` (PUT)

## Error Handling

- **No Data Found**: Returns 404 with a message "No data found."
- **Global Error Handling Middleware**: Catches and handles errors, providing appropriate error responses with status codes and error messages.
- **Not Found Route**: Global handler for unmatched routes, responding with a message "Not Found."

## Authentication Middleware

- Ensures that only users and admins can access their respective routes.
- Returns 401 with a message "You have no access to this route" if access is denied.

## Validation

- Uses Zod for input validation, ensuring data consistency.
- Returns 400 Bad Request with detailed error messages if validation fails.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/car-rental-backend.git
   ```
2. Install dependencies:
   ```sh
   cd car-rental-backend
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```sh
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

### Running the Application

```sh
npm run dev

```
