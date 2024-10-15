// pages/api/add-machine.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect'; // Corrigido para usar o Mongoose
import mongoose from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect(); // Conecta ao banco de dados

    if (req.method === 'POST') {
        const { ip, username, password } = req.body;

        // Verifica se todos os campos foram preenchidos
        if (!ip || !username || !password) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        try {
            const Machine = mongoose.model('Machine', new mongoose.Schema({
                ip: String,
                username: String,
                password: String,
                userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
            }));

            // Insere a máquina no banco de dados
            const machine = new Machine({ ip, username, password });
            await machine.save();

            res.status(200).json({ message: 'Máquina adicionada com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro interno', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
}
