import { config } from '../../config.js';

export class NasaService {
  constructor(request) {
    this.request = request;
  }

  async getApod(params = {}) {
    return this.request.get(`${config.baseURL}/planetary/apod`, {
      params: {
        api_key: process.env.NASA_API_KEY,
        ...params
      }
    });
  }

  async getEpic(params) {
    return this.request.get(`${config.baseURL}/DONKI/GST`, {
      params: {
        api_key: process.env.NASA_API_KEY,
        ...params
      }
    });
  }

  async getAsteroids(params) {
    return this.request.get(`${config.baseURL}/neo/rest/v1/feed`, {
      params: {
        api_key: process.env.NASA_API_KEY,
        ...params
      }
    });
  }
}