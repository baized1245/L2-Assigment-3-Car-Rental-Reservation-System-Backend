import express, { Application, Request, Response } from 'express';
import cors from 'cors';
// import { UserRoutes } from './app/modules/User/user.route';
import { AuthRoutes } from './app/modules/Auth/auth.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { CarRoutes } from './app/modules/Car/car.route';
import { BookingRoutes } from './app/modules/Booking/booking.route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send('Level 2 student');
});

// application routes
app.use('/api', AuthRoutes);
// app.use('/api', UserRoutes);
app.use('/api', CarRoutes);
app.use('/api', BookingRoutes);

app.use(globalErrorHandler);

// Handle not found route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Not Found',
  });
});

export default app;
