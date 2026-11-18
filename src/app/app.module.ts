import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module.js';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ProfileModule } from '../profile/profile.module.js';
import { validate } from '../common/validate/env.validate.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
    }),
    PrismaModule,
    ProfileModule,
  ],
})
export class AppModule {}
