import { ProfileEntity } from '../entities/profile.entity.js';

export const PROFILE_REPOSITORY = Symbol('PROFILE_REPOSITORY');

export interface ProfileRepository {
  getProfile(): Promise<ProfileEntity | null>;
}
