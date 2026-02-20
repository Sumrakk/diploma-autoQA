import { config } from '../../config.js';

export class NasaService {
  constructor(request) {
    this.request = request;
    this.baseURL = baseURL;
  }

  async getApod(params = {}) {
    return await test.step('Получить Astronomy Picture of the Day', async () => {
      return this.request.get(`${this.baseURL}/planetary/apod`, {
        params: {
          api_key: process.env.NASA_API_KEY,
          ...params
        }
      });
    });
  }

  async getEpic(params) {
    return await test.step('Получить геомагнитные бури', async () => {
      return this.request.get(`${this.baseURL}/DONKI/GST`, {
        params: {
          api_key: process.env.NASA_API_KEY,
          ...params
        }
      });
    });
  }

  async getAsteroids(params) {
    return await test.step('Получить астероиды', async () => {
      return this.request.get(`${this.baseURL}/neo/rest/v1/feed`, {
        params: {
          api_key: process.env.NASA_API_KEY,
          ...params
        }
      });
    }); 
  }
}