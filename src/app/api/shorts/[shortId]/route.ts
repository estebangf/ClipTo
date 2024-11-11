import Short, { SHORTS_COLLECTION_NAME } from "@/entities/Short";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// obtencion de link especifico
export async function GET (request: Request, { params }: { params: Promise<{ shortId: string }> }) {
  const { shortId } = await params;
  const db = await connectToDatabase();

  // Obtener todas las URLs con sus estadísticas
  const url = await db.collection<Short>(SHORTS_COLLECTION_NAME).findOne({ shortId })

  return NextResponse.json(url);
}


// Actualización de link especifico
export async function PUT (request: Request, { params }: { params: Promise<{ shortId: string }> }) {
  const { shortId } = await params;
  const {
    title,
    // originalUrl
  } = await request.json();

  if (!title
    // || !originalUrl
  ) {
    return NextResponse.json({ error: 'Título y URL son requeridos' }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    const urlsCollection = db.collection<Short>(SHORTS_COLLECTION_NAME);

    // Buscar y actualizar la URL con el shortId especificado
    const result = await urlsCollection.updateOne(
      { shortId },
      {
        $set: {
          title,
          // originalUrl,
          updatedAt: new Date()
        }
      }
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

export async function DELETE (request: Request, { params }: { params: Promise<{ shortId: string }> }) {
  const { shortId } = await params;
  // console.log("BORRANDO...")

  // if (!ObjectId.isValid(shortId)) {
  //   return NextResponse.json({ error: 'ID no válido' }, { status: 400 });
  // }

  try {
    const db = await connectToDatabase();
    // const result = await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(shortId) });
    const result = await db.collection<Short>(SHORTS_COLLECTION_NAME).deleteOne({ shortId });


    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'URL no encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'URL eliminada con éxito' }, { status: 200 });
  } catch (error) {
    console.error('Error al eliminar la URL:', error);
    return NextResponse.json({ error: 'Error al eliminar la URL' }, { status: 500 });
  }
}
