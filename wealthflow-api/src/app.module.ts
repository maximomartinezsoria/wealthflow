import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { AuthModule } from '@/contexts/auth/auth.module';
import { BalancesModule } from '@/contexts/balances/balances.module';
import { TransactionsModule } from '@/contexts/transactions/transactions.module';
import { UsersModule } from '@/contexts/users/users.module';
import { GlobalModule } from '@/shared/global.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'test' ? '../.env.test' : '../.env',
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      playground: true,
      formatError: (error) => {
        console.log('GraphQL Error:', error);
        return error;
      },
    }),
    GlobalModule,
    AuthModule,
    UsersModule,
    BalancesModule,
    TransactionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
