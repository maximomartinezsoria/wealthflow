import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '@/app.module';
import { JwtAuthGuard } from '@/contexts/auth/jwt-auth.guard';
import { PrismaService } from '@/shared/infrastructure/database/prisma.service';

const userId = 'ac1f4b1e-3b4b-4b1e-9b1e-1b4c1b4c1b4c';

class MockJwtAuthGuard {
  canActivate = jest.fn().mockReturnValue(true);
  validate = jest.fn().mockReturnValue({ userId });
}

async function seedDb(prisma: PrismaService) {
  const user = {
    id: userId,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    monthlyIncome: +faker.finance.amount(),
    totalMoney: +faker.finance.amount(),
    payday: faker.number.int({ min: 1, max: 31 }),
  };

  await prisma.user.create({
    data: user,
  });

  const balances = Array.from({ length: 3 }, () => ({
    id: faker.string.uuid(),
    name: faker.person.firstName(),
    amount: +faker.finance.amount(),
    usable: +faker.finance.amount(),
    color: faker.internet.color(),
    userId: user.id,
  }));

  await prisma.balance.createMany({
    data: balances,
  });
}

export async function initializeTestApp() {
  let app: INestApplication;
  let prisma: PrismaService;

  try {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useClass(MockJwtAuthGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = app.get(PrismaService);
    await prisma.$connect();

    await prisma.$transaction([
      prisma.$executeRawUnsafe(
        'TRUNCATE TABLE "User", "Balance" RESTART IDENTITY CASCADE;',
      ),
    ]);

    await seedDb(prisma);

    await prisma.$disconnect();
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
  }

  return { app, prisma };
}
