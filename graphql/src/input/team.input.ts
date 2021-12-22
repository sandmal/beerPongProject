import { IsNumber, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

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
