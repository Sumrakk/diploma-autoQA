import { expect } from '@playwright/test';
import { test } from '../src/fixtures/api.fixture';
import { DateBuilder } from '../src/builders/index';

test.describe('NASA API', () => {

  test('1. Получение Astronomy Picture of the Day', async ({ nasa }) => {

    const response = await nasa.getApod();
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('url');
    expect(body).toHaveProperty('media_type');
  });

  test('2. APOD с рандомной датой', async ({ nasa }) => {
    
    const random = new DateBuilder().randomDate().build();

    const response = await nasa.getApod({ date: random.date });
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.date).toBe(randomDate.date);
  });

  test('3. APOD с невалидной датой (faker, негативный)', async ({ nasa }) => {

    const invalidDate = new DateBuilder().invalidDate().build();

    const response = await nasa.getApod({ date: invalidDate.date });

    expect(response.status()).toBe(400);
  });

  test('4. GST - получить геомагнитные бури за случайный период', async ({ nasa }) => {
    const dates = new DateBuilder().startDate().endDate().build();

    const response = await nasa.getEpic({
      start: dates.start,
      end: dates.end
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
    });
  });

  test('5. Астероиды за случайный диапазон дат (faker)', async ({ nasa }) => {
    const dates = new DateBuilder().startDate().endDate().build();

    const response = await nasa.getAsteroids({
      start: dates.start,
      end: dates.end
    });

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('near_earth_objects');
  });

});