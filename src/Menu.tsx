import React, { useEffect, useState } from 'react';
import { Pokemon } from './Pokemon-Interface';

interface MenuProps {
  handleAdd: (Pokemon: Pokemon)=>void;
}

export default function Menu({handleAdd}:MenuProps) {
  const [pokemonList, setPokemon] = useState<Pokemon[]>([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then(response => response.json())
      .then(data => {
        let firstTenPokemon: Array<Pokemon> = [];
        for (let i = 0; i < 10; i++) {
          let splitUrl: Array<string> = data.results[i].url.split("/");
          let tempId: number = +splitUrl[6];
          let tempPoke: Pokemon = {name: data.results[i].name, id: tempId};
          firstTenPokemon.push(tempPoke);
        }
        setPokemon(firstTenPokemon);
      });
  };

  return (
    <div>
        {pokemonList.map(poke => (
          <div key={poke.id}>
          <button onClick={() => handleAdd(poke)}>{poke.name}</button>
          <br></br>
          <br></br>
          </div>
        ))}
    </div>
  );
}