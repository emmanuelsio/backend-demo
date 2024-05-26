import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { User } from '@/api/user/userModel';
import { ServiceResponse } from '@/common/models/serviceResponse';
import { app } from '@/server';

describe('User API Endpoints', () => {
  const mockUsers: User[] = [
    {
      id: 'E4F68B6D-260C-4DCE-AF15-A3B4B3F9924F',
      name: 'Alice',
      email: 'alice@example.com',
      age: '42',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
    {
      id: '2B6520F7-5E8D-43FA-9CAF-FC4162DEBD73',
      name: 'Bob',
      email: 'bob@example.com',
      age: '21',
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
  ];
  describe('GET /users', () => {
    it('should return a list of users', async () => {
      // Act
      const response = await request(app).get('/users');
      const responseBody: ServiceResponse<User[]> = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain('Users found');
      expect(responseBody.responseObject.length).toEqual(mockUsers.length);
      responseBody.responseObject.forEach((user, index) => compareUsers(mockUsers[index] as User, user));
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user for a valid ID', async () => {
      // Arrange
      const testId = 'E4F68B6D-260C-4DCE-AF15-A3B4B3F9924F';
      const expectedUser = mockUsers.find((user) => user.id === testId) as User;

      // Act
      const response = await request(app).get(`/users/${testId}`);
      const responseBody: ServiceResponse<User> = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain('User found');
      if (!expectedUser) throw new Error('Invalid test data: expectedUser is undefined');
      compareUsers(expectedUser, responseBody.responseObject);
    });

    it('should return a not found error for non-existent ID', async () => {
      // Arrange
      const testId = Number.MAX_SAFE_INTEGER;

      // Act
      const response = await request(app).get(`/users/${testId}`);
      const responseBody: ServiceResponse = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain('User not found');
      expect(responseBody.responseObject).toBeNull();
    });

    it('should return a bad request for invalid ID format', async () => {
      // Act
      const invalidInput = 'abc';
      const response = await request(app).get(`/users/${invalidInput}`);
      const responseBody: ServiceResponse = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain('Invalid input');
      expect(responseBody.responseObject).toBeNull();
    });
  });
});

function compareUsers(mockUser: User, responseUser: User) {
  if (!mockUser || !responseUser) {
    throw new Error('Invalid test data: mockUser or responseUser is undefined');
  }

  expect(responseUser.id).toEqual(mockUser.id);
  expect(responseUser.name).toEqual(mockUser.name);
  expect(responseUser.email).toEqual(mockUser.email);
  expect(responseUser.age).toEqual(mockUser.age);
  expect(new Date(responseUser.createdAt)).toEqual(mockUser.createdAt);
  expect(new Date(responseUser.updatedAt)).toEqual(mockUser.updatedAt);
}
