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
    expect(response.status).toBe(201); // Updated status code for resource creation
    expect(response.body).toHaveProperty('_id');
    expect(response.body.email).toBe(mocks.newUser.email);
    expect(response.body.username).toBe(mocks.newUser.username);
    expect(response.body.dogName).toBe(mocks.newUser.dogName);

    // Check if the password is hashed
    const userFromDb = await User.findById(response.body._id);
    expect(userFromDb).not.toBeNull();
    expect(userFromDb?.password).not.toBe(mocks.newUser.password); // Ensure password is hashed
  });

  // POST -> Test creating a user with missing fields (error message)
  test('POST /users - should fail when required fields are missing', async () => {
    const response = await request.post('/users').send(mocks.incompleteUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  // POST -> Test creating a user with invalid email
  test('POST /users - should fail when email is invalid', async () => {
    const response = await request.post('/users').send(mocks.invalidEmailUser);
    expect(response.status).toBe(500); // Updated status code for client error
    expect(response.body).toHaveProperty('error');
  });

  // POST -> Test logging in a user with the correct password
  test('POST /users/login - should retrieve a user if password is correct', async () => {
    const postResponse = await request.post('/users').send(mocks.newUser);
    const { email } = postResponse.body;

    // Login with correct password
    const loginResponse = await request.post('/users/login').send({
      email,
      password: mocks.newUser.password,
    });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty('_id', postResponse.body._id);
    expect(loginResponse.body).toHaveProperty('username', postResponse.body.username);
    expect(loginResponse.body).toHaveProperty('email', postResponse.body.email);
  });

  // POST -> Test logging in a user with an incorrect password
  test('POST /users/login - should fail if password is incorrect', async () => {
    const postResponse = await request.post('/users').send(mocks.newUser);
    const { email } = postResponse.body;

    // Attempt to login with incorrect password
    const loginResponse = await request.post('/users/login').send({
      email,
      password: 'wrongpassword',
    });

    expect(loginResponse.status).toBe(400); // Unauthorized
    expect(loginResponse.body).toHaveProperty('error', 'Invalid password');
  });

  // POST -> Test retrieving a user with an invalid ID format (error message)
  test('POST /users/:id - should return 404 for invalid ID format', async () => {
    const invalidId = '123';
    const response = await request.post(`/users/${invalidId}`);
    expect(response.status).toBe(404);
  });

  // POST -> Test retrieving a non-existent user (error message)
  test('POST /users/:id - should return 400 for non-existent user', async () => {
    const nonExistentId = new mongoose.Types.ObjectId().toString();
    const response = await request.post(`/users/${nonExistentId}`);
    expect(response.status).toBe(404); 
  });
});
