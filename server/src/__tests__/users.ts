import { expect, test } from '@jest/globals';
import dotenv from 'dotenv';
import type { Server } from 'http';
import mongoose from 'mongoose';
import supertest from 'supertest';
import { mocks } from '../mocks/mock';
import { app } from '../server';

dotenv.config();

const TEST_PORT: number | string = process.env.TEST_PORT_USERS || 3006;
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

describe('user endpoints', () => {
  let userId: string;

  // POST user
  test('POST /users - should create a new user', async () => {
    const response = await request.post('/users').send(mocks.newUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.email).toBe(mocks.newUser.email);
    expect(response.body.password).toBe(mocks.newUser.password);
    expect(response.body.username).toBe(mocks.newUser.username);
    expect(response.body.dogName).toBe(mocks.newUser.dogName);

    userId = response.body._id;
  });

  // POST -> Test creating a user with missing fields (error message)
  test('POST /users - should fail when required fields are missing', async () => {
    const response = await request.post('/users').send(mocks.incompleteUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  // Post -> Test creating a user with invalid email
  test('POST /users - should fail when email is invalid', async () => {
    const response = await request.post('/users').send(mocks.invalidEmailUser);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
  });

  // GET -> Id
  test('GET /users/:id - should retrieve a user by its ID', async () => {
    const response = await request.get(`/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id', userId);
    expect(response.body).toHaveProperty('email', mocks.newUser.email);
    expect(response.body).toHaveProperty('username', mocks.newUser.username);
    expect(response.body).toHaveProperty('dogName', mocks.newUser.dogName);
  });

  // GET -> Test retrieving a user with an invalid ID format (error message)
  test('GET /users/:id - should return 400 for invalid ID format', async () => {
    const invalidId = '123';
    const response = await request.get(`/users/${invalidId}`);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
  });

  // GET -> Test retrieving a non-existent user (error message)
  test('GET /users/:id - should return 404 for non-existent user', async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();
    const response = await request.get(`/users/${nonExistentId}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
