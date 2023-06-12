import React, {useEffect, useState} from 'react';

interface Pokemon {
  name: string;
}

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then(response => response.json())
      .then(data => {
        const firstTenPokemon = data.results.slice(0, 10);
        setPokemon(firstTenPokemon);
      });
  };

  return (
      <div>
        <h1>PokeBake</h1>
        <div>
        {pokemon.map(poke => (
          <>
          <button>{poke.name}</button>
          <br></br>
          <br></br>
          </>
        ))}
        </div>
      </div>
  )
}

export default App;