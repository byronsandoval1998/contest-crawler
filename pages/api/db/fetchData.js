import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const concurso = await prisma.concursos.findMany();
    
    res.status(200).json(concurso);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  } finally {
    await prisma.$disconnect();
  }
};
