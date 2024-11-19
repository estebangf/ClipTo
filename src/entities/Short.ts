// import { MetadataType } from "@/lib/metadatas";

export const SHORTS_COLLECTION_NAME = "shorts"
export const TEMP_SHORTS_COLLECTION_NAME = "temp-shorts"

type Short = {
  _id?: string;
  userId: string;
  shortId: string;
  title: string;
  originalUrl: string;
  clickCount: number;
  creationDate: Date;
  lastAccessed: Date | null;
  // metadata: MetadataType | null
};


export type TempShort = {
  _id?: string;
  shortId: string;
  originalUrl: string;
  clickCount: number;
  creationDate: Date;
  lastAccessed: Date | null;
};

export default Short