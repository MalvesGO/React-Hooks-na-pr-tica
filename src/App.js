import React, { useState, useEffect } from 'react';

export default function App(){

  const [respositories, setRepositories] = useState([ ])

  useEffect( async () => {
    const response = await fetch('https://api.github.com/users/malvesgo/repos');
    const data = await response.json();
    setRepositories(data)
  }, []);

  useEffect(() => {
    const filtered = respositories.filter(repo => repo.favorite)

    document.title = `Voce tem ${filtered.length} favoritos`
  }, [respositories]);

  function handleFavorite(id){
    const newRepositories = respositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite} : repo
    })
    setRepositories(newRepositories)
  }

  return (
    <ul>
      { respositories.map(repo => (
        <li key={repo.id}>
          {repo.name}
          {repo.favorite && <span>(Favorito)</span>}
          <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
        </li>
      )) }
    </ul>
  )

}
