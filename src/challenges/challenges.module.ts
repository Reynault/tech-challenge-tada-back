import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Challenge, ChallengeSchema } from './challenge.model';
import { ChallengesService } from './challenges.service';
import { ChallengesResolver } from './challenges.resolver';
import { ChallengesDao } from './challenges.dao';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Challenge.name, schema: ChallengeSchema },
    ]),
  ],
  providers: [ChallengesDao, ChallengesService, ChallengesResolver],
})
export class ChallengesModule {}
