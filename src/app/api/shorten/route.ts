import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { nanoid } from 'nanoid'; // Instala nanoid con `npm install nanoid`

export async function POST (req: Request) {
  const { url } = await req.json();
  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  const db = await connectToDatabase();
  const shortId = nanoid(7); // Genera un identificador único de 7 caracteres

  await db.collection('urls').insertOne({ shortId, originalUrl: url });

  return NextResponse.json({ shortId });
}
