'use server'

import Short, { SHORTS_COLLECTION_NAME } from "@/entities/Short";
import { connectToDatabase } from "./mongodb";
import { auth } from "@/auth";
import { InsertOneResult, UpdateResult } from "mongodb";
import { nanoid } from 'nanoid';

async function getShort (shortId: string): Promise<Short> {
  const db = await connectToDatabase();
  const session = await auth()

  if (!session || !session.user || !session.user.id)
    throw new Error("Login please");

  const short = await db.collection<Short>(SHORTS_COLLECTION_NAME).findOne({ userId: session.user.id, shortId })

  if (!short)
    throw new Error("Short not exist");

  return short;
}

async function getShorts (): Promise<Short[]> {
  const db = await connectToDatabase();
  const session = await auth()

  if (!session || !session.user || !session.user.id)
    throw new Error("Login please");

  const short = await db.collection<Short>(SHORTS_COLLECTION_NAME).find({ userId: session.user.id })

  if (!short)
    throw new Error("Short not exist");

  return short.toArray();

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

  const shortUpdated = await db.collection<Short>(SHORTS_COLLECTION_NAME).updateOne(
    { userId: session.user.id, shortId: short.shortId },
    {
      $set: {
        title: short.title,
        // originalUrl: short.originalUrl,
        updatedAt: new Date()
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

async function createShort (short: { title: string, originalUrl: string }): Promise<InsertOneResult<Short>> {
  const db = await connectToDatabase();
  const session = await auth()

  if (!session || !session.user || !session.user.id)
    throw new Error("Login please");


  const shortId = nanoid(7); // Generar un shortId único de 7 caracteres
  const creationDate = new Date();

  const shortInserted = await db.collection<Short>(SHORTS_COLLECTION_NAME).insertOne(
    {
      userId: session.user.id,
      shortId,
      title: short.title,
      originalUrl: short.originalUrl,
      clickCount: 0,
      creationDate,
      lastAccessed: null,
    },
  )

  if (!shortInserted.insertedId)
    throw new Error("Short not created");

  return shortInserted;
}

const ShortActions = {
  getShort,
  getShorts,
  updateShort,
  deleteShort,
  createShort
}

export default ShortActions