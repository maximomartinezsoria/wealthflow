import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '@/app.module';
import { PrismaService } from '@/shared/infrastructure/database/prisma.service';

export async function initializeTestApp() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();

  const prisma = app.get(PrismaService);
  await prisma.$connect();

  return { app, prisma };
}
