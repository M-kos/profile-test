import { describe, expect, it, vi } from 'vitest';

import { ProfileRepositoryImpl } from './profile.repository.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { ProfileEntity } from '../entities/profile.entity.js';

describe('ProfileRepositoryImpl', () => {
  it('should return profile with related entities', async () => {
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

    const findFirst = vi.fn().mockResolvedValue(profile);

    const prismaService = {
      profile: { findFirst },
    } as unknown as PrismaService;

    const repository = new ProfileRepositoryImpl(prismaService);

    const result = await repository.getProfile();

    expect(result).toEqual(profile);
    expect(findFirst).toHaveBeenCalledOnce();
    expect(findFirst).toHaveBeenCalledWith({
      include: {
        skills: true,
        experience: true,
        projects: true,
      },
    });
  });

  it('should return null when profile does not exist', async () => {
    const findFirst = vi.fn().mockResolvedValue(null);

    const prismaService = {
      profile: { findFirst },
    } as unknown as PrismaService;

    const repository = new ProfileRepositoryImpl(prismaService);

    const result = await repository.getProfile();

    expect(result).toBeNull();
    expect(findFirst).toHaveBeenCalledOnce();
  });

  it('should propagate Prisma errors', async () => {
    const error = new Error('Database error');
    const findFirst = vi.fn().mockRejectedValue(error);

    const prismaService = {
      profile: { findFirst },
    } as unknown as PrismaService;

    const repository = new ProfileRepositoryImpl(prismaService);

    await expect(repository.getProfile()).rejects.toThrow(error);
    expect(findFirst).toHaveBeenCalledOnce();
  });
});
