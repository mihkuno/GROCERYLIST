const request = require('supertest');
const express = require('express');
const app = require('./index');

// This test covers some endpoints (/lists, /lists/detail, /lists/update, /items/add)

jest.mock('mysql2', () => {
  const mockPool = {
    query: jest.fn(),
  };
  return {
    createPool: jest.fn(() => mockPool),
  };
});

const mysql = require('mysql2');
const mockPool = mysql.createPool();

describe('POST /lists', () => {
  it('should return 400 for missing required fields', async () => {
    const response = await request(app).post('/lists').send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Missing required fields' });
  });

  it('should return 400 if user does not exist', async () => {
    mockPool.query.mockImplementation((query, params, callback) => {
      if (query.includes('SELECT id FROM `User`')) {
        callback(null, []); // User not found
      }
    });

    const response = await request(app)
      .post('/lists')
      .send({ id: 1, email: 'test@example.com', password: 'wrongpassword' });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'User not found' });
  });

  it('should return a list of user lists if user exists', async () => {
    mockPool.query.mockImplementation((query, params, callback) => {
      if (query.includes('SELECT id FROM `User`')) {
        callback(null, [{ id: 1 }]); // User found
      } else if (query.includes('SELECT l.id, l.name')) {
        callback(null, [
          {
            id: 1,
            name: 'Groceries',
            created_at: new Date(),
            updated_at: new Date(),
            item_count: 3,
          },
        ]); // Sample list
      }
    });

    const response = await request(app)
      .post('/lists')
      .send({ id: 1, email: 'test@example.com', password: 'password123' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('lists');
    expect(response.body.lists).toHaveLength(1);
    expect(response.body.lists[0]).toEqual(
      expect.objectContaining({
        id: 1,
        title: 'Groceries',
      })
    );
  });
});
