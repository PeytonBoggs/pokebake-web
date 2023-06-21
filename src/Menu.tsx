import React, { ChangeEvent, useEffect, useState } from 'react';
import { Pokemon } from './Pokemon-Interface';

interface MenuProps {
  handleAdd: (Pokemon: Pokemon)=>void;
}

export default function Menu({handleAdd}:MenuProps) {
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [input, setInput] = useState<string>("");
  const [fullList, setFullList] = useState<Pokemon[]>([]);

  const [generation, setGeneration] = useState<string>("1")
  const [offset, setOffset] = useState<string>("0");
  const [limit, setLimit] = useState<string>("151");
  
  const handleGenChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let newGen = e.target.value;
    setGeneration(newGen);
  }

  useEffect(() => {
    switch (generation) {
      case "1":
        setOffset("0");
        setLimit("151");
        break;
      case "2":
        setOffset("151");
        setLimit("100");
        break;
      case "3":
        setOffset("251");
        setLimit("135");
        break;
      case "4":
        setOffset("386");
        setLimit("108");
        break;
      case "5":
        setOffset("494");
        setLimit("155");
        break;
      case "6":
        setOffset("649");
        setLimit("72");
        break;
      case "7":
        setOffset("721");
        setLimit("88");
        break;
      case "8":
        setOffset("809");
        setLimit("96");
        break;
      case "9":
        setOffset("905");
        setLimit("105");
        break;
    }

    fetch("https://pokeapi.co/api/v2/pokemon/?offset=" + offset + "&limit=" + limit)
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
              let tempId: string = (("000" + secondResult.id).slice(-4));
              let tempTypes: string[] = secondResult.types.map((type: any) => type.type.name);
              let tempSprite: string = secondResult.sprites.front_default;
              let tempPoke: Pokemon = {name: tempName, id: tempId, types: tempTypes, sprite: tempSprite, clicked: false};
              tempList.push(tempPoke);
            })
            setSearchResults(tempList);
            setFullList(tempList);
          })
        });
  }, [generation, limit, offset]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    let tempInput = e.target.value;
    setInput(tempInput);

    let tempList = fullList.filter((poke) => 
      poke.name.includes(tempInput)
    );
    
    setSearchResults(tempList);
  }

  function getInterface(poke: Pokemon) {
    if (poke.clicked) {
      return 'pokeInterfaceClicked';
    } else {
      return 'pokeInterface';
    }
  }

  return (
    <div>
      <div className='menuTitleBar'>
        <h2 className='menuTitle'>Menu</h2>
        <form className='genForm'>
          Generation:
          <select className="genSelect" onChange={handleGenChange}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
          </select>
        </form>
        <label className='search'>Search:</label>
        <input className='searchBar' type="text" onChange={handleSearchChange} value={input}></input>
      </div>
      <div className='menu'>
       {searchResults.map(poke => (
           <div className={getInterface(poke)} onClick={() => handleAdd(poke)} key={poke.id}>
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