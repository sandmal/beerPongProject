import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateUserStatisticInput {
  @Field(() => String)
  name: string;
}
