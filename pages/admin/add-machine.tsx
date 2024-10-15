import { useState } from 'react';
import axios from 'axios';

const AddMachine = () => {
  const [ip, setIp] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/machines', { ip, username, password });
      alert('Máquina adicionada com sucesso!');
      setIp('');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Erro ao adicionar máquina', error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Adicionar Máquina</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="IP da Máquina"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          className="border p-2 rounded mb-4 w-full"
        />
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded mb-4 w-full"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded mb-4 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Adicionar Máquina
        </button>
      </form>
    </div>
  );
};

export default AddMachine;
