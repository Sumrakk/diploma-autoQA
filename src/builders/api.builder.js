import { faker } from '@faker-js/faker';

export class DateBuilder {
    startDate (){
        this.start = faker.date
        .between({ from: '2025-10-01', to: '2026-12-31' })
        .toISOString()
        .split('T')[0];
        return this;
    }
    endDate () {
        this.end = faker.date
        .between({ from: '2026-01-01', to: '2026-02-19' })
        .toISOString()
        .split('T')[0];
        return this;

    }
    randomDate () {
        this.date = faker.date
        .between({ from: '2026-01-01', to: '2026-02-19' })
        .toISOString()
        .split('T')[0];
        return this;
    }
    invalidDate () {
        this.date = faker.string.alphanumeric(10);
        return this;
    }
    build()
    {
        const result = {...this};
        return result;
    }
}