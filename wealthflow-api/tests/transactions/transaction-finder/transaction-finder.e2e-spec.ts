import { INestApplication } from '@nestjs/common';
import { defineFeature, loadFeature } from 'jest-cucumber';
import * as request from 'supertest';
import { initializeTestApp } from 'tests/utils/initializeTestApp';

import { FindTransactionCriteria } from '@/contexts/transactions/infrastructure/transaction.dto';
import { PrismaService } from '@/shared/infrastructure/database/prisma.service';

const feature = loadFeature(
  'tests/transactions/transaction-finder/transaction-finder.feature',
);

let app: INestApplication;
let prisma: PrismaService;

function sendRequest(criteria: FindTransactionCriteria = {}) {
  return request(app.getHttpServer())
    .post('/graphql')
    .set('Content-Type', 'application/json')
    .send({
      query: `query getTransactions($input: FindTransactionInput!) {
              transactions {
                  id
              }
            }`,
      variables: {
        input: criteria,
      },
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

  test('Find transactions by userId', ({ when, then }) => {
    let transactionsResponse: request.Response;

    when(
      'I send a request to find the transactions for the authenticated user',
      async () => {
        transactionsResponse = await sendRequest();
      },
    );

    then('the transactions should exist in the database', async () => {
      const { data } = transactionsResponse.body;

      expect(data.transactions).toBeInstanceOf(Array);

      const transaction = data.transactions[0];
      expect(transaction).toHaveProperty('id');
      expect(transaction).toHaveProperty('date');
      expect(transaction).toHaveProperty('amount');
      expect(transaction).toHaveProperty('type');
    });
  });

  test('Find transactions by userId with criteria', ({ when, then }) => {
    let transactionsResponse: request.Response;

    when(
      'I send a request to find the transactions for the authenticated user with criteria',
      async () => {
        transactionsResponse = await sendRequest({
          balanceId: '1',
        });
      },
    );

    then('the transactions should exist in the database', async () => {
      const { data } = transactionsResponse.body;

      expect(data.transactions).toBeInstanceOf(Array);

      const transaction = data.transactions[0];

      expect(transaction.balanceId).toBe('1');
    });
  });
});
