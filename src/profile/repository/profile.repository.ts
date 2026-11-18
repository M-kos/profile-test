import { Injectable } from '@nestjs/common';
import { ProfileRepository } from './profile-repository.types.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { ProfileEntity } from '../entities/profile.entity.js';

@Injectable()
export class ProfileRepositoryImpl implements ProfileRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getProfile(): Promise<ProfileEntity | null> {
    return this.prismaService.profile.findFirst({
      include: {
        skills: true,
        experience: true,
        projects: true,
      },
    });
  }
}
