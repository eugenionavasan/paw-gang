import { expect, test } from '@jest/globals';
import dotenv from 'dotenv';
import type { Server } from 'http';
import mongoose from 'mongoose';
import supertest from 'supertest';
import { app } from '../server';

dotenv.config();

const TEST_PORT: number | string = process.env.TEST_PORT || 3006;
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
    const newUser = {
      email: 'testuser@example.com',
      password: 'securepassword',
      username: 'testuser',
      dogName: 'Buddy',
    };

    const response = await request.post('/users').send(newUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.email).toBe(newUser.email);
    expect(response.body.password).toBe(newUser.password);
    expect(response.body.username).toBe(newUser.username);
    expect(response.body.dogName).toBe(newUser.dogName);

    userId = response.body._id;
  });

  // GET -> Id
  test('GET /users/:id - should retrieve a user by its ID', async () => {
    if (!userId) {
      throw new Error('No user ID found for retrieval test');
    }

    const response = await request.get(`/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id', userId);
    expect(response.body).toHaveProperty('email', 'testuser@example.com');
    expect(response.body).toHaveProperty('username', 'testuser');
    expect(response.body).toHaveProperty('dogName', 'Buddy');
  });
});
