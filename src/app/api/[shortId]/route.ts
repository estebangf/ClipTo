import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

if (!process.env.COLLECTION_NAME) {
  throw new Error('Please add your Collection Name to .env');
}
const COLLECTION_NAME = process.env.COLLECTION_NAME

export async function GET (req: Request, { params }: { params: { shortId: string } }) {
  const { shortId } = params;
  const db = await connectToDatabase();

  const urlEntry = await db.collection(COLLECTION_NAME).findOne({ shortId });

  if (!urlEntry) {
    return NextResponse.json({ error: 'URL not found' }, { status: 404 });
  }

  // Incrementar el contador general en la colección `urls`
  await db.collection(COLLECTION_NAME).updateOne(
    { shortId },
    { $inc: { clickCount: 1 } }
  );

  // Insertar un nuevo documento en la colección `clicks` con detalles del acceso
  await db.collection('clicks').insertOne({
    shortId,
    accessedAt: new Date(),
    device: req.headers.get('user-agent')?.includes('Mobile') ? 'mobile' : 'desktop',
    // location: 'Argentina' // Aun no hay geolocalización
  });

  // Redireccionar a la URL original
  return NextResponse.redirect(urlEntry.originalUrl);
}


export async function DELETE (request: Request, { params }: { params: { shortId: string } }) {
  const { shortId } = params;
  // console.log("BORRANDO...")

  // if (!ObjectId.isValid(shortId)) {
  //   return NextResponse.json({ error: 'ID no válido' }, { status: 400 });
  // }

  try {
    const db = await connectToDatabase();
    // const result = await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(shortId) });
    const result = await db.collection(COLLECTION_NAME).deleteOne({ shortId });


    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'URL no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'URL eliminada con éxito' }, { status: 200 });
  } catch (error) {
    console.error('Error al eliminar la URL:', error);
    return NextResponse.json({ error: 'Error al eliminar la URL' }, { status: 500 });
  }
}
