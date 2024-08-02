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

const TEST_PORT: number | string = process.env.TEST_PORT_EVENTS || 3003;
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
  let eventId: string;
  const placeId = 'test_place_id';
  const userId = 'test_user_id';

  // GET all events
  test('Get / - should get all events', async () => {
    const response = await request.get('/events');
    expect(response.status).toBe(200);
  });

  //POST events
  test('POST /events - should create a new event', async () => {
    const newEvent = {
      place_id: placeId,
      park_name: 'New Park',
      address: '123 Park Lane',
      date: new Date('2024-01-01T00:00:00Z').toISOString(),
      user: userId, // Use the same user_id for later retrieval
      dog_avatar: 'dog_avatar_url',
    };

    const response = await request.post('/events').send(newEvent);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.place_id).toBe(newEvent.place_id);
    expect(response.body.park_name).toBe(newEvent.park_name);
    expect(response.body.address).toBe(newEvent.address);
    expect(response.body.date).toBe(newEvent.date);
    expect(response.body.user).toBe(newEvent.user);
    expect(response.body.dog_avatar).toBe(newEvent.dog_avatar);

    eventId = response.body._id;
  });

  // GET Events by place_id
  test('GET /events/park/:place_id - should retrieve events by place_id', async () => {
    const response = await request.get(`/events/park/${placeId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('place_id', placeId);
    expect(response.body[0]).toHaveProperty('park_name', 'New Park');
  });

  // GET Events by user_id
  test('GET /events/user/:user - should retrieve events by user_id', async () => {
    const response = await request.get(`/events/user/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('user', userId);
    expect(response.body[0]).toHaveProperty('park_name', 'New Park');
  });

  // GET Event by ID
  test('GET /events/:id - should retrieve an event by its ID', async () => {
    if (!eventId) {
      throw new Error('No event ID found for retrieval test');
    }

    const response = await request.get(`/events/${eventId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id', eventId);
    expect(response.body).toHaveProperty('place_id', placeId);
    expect(response.body).toHaveProperty('park_name', 'New Park');
    expect(response.body).toHaveProperty('address', '123 Park Lane');
    expect(response.body).toHaveProperty('date');
    expect(response.body).toHaveProperty('user', userId);
    expect(response.body).toHaveProperty('dog_avatar', 'dog_avatar_url');
  });
  
  // PUT (EDIT) -> Only dates
  test('PUT /events/:id - should update the event date', async () => {
    if (!eventId) {
      throw new Error('No event ID found for update test');
    }

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
    if (!eventId) {
      throw new Error('No event ID found for deletion test');
    }

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
