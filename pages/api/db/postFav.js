import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const { user_id, title, pdate, link } = req.body;

   

    // Create a new favorite record in the "favorite" table
    const newFavorite = await prisma.favorite.create({
      data: {
        user_id,
        title,
        pdate,
        link,
      },
    });

    res.status(200).json(newFavorite);
  } catch (error) {
    console.error('Error posting data:', error);
    res.status(500).json({ error: 'Error posting data' });
  } finally {
    await prisma.$disconnect();
  }
};