import { getModelForClass, index, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { customAlphabet } from 'nanoid';
import { Field, InputType, ObjectType } from 'type-graphql';
import { Member } from './member.schema';
import { Team } from './team.schema';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 10);

@ObjectType()
@InputType('Match')
class Match {
  @Field(() => String)
  _id: string;

  @Field(() => Number)
  @prop({ required: true, default: 0 })
  won: number;

  @Field(() => Number)
  @prop({ required: true, default: 0 })
  lost: number;

  @Field(() => Date)
  @prop({ required: true, default: Date.now() })
  lastPlayed: Date;

  @Field(() => Number)
  @prop({ required: true, default: 0 })
  total: number;
}

@ObjectType()
@InputType('Streak')
class Streak {
  @Field(() => String)
  _id: string;

  @Field(() => Number)
  @prop({ required: true, default: 0 })
  currentStreak: number;

  @Field(() => Number)
  @prop({ required: true, default: 0 })
  highest: number;
}

@index({ statisticId: 1 })
@ObjectType()
export class UserStatistic {
  @Field(() => String)
  _id: string;

  @Field(() => Member)
  @prop({ unique: true })
  user: Ref<Member>;

  @Field(() => Match)
  @prop()
  matches: Match;

  @Field(() => Streak)
  @prop()
  streak: Streak;

  @Field(() => [Team])
  @prop({ items: Team, default: [] })
  teams: Team[];

  @Field(() => String)
  @prop({ required: true, default: () => `userStatistic_${nanoid()}`, unique: true })
  statisticId: string;
}

export const UserStatisticModel = getModelForClass<typeof UserStatistic>(UserStatistic);
