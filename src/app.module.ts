import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CompostsModule } from './composts/composts.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CompostsModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    }),
  ],
})
export class AppModule { }
