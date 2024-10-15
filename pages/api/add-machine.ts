// pages/api/add-machine.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/dbConnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { ip, username, password } = req.body;

        // Verifica se todos os campos estão presentes
        if (!ip || !username || !password) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        const { db } = await connectToDatabase();

        try {
            // Insere a máquina no banco de dados
            const result = await db.collection('machines').insertOne({
                ip,
                username,
                password,
                userId: null, // A máquina inicialmente não estará associada a nenhum usuário
            });

            // Verifica se a máquina foi adicionada com sucesso
            if (result.acknowledged) {
                res.status(200).json({ message: 'Máquina adicionada com sucesso' });
            } else {
                res.status(500).json({ message: 'Erro ao adicionar máquina' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro interno', error: error.message });
        }
    } else {
        // Responde com 405 para métodos não permitidos
        res.status(405).json({ message: 'Método não permitido' });
    }
}
