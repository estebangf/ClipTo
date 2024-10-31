import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI || !process.env.DB_NAME) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const DB_NAME = process.env.DB_NAME
const MONGODB_URI = process.env.MONGODB_URI

const client = new MongoClient(MONGODB_URI);

export const connectToDatabase = async () => {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(DB_NAME);
  // const collection = db.collection('documents');

  // the following code examples can be pasted here...

  return db // Cambia 'urlShortener' por el nombre de tu base de datos
};
