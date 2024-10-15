import { useState, useEffect } from 'react';

interface User {
    _id: string;
    username: string;
}

interface Machine {
    _id: string;
    ip: string;
}

export default function AssignMachine() {
    const [users, setUsers] = useState<User[]>([]);
    const [machines, setMachines] = useState<Machine[]>([]);
    const [selectedUser, setSelectedUser] = useState<string>('');
    const [selectedMachine, setSelectedMachine] = useState<string>('');
    const [isAssigning, setIsAssigning] = useState(false);

    useEffect(() => {
        // Carregar usuários e máquinas do backend
        async function fetchData() {
            const [usersRes, machinesRes] = await Promise.all([
                fetch('/api/get-users'),
                fetch('/api/get-machines'),
            ]);

            const usersData = await usersRes.json();
            const machinesData = await machinesRes.json();

            setUsers(usersData);
            setMachines(machinesData);
        }

        fetchData();
    }, []);

    const handleAssignMachine = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsAssigning(true);

        const res = await fetch('/api/assign-machine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: selectedUser, machineId: selectedMachine }),
        });

        if (res.ok) {
            alert('Máquina atribuída com sucesso!');
            setSelectedUser('');
            setSelectedMachine('');
        } else {
            alert('Erro ao atribuir máquina. Tente novamente.');
        }

        setIsAssigning(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 border-4 border-blue-500 p-10 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">Atribuir Máquina</h1>
                <form onSubmit={handleAssignMachine}>
                    <select
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        required
                        className="w-full p-3 mb-4 border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Selecione um usuário</option>
                        {users.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.username}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedMachine}
                        onChange={(e) => setSelectedMachine(e.target.value)}
                        required
                        className="w-full p-3 mb-4 border-2 border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Selecione uma máquina</option>
                        {machines.map((machine) => (
                            <option key={machine._id} value={machine._id}>
                                {machine.ip}
                            </option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded transition duration-200"
                        disabled={isAssigning}
                    >
                        {isAssigning ? 'Atribuindo...' : 'Atribuir Máquina'}
                    </button>
                </form>
            </div>
        </div>
    );
}
