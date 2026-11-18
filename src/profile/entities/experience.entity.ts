export type ExperienceEntity = {
  id: number;
  company: string;
  position: string;
  startDate: Date;
  endDate: Date | null;
  achievements: string[];
  profileId: number;

  createdAt: Date;
};
