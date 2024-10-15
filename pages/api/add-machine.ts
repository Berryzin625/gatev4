import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

// Conectar ao banco de dados MongoDB
const connectToDatabase = async () => {
    if (mongoose.connection.readyState === 1) return; // Já está conectado
    await mongoose.connect(process.env.MONGODB_URI!, {

    });
};

// Definir o esquema da máquina
const machineSchema = new mongoose.Schema({
    ip: String,
    username: String,
    password: String,
});

const Machine = mongoose.model('Machine', machineSchema);

export default async function addMachine(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();

    if (req.method === 'POST') {
        const { ip, username, password } = req.body;

        try {
            const newMachine = new Machine({ ip, username, password });
            await newMachine.save();
            res.status(200).json({ message: 'Máquina adicionada com sucesso' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: 'Erro interno', error: error.message });
            } else {
                res.status(500).json({ message: 'Erro interno', error: 'Erro desconhecido' });
            }
        }
    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
}
