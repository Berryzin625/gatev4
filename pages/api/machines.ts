// pages/api/machines.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import Machine from '../../models/Machine';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const machine = await Machine.create(req.body);
            res.status(201).json(machine);
        } catch (error) {
            // Use type assertion para informar ao TypeScript que 'error' é um objeto
            const message = (error as { message?: string }).message || 'Erro desconhecido';
            res.status(400).json({ message });
        }
    } else if (req.method === 'GET') {
        const machines = await Machine.find();
        res.status(200).json(machines);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
