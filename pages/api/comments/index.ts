import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { photoId, text } = req.body;
      const newComment = await prisma.comment.create({
        data: {
          text,
          photoId,
          isDeleted: false,
        },
      });
      res.status(200).json(newComment);
    } catch (error) {
      res.status(500).json({ message: 'Error adding comment' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
