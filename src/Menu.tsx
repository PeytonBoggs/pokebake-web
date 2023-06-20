import React, { ChangeEvent, useEffect, useState } from 'react';
import { Pokemon } from './Pokemon-Interface';

interface MenuProps {
  handleAdd: (Pokemon: Pokemon)=>void;
}

export default function Menu({handleAdd}:MenuProps) {
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [input, setInput] = useState<string>("");
  const [fullList, setFullList] = useState<Pokemon[]>([]);
  
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
              let tempTypes: string[] = secondResult.types.map((type: any) => type.type.name);
              let tempSprite: string = secondResult.sprites.front_default;
              let tempPoke: Pokemon = {name: tempName, id: tempId, types: tempTypes, sprite: tempSprite};
              tempList.push(tempPoke);
            })
            setSearchResults(tempList);
            setFullList(tempList);
          })
        });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let tempInput = e.target.value;
    setInput(tempInput);

    let tempList = fullList.filter((poke) => 
      poke.name.includes(tempInput)
    );
    
    setSearchResults(tempList);
  }

  return (
    <div className='menu'>
      <div className='menuTitleBar'>
        <h2 className='menuTitle'>Menu</h2>
        <label className='search'>Search:</label>
        <input className='searchBar' type="text" onChange={handleChange} value={input}></input>
      </div>
      <div className='menu'>
       {searchResults.map(poke => (
           <div className="pokeInterface" onClick={() => handleAdd(poke)} key={poke.id}>
            <div className='lineOne'>
              <p className='number'>#{poke.id}</p>
              <img className="ball" src={poke.sprite} alt={poke.name}></img>
            </div>
            <p className='types'>type: {poke.types.join(", ")}</p>
            <p className="addButton">{poke.name}</p>
            <br></br>
           </div>
       ))}
      </div>
    </div>
  );
}