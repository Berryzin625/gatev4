// pages/admin/assign-machine.tsx
import { useState, useEffect } from 'react';

export default function AssignMachine() {
    const [users, setUsers] = useState([]);
    const [machines, setMachines] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedMachine, setSelectedMachine] = useState('');
    const [isAssigning, setIsAssigning] = useState(false);

    useEffect(() => {
        // Buscar usuários e máquinas do backend
        const fetchData = async () => {
            const userRes = await fetch('/api/users');
            const machineRes = await fetch('/api/machines');

            const usersData = await userRes.json();
            const machinesData = await machineRes.json();

            setUsers(usersData);
            setMachines(machinesData);
        };

        fetchData();
    }, []);

    const handleAssign = async () => {
        if (!selectedUser || !selectedMachine) {
            alert('Por favor, selecione um usuário e uma máquina');
            return;
        }

        setIsAssigning(true);

        const res = await fetch('/api/assign-machine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: selectedUser, machineId: selectedMachine }),
        });

        if (res.ok) {
            alert('Máquina associada com sucesso!');
            setSelectedUser('');
            setSelectedMachine('');
        } else {
            alert('Erro ao associar máquina. Tente novamente.');
        }

        setIsAssigning(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 border-4 border-blue-500 p-10 rounded-lg shadow-lg max-w-md w-full transition duration-300 transform hover:scale-105">
                <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">Associar Máquina</h1>
                
                <div className="mb-4">
                    <label className="block text-blue-300 mb-2">Selecione o Usuário:</label>
                    <select
                        className="w-full p-3 border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                    >
                        <option value="">Selecione um usuário</option>
                        {users.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-blue-300 mb-2">Selecione a Máquina:</label>
                    <select
                        className="w-full p-3 border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={selectedMachine}
                        onChange={(e) => setSelectedMachine(e.target.value)}
                    >
                        <option value="">Selecione uma máquina</option>
                        {machines.map((machine) => (
                            <option key={machine._id} value={machine._id}>
                                {machine.ip} - {machine.username}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={handleAssign}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded transition duration-200"
                    disabled={isAssigning}
                >
                    {isAssigning ? 'Associando...' : 'Associar Máquina'}
                </button>
            </div>
        </div>
    );
}
