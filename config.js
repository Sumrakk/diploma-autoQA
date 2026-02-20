import dotenv from 'dotenv';
dotenv.config();
export const config = {
  apiKey: process.env.NASA_API_KEY
};