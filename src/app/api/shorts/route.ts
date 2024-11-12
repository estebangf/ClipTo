import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { connectToDatabase } from '@/lib/mongodb';
import Short, { SHORTS_COLLECTION_NAME } from '@/entities/Short';
import { auth } from '@/auth';

// CREATE NEW
export async function POST (req: Request) {
  const session = await auth();


  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id; // ID único del usuario autenticado

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = await connectToDatabase();
  const { title, originalUrl } = await req.json();

  if (!originalUrl) {
    return NextResponse.json({ error: 'URL es requerida' }, { status: 400 });
  }

  const shortId = nanoid(7); // Generar un shortId único de 7 caracteres
  const creationDate = new Date();

  // Guardar en la colección `urls`
  await db.collection<Short>(SHORTS_COLLECTION_NAME).insertOne({
    userId,
    shortId,
    title,
    originalUrl,
    creationDate,
    clickCount: 0,
    lastAccessed: null
  });

  return NextResponse.json({ shortId, title, originalUrl, creationDate });
}


// GET ALL
// export const GET = auth(async function GET (req) {

//   console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\")
//   console.log("req", req)
//   console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\")
//   console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\")
//   console.log("req.auth", req.auth)
//   console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\")

//   const session = req.auth;

//   if (!session || !session.user || !session.user.id) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   // const userId = session.user.id; // ID único del usuario autenticado
//   const userId = session.user.email; // Email único del usuario autenticado

//   console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\")
//   console.log("userId", userId)
//   console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\")

//   if (!userId) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   const db = await connectToDatabase();

//   // Obtener todas las URLs con sus estadísticas
//   const shorts = await db.collection<Short>(SHORTS_COLLECTION_NAME).find({ userId })
//     .sort({ creationDate: -1 })
//     .toArray();

//   // Transformar los datos para incluir `lastAccessed` calculado de la colección `clicks`
//   const enhancedUrls = await Promise.all(
//     shorts.map(async (url) => {
//       const lastAccessedEntry = await db.collection('clicks')
//         .find({ shortId: url.shortId })
//         .sort({ accessedAt: -1 })
//         .limit(1)
//         .toArray();

//       return {
//         userId: url.userId,
//         shortId: url.shortId,
//         title: url.title,
//         originalUrl: url.originalUrl,
//         clickCount: url.clickCount,
//         creationDate: url.creationDate,
//         lastAccessed: lastAccessedEntry[0]?.accessedAt || null,
//       };
//     })
//   );

//   return NextResponse.json(enhancedUrls);
// })