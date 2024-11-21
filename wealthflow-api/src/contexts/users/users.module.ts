import { Module } from '@nestjs/common';

import { UserCreator } from '@/contexts/users/application/user-creator/user-creator';
import { UserRepository } from '@/contexts/users/domain/user.repository';
import { PrismaUserRepository } from '@/contexts/users/infrastructure/prisma-user.repository';
import { UserResolver } from '@/contexts/users/infrastructure/user.resolver';

@Module({
  providers: [
    UserResolver,
    UserCreator,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  controllers: [],
  imports: [],
  exports: [],
})
export class UsersModule {}
