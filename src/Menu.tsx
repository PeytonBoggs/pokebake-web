import React, {useEffect, useState} from 'react';

interface Pokemon {
  name: string;
}

export default function Menu() {
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
        {pokemon.map(poke => (
          <>
          <button>{poke.name}</button>
          <br></br>
          <br></br>
          </>
        ))}
    </div>
  )
}
