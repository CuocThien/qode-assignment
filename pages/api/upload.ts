import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { base64 } = req.body;

      if (!base64) {
        return res.status(400).json({ message: 'No image provided' });
      }

      const newImage = await prisma.photo.create({
        data: {
          base64,
        },
      });

      res.status(200).json(newImage);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving image' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
