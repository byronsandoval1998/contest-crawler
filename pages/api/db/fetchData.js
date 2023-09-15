import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const concursos = await prisma.concursos.findMany();
    res.status(200).json(concursos);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  } finally {
    await prisma.$disconnect();
  }
};
