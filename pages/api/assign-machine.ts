// pages/api/assign-machine.ts
import { connectToDatabase } from '../../utils/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { userId, machineId } = req.body;

        const { db } = await connectToDatabase();

        try {
            // Atualiza a máquina associando ao usuário
            const result = await db.collection('machines').updateOne(
                { _id: new ObjectId(machineId) },
                { $set: { userId: new ObjectId(userId) } }
            );

            if (result.modifiedCount > 0) {
                res.status(200).json({ message: 'Máquina associada com sucesso' });
            } else {
                res.status(500).json({ message: 'Falha ao associar a máquina' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro interno', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
}
