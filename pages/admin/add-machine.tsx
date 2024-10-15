// pages/admin/add-machine.tsx
import { useState } from 'react';

export default function AddMachine() {
    const [ip, setIp] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    // Defina o tipo de 'e' explicitamente como React.FormEvent
    const handleAddMachine = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsAdding(true);

        const res = await fetch('/api/add-machine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ip, username, password }),
        });

        if (res.ok) {
            alert('Máquina adicionada com sucesso!');
            setIp('');
            setUsername('');
            setPassword('');
        } else {
            alert('Erro ao adicionar máquina. Tente novamente.');
        }

        setIsAdding(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 border-4 border-blue-500 p-10 rounded-lg shadow-lg max-w-md w-full transition duration-300 transform hover:scale-105">
                <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">Adicionar Máquina</h1>
                <form onSubmit={handleAddMachine}>
                    <input
                        type="text"
                        placeholder="IP da Máquina"
                        value={ip}
                        onChange={(e) => setIp(e.target.value)}
                        required
                        className="w-full p-3 mb-4 border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        placeholder="Usuário da Máquina"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full p-3 mb-4 border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        placeholder="Senha da Máquina"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 mb-4 border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded transition duration-200"
                        disabled={isAdding}
                    >
                        {isAdding ? 'Adicionando...' : 'Adicionar Máquina'}
                    </button>
                </form>
            </div>
        </div>
    );
}
