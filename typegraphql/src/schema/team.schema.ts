import { getModelForClass, index, prop, Ref } from '@typegoose/typegoose';
import { IsNumber, Max, MaxLength, Min, MinLength } from 'class-validator';
import { customAlphabet } from 'nanoid';
import { Field, InputType, ObjectType } from 'type-graphql';
import { User } from './user.schema';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 10);

enum TeamSize {
  DUO = 2,
  TRIO = 3,
  QUAD = 4,
  FIVER = 5,
}

@ObjectType()
@index({ productId: 1 })
export class Team {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true, ref: () => User })
  createdBy: Ref<User>;

  @Field(() => String)
  @prop({ required: true })
  creator: string;

  @Field(() => String)
  @prop({ required: true, unique: true })
  name: string;

  @Field(() => String)
  @prop({ required: true, enum: TeamSize })
  size: number;

  @Field(() => [String])
  @prop({ ref: () => User })
  members: Array<Ref<User>>;

  @Field(() => Boolean)
  @prop({ required: true, default: false })
  isFull: boolean;

  @Field(() => String)
  @prop({ required: true })
  description: string;

  @Field(() => String)
  @prop({ required: true, default: () => `team_${nanoid()}`, unique: true })
  teamId: string;
}

export const TeamModel = getModelForClass<typeof Team>(Team);

@InputType()
export class CreateTeamInput {
  @MinLength(5, {
    message: 'Team name must be at least 5 characters',
  })
  @MaxLength(20, {
    message: 'Team name must not be longer than 10 characters',
  })
  @Field()
  name: string;

  @IsNumber()
  @Min(2)
  @Max(5)
  @Field()
  size: number;

  @Field()
  description: string;
}

@InputType()
export class GetTeamInput {
  @Field()
  teamId: string;
}
