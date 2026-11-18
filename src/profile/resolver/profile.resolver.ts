import { Query, Resolver } from '@nestjs/graphql';
import { ProfileModel } from '../models/profile.model.js';
import { ProfileEntity } from '../entities/profile.entity.js';
import { Inject } from '@nestjs/common';
import type { ProfileService } from '../service/profile-service.types.js';
import { PROFILE_SERVICE } from '../service/profile-service.types.js';

@Resolver()
export class ProfileResolver {
  constructor(
    @Inject(PROFILE_SERVICE)
    private readonly profileService: ProfileService,
  ) {}

  @Query(() => ProfileModel)
  profile(): Promise<ProfileEntity> {
    return this.profileService.getProfile();
  }
}
