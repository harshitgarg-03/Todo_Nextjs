import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  console.log("Define the Mongo ulr in environment variable ");
}

let cache = globalThis.mongoose;

if (!cache) {
  cache = globalThis.mongoose = { conn: null, promise: null };
}

async function dbConnection() {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGO_URI);
  }

  cache.conn = await cache.promise;

  console.log("Mongo db connected ⛳");

  return cache.conn;
}

export default dbConnection;
