// pages/api/assign-machine.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';
import Machine from '../../models/Machine';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    if (req.method === 'POST') {
        const { username, machineId } = req.body;

        try {
            // Encontrar o usuário e a máquina
            const user = await User.findOne({ username });
            const machine = await Machine.findById(machineId);

            if (!user || !machine) {
                return res.status(404).json({ message: 'Usuário ou máquina não encontrado' });
            }

            // Atribuir a máquina ao usuário
            user.machineId = machine._id; // Atribui o ID da máquina ao usuário
            await user.save();

            return res.status(200).json({ message: 'Máquina atribuída com sucesso' });
        } catch (error) {
            console.error('Erro ao atribuir a máquina:', error);
            return res.status(500).json({ message: 'Erro ao atribuir a máquina' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
