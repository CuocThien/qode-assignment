import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      const deletedComment = await prisma.comment.update({
        where: { id: Number(id) },
        data: {
          isDeleted: true,
          deletedAt: new Date()
        }
      });
      res.status(200).json(deletedComment);
    } catch (error) {
      res.status(500).json({ message: 'Error removing comment' });
    }
  } else {
    const { id } = req.query;
      const comments = await prisma.comment.findMany({
        where: { photoId: Number(id), isDeleted: false },
      });
      res.status(200).json(comments);
  }
}
