// lib/dbConnect.ts
import mongoose from 'mongoose';

interface Connection {
    isConnected?: number; // Propriedade opcional para o estado da conexão
}

const connection: Connection = {};

// Função para conectar ao banco de dados
async function dbConnect() {
    if (connection.isConnected) {
        return; // Se já estiver conectado, retorna
    }

    const db = await mongoose.connect(process.env.MONGODB_URI || '', {
        
    });

    connection.isConnected = db.connection.readyState; // Atualiza o estado da conexão
}

export default dbConnect;
