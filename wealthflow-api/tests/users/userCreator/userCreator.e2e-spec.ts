import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { PrismaService } from '@/shared/infrastructure/database/prisma.service';
import { defineFeature, loadFeature } from 'jest-cucumber';
const feature = loadFeature('tests/users/userCreator/userCreator.feature');

let app: INestApplication;
let prisma: PrismaService;
let response: request.Response;

defineFeature(feature, (test) => {
  test('Create a new user', ({ given, when, then, and }) => {
    given('the API is running', async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();

      prisma = app.get(PrismaService);
      await prisma.$connect();
    });

    when(
      /^I send a request to create a user with the email (.*) and name (.*)$/,
      async (email: string, name: string) => {
        response = await request(app.getHttpServer())
          .post('/users')
          .send({ email, name });
      },
    );

    then(/^the response status should be (.*)$/, (statusCode: number) => {
      expect(response.status).toBe(statusCode);
    });

    and('the user should exist in the database', async () => {
      const user = await prisma.user.findUnique({
        where: { email: 'john@example.com' },
      });
      expect(user).toBeDefined();
      expect(user?.name).toBe('John Doe');
    });
  });
});
