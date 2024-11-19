import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Short, { SHORTS_COLLECTION_NAME, TEMP_SHORTS_COLLECTION_NAME, TempShort } from '@/entities/Short';

export async function GET (request: Request, { params }: { params: Promise<{ shortId: string }> }) {
  const { shortId } = await params;
  const db = await connectToDatabase();

  const urlEntry = await db.collection<Short>(SHORTS_COLLECTION_NAME).findOne({ shortId });

  if (!urlEntry) {
    const urlEntryTemp = await db.collection<TempShort>(TEMP_SHORTS_COLLECTION_NAME).findOne({ shortId });

    if (!urlEntryTemp)
      return NextResponse.json({ error: 'URL not found' }, { status: 404 });

    if (urlEntryTemp.clickCount < 3)
      await db.collection<Short>(SHORTS_COLLECTION_NAME).updateOne(
        { shortId },
        { $inc: { clickCount: 1 } }
      );
    else
      await db.collection<Short>(SHORTS_COLLECTION_NAME).deleteOne({ shortId });
    return NextResponse.redirect(urlEntryTemp.originalUrl);
  }

  // Incrementar el contador general en la colección `urls`
  await db.collection<Short>(SHORTS_COLLECTION_NAME).updateOne(
    { shortId },
    { $inc: { clickCount: 1 } }
  );

  // Insertar un nuevo documento en la colección `clicks` con detalles del acceso
  await db.collection('clicks').insertOne({
    shortId,
    accessedAt: new Date(),
    device: request.headers.get('user-agent')?.includes('Mobile') ? 'mobile' : 'desktop',
    // location: 'Argentina' // Aun no hay geolocalización
  });

  // Redireccionar a la URL original
  return NextResponse.redirect(urlEntry.originalUrl);
}