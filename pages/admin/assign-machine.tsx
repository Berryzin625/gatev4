// pages/assign-machine.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const AssignMachine = () => {
    const [users, setUsers] = useState([]);
    const [machines, setMachines] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedMachineId, setSelectedMachineId] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('/api/users');
                setUsers(res.data);
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        };

        const fetchMachines = async () => {
            try {
                const res = await axios.get('/api/machines'); // Certifique-se de ter essa rota
                setMachines(res.data);
            } catch (error) {
                console.error('Erro ao buscar máquinas:', error);
            }
        };

        fetchUsers();
        fetchMachines();
    }, []);

    const handleAssignMachine = async () => {
        const res = await axios.post('/api/assign-machine', {
            username: selectedUser,
            machineId: selectedMachineId,
        });

        if (res.status === 200) {
            alert('Máquina atribuída com sucesso!');
            // Redirecionar ou fazer algo após a atribuição
        } else {
            alert('Erro ao atribuir a máquina: ' + res.data.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 border-4 border-blue-500 p-10 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">Atribuir Máquinas</h1>
                <div className="mb-4">
                    <label htmlFor="user" className="block text-blue-300">Selecionar Usuário:</label>
                    <select
                        id="user"
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        className="w-full p-2 rounded"
                    >
                        <option value="">Selecione um usuário</option>
                        {users.map(user => (
                            <option key={user._id} value={user.username}>{user.username}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="machine" className="block text-blue-300">Selecionar Máquina:</label>
                    <select
                        id="machine"
                        value={selectedMachineId}
                        onChange={(e) => setSelectedMachineId(e.target.value)}
                        className="w-full p-2 rounded"
                    >
                        <option value="">Selecione uma máquina</option>
                        {machines.map(machine => (
                            <option key={machine._id} value={machine._id}>{machine.ip}</option> // Assume que `ip` é o campo que você deseja exibir
                        ))}
                    </select>
                </div>
                <button
                    onClick={handleAssignMachine}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Atribuir Máquina
                </button>
            </div>
        </div>
    );
};

export default AssignMachine;
