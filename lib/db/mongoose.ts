import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn: Promise<typeof mongoose> | undefined;
}

export async function getDbConnection(): Promise<typeof mongoose> {
  if (global._mongooseConn) return global._mongooseConn;

  global._mongooseConn = (async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("Missing MONGO_URI environment variable");
    }
    // Avoid multiple connections during dev/hot-reload
    if (mongoose.connection.readyState === 1) return mongoose;
    await mongoose.connect(uri, {
      autoIndex: true,
      maxPoolSize: 10,
    });
    return mongoose;
  })();

  return global._mongooseConn;
}
