import { NotFoundException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';

import { ProfileServiceImpl } from './profile.service.js';
import type { ProfileRepository } from '../repository/profile-repository.types.js';
import { PROFILE_NOT_FOUND } from '../../constants/errors.js';
import type { ProfileEntity } from '../entities/profile.entity.js';

describe('ProfileServiceImpl', () => {
  it('should return profile when it exists', async () => {
    const profile = {
      id: 1,
      firstName: 'Konstantin',
      lastName: 'Melnikov',
      email: 'test@example.com',
      urls: [],
      description: null,
      createdAt: new Date(),
      skills: [],
      experience: [],
      projects: [],
    } satisfies ProfileEntity;

    const getProfile = vi.fn().mockResolvedValue(profile);

    const profileRepository: ProfileRepository = {
      getProfile,
    };

    const service = new ProfileServiceImpl(profileRepository);

    const result = await service.getProfile();

    expect(result).toEqual(profile);
    expect(getProfile).toHaveBeenCalledOnce();
  });

  it('should throw NotFoundException when profile does not exist', async () => {
    const getProfile = vi.fn().mockResolvedValue(null);

    const profileRepository: ProfileRepository = {
      getProfile,
    };

    const service = new ProfileServiceImpl(profileRepository);

    await expect(service.getProfile()).rejects.toThrow(
      new NotFoundException(PROFILE_NOT_FOUND),
    );

    expect(getProfile).toHaveBeenCalledOnce();
  });

  it('should propagate repository errors', async () => {
    const error = new Error('Database error');
    const getProfile = vi.fn().mockRejectedValue(error);

    const profileRepository: ProfileRepository = {
      getProfile,
    };

    const service = new ProfileServiceImpl(profileRepository);

    await expect(service.getProfile()).rejects.toThrow(error);
    expect(getProfile).toHaveBeenCalledOnce();
  });
});
