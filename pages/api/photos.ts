import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    const photos = await prisma.photo.findMany({
      orderBy: {id: 'desc'}
    });
    res.status(200).json(photos);
}
