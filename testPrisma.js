import { prisma } from './prisma.js';

async function test() {
  try {
    const accounts = await prisma.user.findMany();
    console.log(accounts);
  } catch (error) {
    console.error("Erreur:", error);
  } finally {
    await prisma.$disconnect();
  }
}

test()
  .then(() => console.log('Terminé'))
  .catch(console.error);