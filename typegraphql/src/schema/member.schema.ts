import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Member {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  name: string;
}
