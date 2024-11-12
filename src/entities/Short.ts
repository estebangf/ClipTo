export const SHORTS_COLLECTION_NAME = "shorts"

type Short = {
  _id?: string;
  userId: string;
  shortId: string;
  title: string;
  originalUrl: string;
  clickCount: number;
  creationDate: Date;
  lastAccessed: Date | null;
};


export default Short