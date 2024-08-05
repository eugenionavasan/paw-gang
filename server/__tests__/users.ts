// tests/users.test.ts
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  test,
} from '@jest/globals';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import supertest from 'supertest';
import { mocks } from '../mocks/mock';
import { TEST_MONOGDB_URI } from '../src/config';
import { errorHandler } from '../src/middleware/errorHandler';
import { User } from '../src/models/users';
import { router } from '../src/routers/index';

dotenv.config();

const dbName = 'users';
const dbUri = `${TEST_MONOGDB_URI}-${dbName}`;

beforeAll(async () => {
  await mongoose.connect(dbUri);
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('user endpoints', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  app.use(errorHandler);
  const request = supertest(app);

  // POST user
  test('POST /users - should create a new user', async () => {
    const response = await request.post('/users').send(mocks.newUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.email).toBe(mocks.newUser.email);
    expect(response.body.password).toBe(mocks.newUser.password);
    expect(response.body.username).toBe(mocks.newUser.username);
    expect(response.body.dogName).toBe(mocks.newUser.dogName);
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

  // GET -> Test retrieving and logging in a user by ID
  test('GET /users/:id - should retrieve a user if password is correct', async () => {
    const postResponse = await request.post('/users').send(mocks.newUser);
    const { _id, email, username } = postResponse.body;
    const loginResponse = await request
      .get(`/users/${_id}`)
      .send({ password: mocks.newUser.password });
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty('_id', _id);
    expect(loginResponse.body).toHaveProperty('username', username);
    expect(loginResponse.body).toHaveProperty('email', email);
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
