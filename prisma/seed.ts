import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/client.js';
import { PROFILE } from '../data/profile.js';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const profile = await prisma.profile.upsert({
    where: { email: PROFILE.email },
    update: {},
    create: {
      email: PROFILE.email,
      firstName: PROFILE.firstName,
      lastName: PROFILE.lastName,
      urls: PROFILE.urls,
      description: PROFILE.description,
      experience: {
        create: PROFILE.experience,
      },
      projects: {
        create: PROFILE.projects,
      },
      skills: {
        create: PROFILE.skills,
      },
    },
  });
  console.log(profile);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
