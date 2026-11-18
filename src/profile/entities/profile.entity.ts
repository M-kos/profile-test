import type { ExperienceEntity } from './experience.entity.js';
import type { ProjectEntity } from './project.entity.js';
import type { SkillEntity } from './skill.entity.js';

export type ProfileEntity = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  urls: string[];
  description: string | null;

  experience: ExperienceEntity[];
  projects: ProjectEntity[];
  skills: SkillEntity[];

  createdAt: Date;
};
