// pages/api/assign-machine.ts
import dbConnect from '../../lib/dbConnect';
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    if (req.method === 'POST') {
        try {
            const { userId, machineId } = req.body;

            // Lógica para associar a máquina ao usuário
            const result = await db.collection('users').updateOne(
                { _id: new ObjectId(userId) },
                { $set: { machineId: machineId } }
            );

            if (result.modifiedCount === 1) {
                res.status(200).json({ message: 'Máquina associada com sucesso' });
            } else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro interno', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
}
