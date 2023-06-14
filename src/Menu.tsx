import React, {useEffect, useState} from 'react';

export interface Pokemon {
  name: string;
  id: number;
}

interface menuProps {
  addPokemonToCart: (name: string, id:number)=>void;
}

export default function Menu({addPokemonToCart}:menuProps) {
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
          <>
          <button onClick={() => addPokemonToCart(poke.name, poke.id)}>{poke.name}</button>
          <br></br>
          <br></br>
          </>
        ))}
    </div>
  );
}