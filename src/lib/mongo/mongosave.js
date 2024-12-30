import clientPromise from "@/lib/mongo/client";

export default async function MongoSave(db, col, data) {
  //TODO: Add Pino logger
  try {
    const client = await clientPromise;
    const collection = client.db(db).collection(col);
    await collection.insertOne({ data });
    console.log("Data saved into Mongo successfully.");
  } catch (error) {
    console.log(error);
  }
}
