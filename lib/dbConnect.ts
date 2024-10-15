// lib/dbConnect.ts
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI || '');

export default async function connectToDatabase() {
    if (!client.isConnected()) await client.connect();
    const db = client.db(process.env.DB_NAME);
    return { db, client };
}
