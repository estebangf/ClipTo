import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { connectToDatabase } from '@/lib/mongodb';

if (!process.env.COLLECTION_NAME) {
  throw new Error('Please add your Collection Name to .env');
}
const COLLECTION_NAME = process.env.COLLECTION_NAME

// CREATE NEW
export async function POST (req: Request) {
  const db = await connectToDatabase();
  const { title, originalUrl } = await req.json();

  if (!originalUrl) {
    return NextResponse.json({ error: 'URL es requerida' }, { status: 400 });
  }

  const shortId = nanoid(7); // Generar un shortId único de 7 caracteres
  const creationDate = new Date();

  // Guardar en la colección `urls`
  await db.collection(COLLECTION_NAME).insertOne({
    shortId,
    title,
    originalUrl,
    creationDate,
    clickCount: 0,
  });

  return NextResponse.json({ shortId, title, originalUrl, creationDate });
}


// GET ALL
export async function GET () {
  const db = await connectToDatabase();

  // Obtener todas las URLs con sus estadísticas
  const shorts = await db.collection(COLLECTION_NAME).find({})
    .sort({ creationDate: -1 })
    .toArray();

  // Transformar los datos para incluir `lastAccessed` calculado de la colección `clicks`
  const enhancedUrls = await Promise.all(
    shorts.map(async (url) => {
      const lastAccessedEntry = await db.collection('clicks')
        .find({ shortId: url.shortId })
        .sort({ accessedAt: -1 })
        .limit(1)
        .toArray();

      return {
        shortId: url.shortId,
        title: url.title,
        originalUrl: url.originalUrl,
        clickCount: url.clickCount,
        creationDate: url.creationDate,
        lastAccessed: lastAccessedEntry[0]?.accessedAt || null,
      };
    })
  );

  return NextResponse.json(enhancedUrls);
}