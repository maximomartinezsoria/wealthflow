import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { defineFeature, loadFeature } from 'jest-cucumber';
import * as request from 'supertest';

import { AppModule } from '@/app.module';
import { CreateUserInput } from '@/contexts/users/infrastructure/user.dto';
import { PrismaService } from '@/shared/infrastructure/database/prisma.service';

const feature = loadFeature('tests/users/user-creator/user-creator.feature');

let app: INestApplication;
let prisma: PrismaService;
const userData: CreateUserInput = {
  name: 'John Doe',
  email: 'john@doe.com',
  monthlyIncome: 1000,
  payday: 1,
};

defineFeature(feature, (test) => {
  test('Create a new user', ({ given, when, then }) => {
    given('the API is running', async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();

      prisma = app.get(PrismaService);
      await prisma.$connect();
    });

    afterAll(async () => {
      await prisma.$disconnect();
    });

    when(
      /^I send a request to create a user with the email (.*) and name (.*)$/,
      async (email: string, name: string) => {
        await request(app.getHttpServer())
          .post('/graphql')
          .set('Content-Type', 'application/json')
          .send({
            query: `mutation CreateItem($input: CreateUserInput!) {
                createUser(input: $input) {
                  id
                }
              }`,
            variables: {
              input: {
                email,
                name,
                monthlyIncome: userData.monthlyIncome,
                payday: userData.payday,
              },
            },
          });
      },
    );

    then('the user should exist in the database', async () => {
      const user = await prisma.user.findUnique({
        where: { email: userData.email },
      });
      expect(user).toBeDefined();
      expect(user?.email).toBe(userData.email);
      expect(user?.name).toBe(userData.name);
      expect(user?.monthlyIncome).toBe(userData?.monthlyIncome);
      expect(user?.payday).toBe(userData?.payday);
    });
  });
});
