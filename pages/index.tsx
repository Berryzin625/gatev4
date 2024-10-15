import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>Página Principal</h1>
      <nav>
        <ul>
          <li>
            <Link href="/admin/add-machine">
              <a>Adicionar Máquina</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/assign-machine">
              <a>Atribuir Máquina</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
