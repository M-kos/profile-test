import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ProfileRepository } from '../repository/profile-repository.types.js';
import { PROFILE_REPOSITORY } from '../repository/profile-repository.types.js';
import { ProfileEntity } from '../entities/profile.entity.js';
import { PROFILE_NOT_FOUND } from '../../constants/errors.js';
import { ProfileService } from './profile-service.types.js';

@Injectable()
export class ProfileServiceImpl implements ProfileService {
  constructor(
    @Inject(PROFILE_REPOSITORY)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async getProfile(): Promise<ProfileEntity> {
    const profile = await this.profileRepository.getProfile();

    if (!profile) {
      throw new NotFoundException(PROFILE_NOT_FOUND);
    }

    return profile;
  }
}
