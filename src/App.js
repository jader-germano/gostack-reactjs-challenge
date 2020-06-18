import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
    const [repositories, setRepositories] = useState([]);
    useEffect(() => {
        handleGetRepositories();
    }, []);

    function handleGetRepositories() {
        api.get('repositories')
        .then((response) => {
            setRepositories(response.data);
        })
        .catch((error) => console.log(error));
    }

    async function handleAddRepository() {
        try {
            const response = await api.post('repositories', {
                title: `ReactJS ${Date.now()}`,
                url: "https://github.com/jader-germano/study-reactjs",
                techs: ["React.js", "React"]
            });
            const repository = response.data;
            setRepositories([...repositories, repository]);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleRemoveRepository(id) {
        const filteredRepositories = repositories.filter(repository => repository.id !== id);

        await api.delete(`repositories/${id}`)
        .then((response) => {
            if (response.status === 204) {
                setRepositories(filteredRepositories);
            }
        })
        .catch((error) => console.log(error));
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
