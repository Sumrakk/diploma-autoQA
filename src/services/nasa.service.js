import { config } from '../../config.js';

export class NasaService {
  constructor(request) {
    this.request = request;
  }

  async getApod(params = {}) {
    return this.request.get(`${config.baseURL}/planetary/apod`, {
      params: {
        api_key: config.apiKey,
        ...params
      }
    });
  }

  async getEpic(date) {
    return this.request.get(`${config.baseURL}/EPIC/api/natural/date/${date}`, {
      params: {
        api_key: config.apiKey,
      }
    });
  }

  async getAsteroids(params) {
    return this.request.get(`${config.baseURL}/neo/rest/v1/feed`, {
      params: {
        api_key: config.apiKey,
        ...params
      }
    });
  }
}