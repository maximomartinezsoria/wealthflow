import { Global, Logger, Module } from '@nestjs/common';

import { EventDispatcher } from '@/shared/domain/events/event-dispatcher';
import { PrismaService } from '@/shared/infrastructure/database/prisma.service';

@Global()
@Module({
  providers: [EventDispatcher, PrismaService, Logger],
  exports: [EventDispatcher, PrismaService, Logger],
})
export class GlobalModule {}
