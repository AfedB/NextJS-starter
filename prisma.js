const { PrismaClient } = require('@prisma/client');

// Déclaration pour éviter les duplications en développement
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

module.exports = { prisma };