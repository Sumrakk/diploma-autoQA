import { test as base } from '@playwright/test';
import { NasaService } from '../services/nasa.service.js';

export const test = base.extend({
  nasa: async ({ request }, use) => {
    const baseURL = process.env.API_BASE_URL;
    const nasaService = new NasaService(request);
    await use(nasaService);
  }
});