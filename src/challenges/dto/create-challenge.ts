import { ArgsType, Field, InputType } from '@nestjs/graphql';
import {
  IsInstance,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateChallenge {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  name: string;
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MaxLength(254)
  description: string;
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MaxLength(13000)
  text: string;
  @Field(() => Number)
  @IsNotEmpty()
  @IsInt()
  @Max(5)
  @Min(1)
  difficulty: number;
}

@ArgsType()
export class CreateChallengeArgs {
  @Field(() => CreateChallenge)
  @IsNotEmpty()
  @IsInstance(CreateChallenge)
  @ValidateNested()
  @Type(() => CreateChallenge)
  newChallenge: CreateChallenge;
}
