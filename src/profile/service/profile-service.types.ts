import { ProfileEntity } from '../entities/profile.entity.js';

export const PROFILE_SERVICE = Symbol('PROFILE_SERVICE');

export interface ProfileService {
  getProfile(): Promise<ProfileEntity>;
}
