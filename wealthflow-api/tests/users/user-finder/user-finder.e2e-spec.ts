import { INestApplication } from '@nestjs/common';
import { defineFeature, loadFeature } from 'jest-cucumber';
import * as request from 'supertest';
import { initializeTestApp } from 'tests/utils/initializeTestApp';

import { PrismaService } from '@/shared/infrastructure/database/prisma.service';

const feature = loadFeature('tests/users/user-finder/user-finder.feature');

let app: INestApplication;
let prisma: PrismaService;
let userResponse: request.Response;

defineFeature(feature, (test) => {
  beforeAll(async () => {
    const { app: _app, prisma: _prisma } = await initializeTestApp();
    app = _app;
    prisma = _prisma;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('Find a user', ({ when, then }) => {
    when(
      /^I send a request to find a user with id "(.*)"$/,
      async (id: string) => {
        userResponse = await request(app.getHttpServer())
          .post('/graphql')
          .set('Content-Type', 'application/json')
          .send({
            query: `query findUser($input: FindUserInput!) {
                user(input: $input) {
                  id
                  email
                }
              }`,
            variables: {
              input: {
                id,
              },
            },
          });
      },
    );
    then('the user should be returned', async () => {
      expect(userResponse.body.data.user).not.toBeNull();
    });
  });

  test('User not found', ({ when, then }) => {
    when(
      /^I send a request to find a non-existent user with id "(.*)"$/,
      async (id: string) => {
        userResponse = await request(app.getHttpServer())
          .post('/graphql')
          .set('Content-Type', 'application/json')
          .send({
            query: `query findUser($input: FindUserInput!) {
              user(input: $input) {
                id
                email
              }
            }`,
            variables: {
              input: {
                id,
              },
            },
          });
      },
    );

    then('the response should be null', () => {
      expect(userResponse.body.data.user).toBeNull();
    });
  });
});
