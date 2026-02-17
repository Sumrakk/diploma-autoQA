import dotenv from 'dotenv';
dotenv.config();
export const config = {
  baseURL: 'https://api.nasa.gov',
  apiKey: process.env.NASA_API_KEY
};