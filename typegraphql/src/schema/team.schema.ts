import { getModelForClass, index, prop, Ref } from '@typegoose/typegoose';
import { customAlphabet } from 'nanoid';
import { Field, ObjectType } from 'type-graphql';
import { TeamSize } from '../types/team';
import { Member } from './member.schema';
import { User } from './user.schema';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 10);

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

  @Field(() => [Member])
  @prop({ items: User, default: [] })
  members: Member[];

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
