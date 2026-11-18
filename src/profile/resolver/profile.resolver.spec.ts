import { describe, expect, it, vi } from 'vitest';

import { ProfileResolver } from './profile.resolver.js';
import type { ProfileService } from '../service/profile-service.types.js';
import type { ProfileEntity } from '../entities/profile.entity.js';

describe('ProfileResolver', () => {
  it('should return profile from service', async () => {
    const profile = {
      id: 1,
      firstName: 'Konstantin',
      lastName: 'Melnikov',
    } as ProfileEntity;

    const getProfile = vi.fn().mockResolvedValue(profile);

    const profileService: ProfileService = {
      getProfile,
    };

    const resolver = new ProfileResolver(profileService);

    const result = await resolver.profile();

    expect(result).toEqual(profile);
    expect(getProfile).toHaveBeenCalledOnce();
  });

  it('should propagate service errors', async () => {
    const error = new Error('Service error');
    const getProfile = vi.fn().mockRejectedValue(error);

    const profileService: ProfileService = {
      getProfile,
    };

    const resolver = new ProfileResolver(profileService);

    await expect(resolver.profile()).rejects.toThrow(error);
    expect(getProfile).toHaveBeenCalledOnce();
  });
});
