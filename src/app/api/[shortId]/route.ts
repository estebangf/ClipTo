import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET (req: Request, { params }: { params: { shortId: string } }) {
  const { shortId } = params;
  const db = await connectToDatabase();

  const urlEntry = await db.collection('urls').findOne({ shortId });

  if (!urlEntry) {
    return NextResponse.json({ error: 'URL not found' }, { status: 404 });
  }

  return NextResponse.redirect(urlEntry.originalUrl);
}
