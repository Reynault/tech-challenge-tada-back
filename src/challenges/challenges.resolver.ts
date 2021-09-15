import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Challenge } from './challenge.model';
import { Observable } from 'rxjs';
import { ChallengesService } from './challenges.service';
import { GetChallengeArgs } from './dto/get-challenge-args';
import { CreateChallengeArgs } from './dto/create-challenge';
import { UpdateChallengeArgs } from './dto/update-challenge';

@Resolver(() => Challenge)
export class ChallengesResolver {
  constructor(private readonly service: ChallengesService) {}

  @Query(() => Challenge)
  getChallenge(@Args() args: GetChallengeArgs): Observable<Challenge> {
    return this.service.findOneById(args.id);
  }

  @Query(() => [Challenge])
  getChallenges(): Observable<Challenge[]> {
    return this.service.find();
  }

  @Mutation(() => Challenge)
  createChallenge(@Args() args: CreateChallengeArgs): Observable<Challenge> {
    return this.service.createChallenge(args.newChallenge);
  }

  @Mutation(() => Challenge)
  updateChallenge(@Args() args: UpdateChallengeArgs): Observable<Challenge> {
    return this.service.updateChallenge(args.id, args.newChallenge);
  }

  @Mutation(() => Challenge)
  deleteChallenge(@Args() args: GetChallengeArgs): Observable<Challenge> {
    return this.service.deleteChallenge(args.id);
  }
}
