import { Module } from '@nestjs/common';
import { ChallengesModule } from './challenges/challenges.module';
import { join } from 'path';
import * as Config from 'config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      include: [ChallengesModule],
    }),
    MongooseModule.forRoot(
      Config.get<string>('mongodb.uri_prefix') +
        Config.get<string>('mongodb.login') +
        ':' +
        Config.get<string>('mongodb.password') +
        '@' +
        Config.get<string>('mongodb.host') +
        ':' +
        Config.get<string>('mongodb.port') +
        '/' +
        Config.get<string>('mongodb.database') +
        Config.get<string>('mongodb.uri_suffix') +
        Config.get<string>('mongodb.authdb'),
      Config.get<MongooseModuleOptions>('mongodb.options'),
    ),
    ChallengesModule,
  ],
})
export class AppModule {}
