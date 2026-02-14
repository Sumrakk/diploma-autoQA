import { test, expect } from '@playwright/test';
import { NasaService } from '../src/services/nasa.service.js';
import { faker } from '@faker-js/faker';

test.describe('NASA API', () => {

  test('1. Получение Astronomy Picture of the Day', async ({ request }) => {
    const nasa = new NasaService(request);

    const response = await nasa.getApod();
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('url');
    expect(body).toHaveProperty('media_type');
  });

  test('2. APOD с рандомной датой (faker)', async ({ request }) => {
    const nasa = new NasaService(request);

    const randomDate = faker.date
      .between({ from: '2018-01-01', to: '2026-01-01' })
      .toISOString()
      .split('T')[0];

    const response = await nasa.getApod({ date: randomDate });
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.date).toBe(randomDate);
  });

  test('3. APOD с невалидной датой (faker, негативный)', async ({ request }) => {
    const nasa = new NasaService(request);

    const invalidDate = faker.string.alphanumeric(10);

    const response = await nasa.getApod({ date: invalidDate });

    expect(response.status()).toBe(400);
  });

  test('EPIC - изображения за случайную дату)', async ({ request }) => {
    const nasa = new NasaService(request);

    const randomDate = faker.date
      .between({ from: '2023-01-01', to: '2023-12-31' })
      .toISOString()
      .split('T')[0];
      
    const response = await nasa.getEpic(randomDate);
    
    console.log(response);
    const body = await response.json();
    console.log(body);
    expect([200, 404]).toContain(response.status());

    if (response.status() === 200) {
      const body = await response.json();
      expect(Array.isArray(body)).toBe(true);
    }
});

  test('5. Астероиды за случайный диапазон дат (faker)', async ({ request }) => {
    const nasa = new NasaService(request);

    const startDate = faker.date.between({
      from: '2023-01-01',
      to: '2023-12-01'
    });

    const endDate = faker.date.soon({ days: 5, refDate: startDate });

    const start = startDate.toISOString().split('T')[0];
    const end = endDate.toISOString().split('T')[0];

    const response = await nasa.getAsteroids({
      start_date: start,
      end_date: end
    });

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('near_earth_objects');
  });

});

const url = 'https://api.weatherstack.com/'
test('Погода в Москве',async({request}) => {
    let r = await request.get(`${url}current?query=Moscow&access_key=aa01471051fd0b295d1840eb941fa584`, {
    });
    const body = await r.json();
    console.log(body);
})
test('Nasa',async({request}) => {
    let r = await request.get('https://api.nasa.gov/planetary/apod?api_key=jNNPMTASWlUfQJxs7qXGYnJdk8BHzyPz0aOznaa4', {
    });
    console.log(r);
    const body = await r.json();
    console.log(body);
})