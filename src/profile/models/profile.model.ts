import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { ExperienceModel } from './experience.model.js';
import { ProjectModel } from './project.model.js';
import { SkillModel } from './skill.model.js';

@ObjectType()
export class ProfileModel {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => [String])
  urls: string[];

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => [ExperienceModel])
  experience: ExperienceModel[];

  @Field(() => [ProjectModel])
  projects: ProjectModel[];

  @Field(() => [SkillModel])
  skills: SkillModel[];

  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}
