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
import { mocks } from '../mocks/mock';
import { app } from '../server';

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
  test('POST /events - should create a new event', async () => {
    const __v = 0;

    const response = await request.post('/events').send(mocks.newEvent);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    eventId = response.body._id;
    console.log(response.body);
    console.log('response ----');
    console.log(response.body.date);
    console.log(typeof response.body.date);
    console.log('mocks ----');
    console.log(mocks.newEvent.date);
    console.log(typeof mocks.newEvent.date);
    expect(response.body).toEqual({ ...mocks.newEvent, _id: eventId, __v });
  });

  // GET Events by place_id
  test('GET /events/park/:place_id - should retrieve events by place_id', async () => {
    const response = await request.get(
      `/events/park/${mocks.newEvent.place_id}`,
    );
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
    const response = await request.get(`/events/user/${mocks.newEvent.user}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('user', mocks.newEvent.user);
    expect(response.body[0]).toHaveProperty('park_name', 'New Park');
  });

  // ^Andre
  // GET Event by ID
  test('GET /events/:id - should retrieve an event by its ID', async () => {
    // POST to create a new event
    const postResponse = await request.post('/events').send(mocks.newEvent);
    expect(postResponse.status).toBe(201);
    const eventId = postResponse.body._id;

    // GET the event by its ID
    const getResponse = await request.get(`/events/${eventId}`);
    console.log('response ->>', getResponse.body);

    // Assertions
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toHaveProperty('_id', eventId);
    expect(getResponse.body).toHaveProperty(
      'place_id',
      mocks.newEvent.place_id,
    );
    expect(getResponse.body).toHaveProperty(
      'park_name',
      mocks.newEvent.park_name,
    );
  });

  // POST with Invalid Data
  test('POST /events - should fail when sending invalid data', async () => {
    const response = await request.post('/events').send(mocks.invalidEvent);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  // 2: GET an Event That Does Not Exist
  test('GET /events/:id - should return 404 for a non-existing event', async () => {
    const nonExistingEventId = new mongoose.Types.ObjectId().toString();
    const response = await request.get(`/events/${nonExistingEventId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
  });

  // PUT (EDIT) -> Only dates
  test.only('PUT /events/:id - should update the event date', async () => {
    // Create a new even to ensure a valid ID is available
    const postResponse = await request.post('/events').send(mocks.newEvent);
    expect(postResponse.status).toBe(201);
    eventId = postResponse.body._id;

    // update with valid date
    const newDate = new Date('2024-02-01T00:00:00Z').toISOString();
    const putResponse = await request
      .put(`/events/${eventId}`)
      .send({ date: newDate });
    expect(putResponse.status).toBe(200);
    expect(putResponse.body).toHaveProperty(
      'message',
      'Event updated successfully',
    );
    expect(putResponse.body.updatedEvent).toHaveProperty('date', newDate);

    // Verify the date was updated
    const checkResponse = await request.get(`/events/${eventId}`);
    expect(checkResponse.status).toBe(200);
    expect(checkResponse.body.date).toBe(newDate);

    // Attempt to update with invalid date format
    const invalidDateResponse = await request
      .put(`/events/${eventId}`)
      .send({ date: 'invalid-date' });
    expect(invalidDateResponse.status).toBe(500);
    expect(invalidDateResponse.body).toHaveProperty('error');

    // Attempt to update a non-existing event
    const nonExistingEventId = new mongoose.Types.ObjectId().toString();
    const nonExistingUpdateResponse = await request
      .put(`/events/${nonExistingEventId}`)
      .send({ date: newDate });
    expect(nonExistingUpdateResponse.status).toBe(400);
    expect(nonExistingUpdateResponse.body).toHaveProperty('error');

    // Attempt to update with missing fields
    const missingFieldsResponse = await request
      .put(`/events/${eventId}`)
      .send({});
    expect(missingFieldsResponse.status).toBe(400);
    expect(missingFieldsResponse.body).toHaveProperty('error');
  });

  // Delete
  test.only('DELETE /events/:id - should delete the event', async () => {
    // Create a new event to ensure a valid ID is available
    const postResponse = await request.post('/events').send(mocks.newEvent);
    expect(postResponse.status).toBe(201);
    eventId = postResponse.body._id;

    // Successful deletion
    const deleteResponse = await request.delete(`/events/${eventId}`);
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toHaveProperty(
      'message',
      'Event deleted successfully',
    );

    // Verify the event was deleted
    const checkResponse = await request.get(`/events/${eventId}`);
    expect(checkResponse.status).toBe(400);

    // Attempt to delete a non-existing event
    const nonExistingEventId = new mongoose.Types.ObjectId().toString();
    const nonExistingDeleteResponse = await request.delete(
      `/events/${nonExistingEventId}`,
    );
    expect(nonExistingDeleteResponse.status).toBe(400);
    expect(nonExistingDeleteResponse.body).toHaveProperty('error');

    // Attempt to delete without providing an ID
    const missingIdDeleteResponse = await request.delete('/events/');
    expect(missingIdDeleteResponse.status).toBe(404);
  });
});
