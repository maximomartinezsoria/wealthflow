import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '@/app.module';
import { JwtAuthGuard } from '@/contexts/auth/jwt-auth.guard';
import { PrismaService } from '@/shared/infrastructure/database/prisma.service';

class MockJwtAuthGuard {
  canActivate = jest.fn().mockReturnValue(true);
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

  return { app, prisma };
}
