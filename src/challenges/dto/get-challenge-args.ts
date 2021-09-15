import { ArgsType, Field } from '@nestjs/graphql';
import { IsMongoId, IsString } from 'class-validator';

@ArgsType()
export class GetChallengeArgs {
  @Field(() => String)
  @IsString()
  @IsMongoId()
  id: string;
}
