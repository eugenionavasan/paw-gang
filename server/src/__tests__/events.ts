// do we have to build

// function sum (a: number, b: number): number {
//   return a + b;
// }

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });

import { expect, test } from '@jest/globals';
import dotenv from 'dotenv';
import type { Server } from 'http';
import mongoose from 'mongoose';
import supertest from 'supertest';
import { app } from '../server';

dotenv.config();

const TEST_PORT: number | string = process.env.TEST_PORT || 3003;
const request = supertest(app);
let server: Server;

// ! not closing
beforeAll((done) => {
  server = app.listen(TEST_PORT);
  done();
});

afterAll((done) => {
  server.close();
  mongoose.connection.close();
  done();
});

describe('event endpoints', () => {
  test('testing endpoint is valid: /events', async () => {
    const response = await request.get('/events');
    expect(response.status).toBe(200);
  });
  test('POST /events - should create a new event', async () => {
    const newEvent = {
      place_id: 'new_place_id',
      park_name: 'New Park',
      address: '123 Park Lane',
      date: new Date('2024-01-01T00:00:00Z').toISOString(),
      user: 'eugenio',
      dog_avatar: 'dog_avatar_url',
    };

    console.log(newEvent);
    const response = await request.post('/events').send(newEvent);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.place_id).toBe(newEvent.place_id);
    expect(response.body.park_name).toBe(newEvent.park_name);
    expect(response.body.address).toBe(newEvent.address);
    expect(response.body.date).toBe(newEvent.date);
    expect(response.body.user).toBe(newEvent.user);
    expect(response.body.dog_avatar).toBe(newEvent.dog_avatar);
  });
});
