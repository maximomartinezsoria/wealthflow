import { INestApplication } from '@nestjs/common';
import { defineFeature, loadFeature } from 'jest-cucumber';
import * as request from 'supertest';
import { initializeTestApp } from 'tests/utils/initializeTestApp';

import { PrismaService } from '@/shared/infrastructure/database/prisma.service';

const feature = loadFeature(
  'tests/balances/balance-creator/balance-creator.feature',
);

let app: INestApplication;
let prisma: PrismaService;

const balanceData = {
  name: 'Savings',
  amount: 100,
  color: '#FF6384',
};

function sendRequest(input) {
  return request(app.getHttpServer())
    .post('/graphql')
    .set('Content-Type', 'application/json')
    .send({
      query: `mutation createBalances($input: CreateBalancesInput!) {
              createBalances(input: $input) {
                balances {
                  id
                }
              }
            }`,
      variables: {
        input: {
          balances: [input],
        },
      },
    });
}

defineFeature(feature, (test) => {
  beforeAll(async () => {
    const { app: _app, prisma: _prisma } = await initializeTestApp();
    app = _app;
    prisma = _prisma;
  });

  test('Create Balance', ({ when, then }) => {
    let balanceResponse: request.Response;

    when(
      /^I send a request to create a balance for user with id (.*)$/,
      async (userId) => {
        balanceResponse = await sendRequest({
          ...balanceData,
          userId,
        });
      },
    );

    then('the balance should exist in the database', async () => {
      const balance = await prisma.balance.findFirst({
        where: {
          id: balanceResponse.body.data.createBalance.id,
        },
      });

      expect(balance).not.toBeNull();
      expect(balance.name).toBe('Savings');
    });
  });

  // test('User not found', ({ when, then }) => {
  //   let balanceResponse: request.Response;

  //   when(
  //     /^I send a request to create a balance for a non-existent user with id (.*)$/,
  //     async (userId) => {
  //       balanceResponse = await sendRequest({
  //         ...balanceData,
  //         userId,
  //       });
  //     },
  //   );

  //   then(
  //     /^the response should return an error message (.*)$/,
  //     (errorMessage) => {
  //       expect(balanceResponse.body.errors).toBeDefined();

  //       expect(balanceResponse.body.errors[0].message).toBe(errorMessage);
  //     },
  //   );
  // });

  // test('Invalid amount', ({ when, then }) => {
  //   let balanceResponse: request.Response;

  //   when(
  //     /^I send a request to create a balance for user with id (.*)$/,
  //     async (userId) => {
  //       balanceResponse = await sendRequest({
  //         ...balanceData,
  //         userId,
  //       });
  //     },
  //   );

  //   then(
  //     /^the response should return an error message (.*)$/,
  //     (errorMessage) => {
  //       expect(balanceResponse.body.errors).toBeDefined();

  //       expect(balanceResponse.body.errors[0].message).toBe(errorMessage);
  //     },
  //   );
  // });

  // test('User already has a balance with the same name', ({ when, then }) => {
  //   let balanceResponse: request.Response;

  //   when(
  //     /^I send a request to create a balance with for user id (.*)$/,
  //     async (userId) => {
  //       balanceResponse = await sendRequest({
  //         ...balanceData,
  //         userId,
  //       });
  //     },
  //   );

  //   then(
  //     /^the response should return an error message (.*)$/,
  //     (errorMessage) => {
  //       expect(balanceResponse.body.errors).toBeDefined();

  //       console.log(balanceResponse.body.errors[0].locations);
  //       expect(balanceResponse.body.errors[0].message).toBe(errorMessage);
  //     },
  //   );
  // });
});
