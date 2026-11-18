import { Module } from '@nestjs/common';
import { ProfileServiceImpl } from './service/profile.service.js';
import { ProfileResolver } from './resolver/profile.resolver.js';
import { PROFILE_REPOSITORY } from './repository/profile-repository.types.js';
import { ProfileRepositoryImpl } from './repository/profile.repository.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { PROFILE_SERVICE } from './service/profile-service.types.js';

@Module({
  imports: [PrismaModule],
  providers: [
    ProfileResolver,
    {
      provide: PROFILE_SERVICE,
      useClass: ProfileServiceImpl,
    },
    {
      provide: PROFILE_REPOSITORY,
      useClass: ProfileRepositoryImpl,
    },
  ],
})
export class ProfileModule {}
