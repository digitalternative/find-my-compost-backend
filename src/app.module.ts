import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { CompostModule } from './compost/compost.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { config } from 'dotenv';
import { ApolloDriver } from '@nestjs/apollo';

config();

@Module({
  controllers: [AppController],
  imports: [
    CompostModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
