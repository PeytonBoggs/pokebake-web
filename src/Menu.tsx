import React, { ChangeEvent, useEffect, useState } from 'react';
import { Pokemon } from './Pokemon-Interface';

interface MenuProps {
  handleAdd: (Pokemon: Pokemon)=>void;
}

export default function Menu({handleAdd}:MenuProps) {
  const [pokemonList, setPokemon] = useState<Pokemon[]>([]);
  const [input, setInput] = useState<string>("");
  const [fullList, setFullList] = useState<Pokemon[]>([]);
  
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
        setFullList(firstTenPokemon);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let tempInput = e.target.value;
    setInput(tempInput);

    let tempList = fullList.filter((poke) => 
      poke.name.includes(tempInput)
    );
    
    setPokemon(tempList);
  }


  return (
    <div>
        <h2 className='heading'>Menu:</h2>
        <label>Search:</label>
        <input type="text" onChange={handleChange} value={input}></input>
        {pokemonList.map(poke => (
          <div key={poke.id}>
          <button className="addButton" onClick={() => handleAdd(poke)}>{poke.name}</button>
          <br></br>
          </div>
        ))}
    </div>
  );
}