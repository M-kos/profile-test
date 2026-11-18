import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ExperienceModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  company: string;

  @Field(() => String)
  position: string;

  @Field(() => GraphQLISODateTime)
  startDate: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  endDate: Date | null;

  @Field(() => [String])
  achievements: string[];

  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}
