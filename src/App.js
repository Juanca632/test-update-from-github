import React, { useState } from 'react';
import './App.css';

function App() {

  const [hasUpdate, setHasUpdate] = useState(false);

  // Función para buscar si hay updates
  const checkForUpdates = async () => {
    const repoUrl = 'https://api.github.com/repos/Juanca632/test-update-from-github/commits?sha=main';
    
    try {
      const response = await fetch(repoUrl);
      const data = await response.json();
      const latestCommitSha = data[0].sha; // SHA del último commit en GitHub
      console.log('Último commit en GitHub:', latestCommitSha);

      // Aquí obtienes el SHA local llamando a tu backend FastAPI
      const localCommitSha = await getLocalCommitSha();
      console.log('Último commit local:', localCommitSha);

      if (localCommitSha !== latestCommitSha) {
        setHasUpdate(true); // Si son diferentes, hay un update
        alert('Hay un nuevo commit, ¿deseas hacer pull?');
      } else {
        setHasUpdate(false); // Si son iguales, no hay update
        alert('No hay actualizaciones');
      }
    } catch (error) {
      console.error('Error al buscar commits:', error);
    }
  };

  // Obtener el último SHA local desde el backend FastAPI
  const getLocalCommitSha = async () => {
    try {
      const response = await fetch('http://localhost:8000/commit-sha'); // Llama al backend FastAPI
      const data = await response.json();
      console.log(data);
      return data.commit_sha;
    } catch (error) {
      console.error('Error al obtener el commit local:', error);
      return null;
    }
  };

  return (
    <div className="app" onClick={checkForUpdates}>
      <div>
        Update
      </div>
    </div>
  );
}

export default App;
