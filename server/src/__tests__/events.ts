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
import {app} from '../server';
import { mocks } from '../mocks/mock';

dotenv.config();

const TEST_PORT: number | string = process.env.TEST_PORT_EVENTS || 3003;
const request = supertest(app);
let server: Server;

beforeAll((done) => {
  server = app.listen(TEST_PORT);
  done();
});

afterAll((done) => {
  server.close();
  mongoose.connection.close();
  done();
});


// ! structuring tests more granularly
// ! mock data should be in separate files
// !
describe('event endpoints', () => {
  let eventId: string;

  // GET all events
  test('Get / - should get all events', async () => {
    const response = await request.get('/events');
    expect(response.status).toBe(200);
  });

  // ^Vincent
  //POST events
  test.only('POST /events - should create a new event', async () => {
    const __v = 0;

    const response = await request.post('/events').send(mocks.newEvent);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    eventId = response.body._id;
    console.log(response.body)
    console.log('response ----')
    console.log(response.body.date)
    console.log(typeof response.body.date)
    console.log('mocks ----')
    console.log(mocks.newEvent.date)
    console.log(typeof mocks.newEvent.date);
    expect(response.body).toEqual({...mocks.newEvent, _id: eventId, __v});
  });

  // GET Events by place_id
  test('GET /events/park/:place_id - should retrieve events by place_id', async () => {
    const response = await request.get(`/events/park/${mocks.newEvent.place_id}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty(
      'place_id',
      mocks.newEvent.place_id,
    );
    expect(response.body[0]).toHaveProperty('park_name', 'New Park');
  });

  // GET Events by user_id
  test('GET /events/user/:user - should retrieve events by user_id', async () => {
    const response = await request.get(
      `/events/user/${mocks.newEvent.user}`,
    );
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('user', mocks.newEvent.user);
    expect(response.body[0]).toHaveProperty('park_name', 'New Park');
  });

  // GET Event by ID
  test('GET /events/:id - should retrieve an event by its ID', async () => {
    // call post method
    // store id from post method
    // call with that id the get events by id

    const response = await request.get(`/events/${eventId}`);
    console.log('response ->>', response.body)
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id', eventId);
    expect(response.body).toHaveProperty('place_id', mocks.newEvent.place_id);
    expect(response.body).toHaveProperty('park_name', 'New Park');
    expect(response.body).toHaveProperty('address', '123 Park Lane');
    expect(response.body).toHaveProperty('date');
    expect(response.body).toHaveProperty('user', mocks.newEvent.user);
    expect(response.body).toHaveProperty('dog_avatar', 'dog_avatar_url');
  });

  // PUT (EDIT) -> Only dates
  // ^Andre
  test('PUT /events/:id - should update the event date', async () => {

    const newDate = new Date('2024-02-01T00:00:00Z').toISOString();
    const response = await request
      .put(`/events/${eventId}`)
      .send({ date: newDate });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      'message',
      'Event updated successfully',
    );
    expect(response.body.updatedEvent).toHaveProperty('date', newDate);

    // Verify the date was updated
    const checkResponse = await request.get(`/events/${eventId}`);
    expect(checkResponse.status).toBe(200);
    expect(checkResponse.body.date).toBe(newDate);
  });

  // Delete
  test('DELETE /events/:id - should delete the event', async () => {

    let before = await request.get(`/events/${eventId}`);

    const response = await request.delete(`/events/${eventId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      'message',
      'Event deleted successfully',
    );

    const checkResponse = await request.get(`/events/${eventId}`);
    expect(checkResponse.status).toBe(400);
  });
});
