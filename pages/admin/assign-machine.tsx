import { useState } from 'react';
import axios from 'axios';

const AssignMachine = () => {
  const [username, setUsername] = useState('');
  const [machineId, setMachineId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/assign-machine', { username, machineId });
      console.log('Máquina atribuída:', response.data);
    } catch (error) {
      console.error('Erro ao atribuir máquina:', error);
    }
  };

  return (
    <div>
      <h1>Atribuir Máquina</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="ID da Máquina"
          value={machineId}
          onChange={(e) => setMachineId(e.target.value)}
        />
        <button type="submit">Atribuir</button>
      </form>
    </div>
  );
};

export default AssignMachine;
