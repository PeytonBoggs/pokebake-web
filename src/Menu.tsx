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
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151")
      .then(response => response.json())
      .then(data => {
        let tempList: Array<Pokemon> = [];
        data.results.forEach((result: any) => {
          let splitUrl: Array<String> = result.url.split("/");
          let tempId: string = (("00" + splitUrl[6]).substring(+(splitUrl[6].length - 1)));
          let tempPoke: Pokemon = {name: result.name, id: tempId};
          tempList.push(tempPoke);
        })
        setPokemon(tempList);
      });
  };

  return (
    <div>
        <h2 className='heading'>Menu:</h2>
        {pokemonList.map(poke => (
          <div key={poke.id}>
          <button className="addButton" onClick={() => handleAdd(poke)}>{poke.name} - #{poke.id}</button>
          <br></br>
          </div>
        ))}
    </div>
  );
}