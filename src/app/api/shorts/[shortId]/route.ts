import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

if (!process.env.COLLECTION_NAME) {
  throw new Error('Please add your Collection Name to .env');
}
const COLLECTION_NAME = process.env.COLLECTION_NAME

// obtencion de link especifico
export async function GET (request: Request, { params }: { params: Promise<{ shortId: string }> }) {
  const { shortId } = await params;
  const db = await connectToDatabase();

  // Obtener todas las URLs con sus estadísticas
  const url = await db.collection(COLLECTION_NAME).findOne({ shortId })

  return NextResponse.json(url);
}


// Actualización de link especifico
export async function PUT (request: Request, { params }: { params: Promise<{ shortId: string }> }) {
  const { shortId } = await params;
  const { title, originalUrl } = await request.json();

  if (!title || !originalUrl) {
    return NextResponse.json({ error: 'Título y URL son requeridos' }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    const urlsCollection = db.collection(COLLECTION_NAME);

    // Buscar y actualizar la URL con el shortId especificado
    const result = await urlsCollection.updateOne(
      { shortId },
      { $set: { title, originalUrl, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'URL no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'URL actualizada correctamente' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al actualizar la URL' }, { status: 500 });
  }
}
