import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import * as mongoose from 'mongoose';

@ObjectType()
@Schema()
export class Challenge {
  @Field(() => String)
  _id: mongoose.Schema.Types.ObjectId;

  @Field({ nullable: false })
  @Prop({
    type: String,
    required: true,
    index: { unique: true },
  })
  name: string;

  @Field({ nullable: false })
  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Field(() => Int, { nullable: false })
  @Prop({
    type: Number,
    required: true,
  })
  difficulty: number;
}

export type ChallengeDocument = Challenge & Document;

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);
