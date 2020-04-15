import React, { useState, useEffect } from "react";

import api from '../src/services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      title: "Desafio conceitos de NodeJS",
      url: "https://github.com/thudf/conceitos-nodejs",
      techs: ["NodeJS", "ExpressJS", "Nodemon", "uuidv4"]
    };
    
    const response = await api.post('/repositories', newRepository);

    if (response.status === 200) {
      setRepositories([...repositories, response.data]);
    }
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    const response = await api.delete(`/repositories/${id}`)

    if (response.status === 204) {
      setRepositories([...repositories.slice(0, repositoryIndex), ...repositories.slice(repositoryIndex + 1, repositories.length)]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
