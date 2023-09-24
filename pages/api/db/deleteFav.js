import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const { user_id } = req.body;
    

    // Check if the favorite with the given ID exists
    const existingFavorite = await prisma.favorite.findUnique({
      where: { user_id },
    });

    if (!existingFavorite) {
      return res.status(404).json({ error: 'Favorite not found' });
    }

    // Delete the favorite
    await prisma.favorite.delete({
      where: { user_id },
    });

    res.status(204).send(); // Respond with a 204 (No Content) status for success
  } catch (error) {
    console.error('Error deleting favorite:', error);
    res.status(500).json({ error: 'Error deleting favorite' });
  } finally {
    await prisma.$disconnect();
  }
};
