import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    const username = req.headers.username;

    if (!username) {
        return res.status(400).json({ message: 'Usuário não fornecido' });
    }

    try {
        // Buscando o usuário e populando os dados da máquina associada
        const user = await User.findOne({ username }).populate('machineId'); // Preenchendo a máquina associada

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const userData = {
            username: user.username,
            email: user.email,
            ip: user.machineId ? user.machineId.ip : null, // Obtemos o IP da máquina associada
            machine: user.machineId || null, // Incluindo a máquina associada
        };

        return res.status(200).json(userData);
    } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        return res.status(500).json({ message: 'Erro ao buscar dados do usuário' });
    }
}
