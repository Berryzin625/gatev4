// pages/api/machines.ts
import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
    const { db } = await connectToDatabase();
    const machines = await db.collection('machines').find().toArray();
    res.json(machines);
}
