import { INestApplication } from '@nestjs/common';
import { defineFeature, loadFeature } from 'jest-cucumber';
import * as request from 'supertest';
import { initializeTestApp } from 'tests/utils/initializeTestApp';

import { PrismaService } from '@/shared/infrastructure/database/prisma.service';

const feature = loadFeature(
  'tests/balances/balance-finder/balance-finder.feature',
);

let app: INestApplication;
let prisma: PrismaService;

function sendRequest() {
  return request(app.getHttpServer())
    .post('/graphql')
    .set('Content-Type', 'application/json')
    .send({
      query: `query getBalances {
              balances {
                balances {
                  id
                }
              }
            }`,
    });
}

defineFeature(feature, (test) => {
  beforeAll(async () => {
    const { app: _app, prisma: _prisma } = await initializeTestApp();
    app = _app;
    prisma = _prisma;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('Find Balances by userId', ({ when, then }) => {
    let balancesResponse: request.Response;

    when(
      'I send a request to find the balances for the authenticated user',
      async () => {
        balancesResponse = await sendRequest();
      },
    );

    then('the balances should exist in the database', async () => {
      const { data } = balancesResponse.body;

      console.log(data);
      expect(data.balances).toBeDefined();
      expect(data.balances.balances).toBeInstanceOf(Array);

      const balance = data.balances.balances[0];
      expect(balance).toHaveProperty('id');
      expect(balance).toHaveProperty('name');
      expect(balance).toHaveProperty('amount');
    });
  });
});
