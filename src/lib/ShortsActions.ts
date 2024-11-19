'use server'


if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  throw new Error('Invalid/Missing environment variable: "NEXT_PUBLIC_API_BASE_URL"')
}

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

import Short, { SHORTS_COLLECTION_NAME, TEMP_SHORTS_COLLECTION_NAME, TempShort } from "@/entities/Short";
import { connectToDatabase } from "./mongodb";
import { auth } from "@/auth";
import {
  // InsertOneResult,
  UpdateResult
} from "mongodb";
import { nanoid } from 'nanoid';
import isValidHttpUrl from "./isValidHttpUrl";
// import validateAndFetchMetadata from "./metadatas";

async function getShort (shortId: string): Promise<Short> {
  const db = await connectToDatabase();
  const session = await auth()

  if (!session || !session.user || !session.user.id)
    throw new Error("Login please");

  const short = await db.collection<Short>(SHORTS_COLLECTION_NAME).findOne({ userId: session.user.id, shortId })

  if (!short)
    throw new Error("Short not exist");

  return ({
    ...short,
    _id: short._id.toString()
  });
}

async function getShorts (): Promise<Short[]> {
  const db = await connectToDatabase();
  const session = await auth()

  // console.log('\\\\\\\\\\\\\\   session   \\\\\\\\\\\\\\\\\\')
  // console.log(session)
  // console.log('\\\\\\\\\\\  END session END   \\\\\\\\\\\\\\')

  if (!session || !session.user || !session.user.id) {
    throw new Error("Login please");
  }

  const shorts = await db.collection<Short>(SHORTS_COLLECTION_NAME).find({ userId: session.user.id })

  if (!shorts)
    throw new Error("Short not exist");

  const shortsList = (await shorts.toArray()).map(e => ({
    ...e,
    _id: e._id.toString()
  }));

  return shortsList
}

async function updateShort (short: {
  shortId: string,
  title: string,
  // originalUrl: string
}): Promise<UpdateResult<Short>> {
  const db = await connectToDatabase();
  const session = await auth()

  if (!session || !session.user || !session.user.id)
    throw new Error("Login please");

  // const _short = await getShort(short.shortId);
  // const metadata = await validateAndFetchMetadata(_short.originalUrl)

  const shortUpdated = await db.collection<Short>(SHORTS_COLLECTION_NAME).updateOne(
    { userId: session.user.id, shortId: short.shortId },
    {
      $set: {
        title: short.title,
        // originalUrl: short.originalUrl, // NO QUIERO MODIFICAR POR AHORA LA URL
        // updatedAt: new Date(),
        // metadata: metadata.metadata //  ESTÁ DESABILITADA LA METADATA POR AHORA
      }
    }
  )

  if (!shortUpdated.matchedCount)
    throw new Error("Short not exist");

  return shortUpdated;
}

async function deleteShort (shortId: string) {
  const db = await connectToDatabase();
  const session = await auth()

  if (!session || !session.user || !session.user.id)
    throw new Error("Login please");

  const result = await db.collection<Short>(SHORTS_COLLECTION_NAME).deleteOne(
    { userId: session.user.id, shortId },
  );

  if (result.deletedCount === 0) {
    throw new Error("Not deleted");
  }

  return result;
}

// async function createShort (short: { title: string, originalUrl: string }): Promise<InsertOneResult<Short>> {
async function createShort (short: { title: string, originalUrl: string }): Promise<string> {
  if (!isValidHttpUrl(short.originalUrl)) {
    throw new Error('La URL proporcionada no es válida.');
  }

  const db = await connectToDatabase();
  const session = await auth()

  if (!session || !session.user || !session.user.id)
    throw new Error("Login please");


  const shortId = nanoid(7); // Generar un shortId único de 7 caracteres
  const creationDate = new Date();
  // const metadata = await validateAndFetchMetadata(short.originalUrl)

  const shortInserted = await db.collection<Short>(SHORTS_COLLECTION_NAME).insertOne(
    {
      userId: session.user.id,
      shortId,
      title: short.title,
      originalUrl: short.originalUrl,
      clickCount: 0,
      creationDate,
      lastAccessed: null,
      // metadata: metadata.valid ? metadata.metadata : null
    },
  )

  if (!shortInserted.insertedId)
    throw new Error("Short not created");

  return shortInserted.insertedId.toString();
}

export const createTemporalyShorten = async (prevState: any, formData: FormData) => {
  try {
    const db = await connectToDatabase();

    const originalUrl = formData.get('url')?.toString().trim() || ''

    if (!isValidHttpUrl(originalUrl)) {
      throw new Error('La URL proporcionada no es válida.');
    }

    if (!originalUrl)
      throw new Error("Short not created");

    const shortId = nanoid(7); // Generar un shortId único de 7 caracteres
    const creationDate = new Date();

    const shortInserted = await db.collection<TempShort>(TEMP_SHORTS_COLLECTION_NAME).insertOne(
      {
        shortId,
        originalUrl,
        clickCount: 0,
        creationDate,
        lastAccessed: null,
        // metadata: metadata.valid ? metadata.metadata : null
      },
    )

    if (!shortInserted.insertedId)
      throw new Error("Short not created");

    return ({ message: `${NEXT_PUBLIC_API_BASE_URL}/${shortId}` })
  } catch (error: any) {
    return ({ message: error.message })
  }
};


export {
  getShort,
  getShorts,
  updateShort,
  deleteShort,
  createShort
}