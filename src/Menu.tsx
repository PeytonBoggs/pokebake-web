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
        const fetchPromises = data.results.map((result: any) => {
          return fetch(result.url)
            .then(secondResponse => secondResponse.json());
        })

        Promise.all(fetchPromises)
          .then(secondData => {
            let tempList: Array<Pokemon> = [];
            secondData.forEach((secondResult: any) => {
              let tempName: string = secondResult.name;
              let tempId: string = (("00" + secondResult.id).slice(-3));
              let tempTypes: string[] = secondResult.types.map((type: any) => type.type.name)
              console.log(tempTypes);
              let tempPoke: Pokemon = {name: tempName, id: tempId, types: tempTypes}
              tempList.push(tempPoke);
            })
            setPokemon(tempList);
          })
        });
  };

  return (
    <div className='menu'>
        <h2 className='heading'>Menu:</h2>
        {pokemonList.map(poke => (
          <div className="pokeInterface" key={poke.id}>
            <p>#{poke.id}</p>
            <button className="addButton" onClick={() => handleAdd(poke)}>{poke.name}</button>
            <p>type: {poke.types.join(", ")}</p>
            <br></br>
          </div>
        ))}
    </div>
  );
}