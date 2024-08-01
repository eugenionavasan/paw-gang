// do we have to build

// function sum (a: number, b: number): number {
//   return a + b;
// }

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });

import {app} from '../server';
import type {Server} from 'http'
import {expect, test} from '@jest/globals';
import mongoose from 'mongoose';
import supertest from 'supertest';
import dotenv from 'dotenv';

dotenv.config();

const TEST_PORT: number | string = process.env.TEST_PORT || 3003;
const request = supertest(app);
let server: Server;

// ! not closing
beforeEach(done => {
  server = app.listen(TEST_PORT)
  done()
})

afterEach(done => {
  mongoose.connection.close()
  server.close()
  done()
})

describe('event endpoints', () => {
  test('testing endpoint is valid: /events', async () => {
    const response = await request.get('/events');
    expect(response.status).toBe(200);
  })
})
