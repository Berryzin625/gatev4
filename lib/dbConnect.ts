// lib/dbConnect.ts
import mongoose from 'mongoose';

const connection = {};

// Função para conectar ao banco de dados
async function dbConnect() {
    if (connection.isConnected) {
        return;
    }

    const db = await mongoose.connect(process.env.MONGODB_URI || '', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    connection.isConnected = db.connection.readyState;
}

export default dbConnect;
