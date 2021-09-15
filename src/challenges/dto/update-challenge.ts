import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateChallenge } from './create-challenge';
import { GetChallengeArgs } from './get-challenge-args';
import { IsInstance, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class UpdateChallenge extends PartialType(CreateChallenge) {}

@ArgsType()
export class UpdateChallengeArgs extends GetChallengeArgs {
  @Field(() => UpdateChallenge)
  @IsNotEmpty()
  @IsInstance(UpdateChallenge)
  @ValidateNested()
  @Type(() => UpdateChallenge)
  newChallenge: UpdateChallenge;
}
