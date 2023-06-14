import { useState } from 'react';
import AppHeader from './Title';
import Menu, { Pokemon } from './Menu';

function App() {
  const [cart, setCart] = useState<Pokemon[]>([]);

  function addPokemonToCart(name: string,  id: number) {
    if (cart.length >= 6) {
      return;
    }
    let tempCart: Pokemon[] = [...cart];
    tempCart.push({name, id});
    setCart(tempCart);
  }

  function handleRemove(poke: Pokemon) {
    let tempCart: Pokemon[] = [...cart]; 
    tempCart.splice(tempCart.indexOf(poke), 1);
    setCart(tempCart);
  }

  return (
      <>
        <AppHeader />
        <h2>Menu:</h2>
        <Menu addPokemonToCart={addPokemonToCart}/>
        <h2>Cart:</h2>
        {cart.map(poke =>
        <> 
          <ul>
            <li>{poke.name}</li>
            <button onClick={() => handleRemove(poke)}>remove</button>
          </ul>
        </>
        )}
      </>
  )
}

export default App;