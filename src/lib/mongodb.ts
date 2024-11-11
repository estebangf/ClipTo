// import { MongoClient } from 'mongodb';

// if (!process.env.MONGODB_URI || !process.env.DB_NAME) {
//   throw new Error('Please add your MongoDB URI to .env');
// }

// const DB_NAME = process.env.DB_NAME
// const MONGODB_URI = process.env.MONGODB_URI

// const MongoDbClient = new MongoClient(MONGODB_URI);

// export const connectToDatabase = async () => {
//   // Use connect method to connect to the server
//   await MongoDbClient.connect();
//   // console.log('Connected successfully to server');
//   const db = MongoDbClient.db(DB_NAME);
//   // const collection = db.collection('documents');

//   // the following code examples can be pasted here...

//   return db // Cambia 'urlShortener' por el nombre de tu base de datos
// };

// export default MongoDbClient

// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient, ServerApiVersion } from "mongodb"

if (!process.env.MONGODB_URI || !process.env.DB_NAME) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const DB_NAME = process.env.DB_NAME
const MONGODB_URI = process.env.MONGODB_URI
const NODE_ENV = process.env.NODE_ENV

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}

let MongoDbClient: MongoClient

if (NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient
  }

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(MONGODB_URI, options)
  }
  MongoDbClient = globalWithMongo._mongoClient
} else {
  // In production mode, it's best to not use a global variable.
  MongoDbClient = new MongoClient(MONGODB_URI, options)
}

export default MongoDbClient

// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export const connectToDatabase = async () => {
  // Use connect method to connect to the server
  await MongoDbClient.connect();
  // console.log('Connected successfully to server');
  const db = MongoDbClient.db(DB_NAME);
  // const collection = db.collection('documents');

  // the following code examples can be pasted here...

  return db
};