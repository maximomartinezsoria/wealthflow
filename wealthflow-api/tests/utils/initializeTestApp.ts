import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { execSync } from 'child_process';
import * as dotenv from 'dotenv';

import { AppModule } from '@/app.module';
import { JwtAuthGuard } from '@/contexts/auth/jwt-auth.guard';
import { PrismaService } from '@/shared/infrastructure/database/prisma.service';

dotenv.config({ path: '../../.env.test' });

class MockJwtAuthGuard {
  canActivate = jest.fn().mockReturnValue(true);
}

async function seedDb(prisma: PrismaService) {
  const users = Array.from({ length: 10 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    monthlyIncome: +faker.finance.amount(),
    totalMoney: +faker.finance.amount(),
    payday: faker.number.int({ min: 1, max: 31 }),
  }));

  await prisma.user.createMany({ data: users });
}

export async function initializeTestApp() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideGuard(JwtAuthGuard)
    .useClass(MockJwtAuthGuard)
    .compile();

  const app = moduleFixture.createNestApplication();
  await app.init();

  const prisma = app.get(PrismaService);
  await prisma.$connect();

  execSync('dotenv -e .env.test -- pnpm prisma migrate reset --force', {
    stdio: 'inherit',
  });
  await seedDb(prisma);

  return { app, prisma };
}
