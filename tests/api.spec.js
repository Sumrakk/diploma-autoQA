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

  test('GST - получить геомагнитные бури за случайный период', async ({ request }) => {
    const nasa = new NasaService(request);

    const startDateObj = faker.date.between({
      from: '2025-01-01',
      to: '2026-02-01'
    });

    const endDateObj = faker.date.soon({ days: 100, refDate: startDateObj });

    const startDate = startDateObj.toISOString().split('T')[0];
    const endDate = endDateObj.toISOString().split('T')[0];


    const response = await nasa.getEpic({
      startDate,
      endDate
    });
  
    const body = await response.json();

    expect(Array.isArray(body)).toBe(true);

    body.forEach(event => {

    //Проверка обязательных полей
    expect(event).toHaveProperty('gstID');
    expect(event).toHaveProperty('startTime');
    expect(event).toHaveProperty('allKpIndex');
    expect(event).toHaveProperty('link');
    expect(event).toHaveProperty('linkedEvents');
    expect(event).toHaveProperty('submissionTime');
    expect(event).toHaveProperty('versionId');
    expect(event).toHaveProperty('sentNotifications');
    // Проверка диапазона дат
    const eventDate = event.startTime.split('T')[0];
    expect(eventDate >= startDate && eventDate <= endDate).toBeTruthy();
    });

    console.log(body);
    console.log(startDate,endDate);
});

  test('5. Астероиды за случайный диапазон дат (faker)', async ({ request }) => {
    const nasa = new NasaService(request);

    const startDate = faker.date.between({
      from: '2023-01-01',
      to: '2023-12-01'
    });

    const endDate = faker.date.soon({ days: 30, refDate: startDate });

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