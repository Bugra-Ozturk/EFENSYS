import express from "express";
import bookRoute from './routes/bookRoute.js';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js'; // dashboard
import sensorRoute from './routes/sensorRoute.js';
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app = express();

const PORT = process.env.port || 3000;

const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/v1/books', bookRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute); // dashboard
app.use('/api/v1/sensors', sensorRoute);

try {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
  });
} catch (error) {
  console.error('Error connecting to the database', error);
  process.exit(1);
}
