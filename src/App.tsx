import { useState } from 'react';
import AppHeader from './Title';
import Menu from './Menu';
import Cart from './Cart';
import { Pokemon } from './Pokemon-Interface';

function App() {
  const [cart, setCart] = useState<Pokemon[]>([]);

  function handleAdd(poke: Pokemon) {
    if (cart.length >= 6 || cart.includes(poke)) {
      return;
    }

    let tempCart: Pokemon[] = [...cart];

    tempCart.push(poke);
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
        <Menu handleAdd={handleAdd}/>
        <Cart cart={cart} handleRemove={handleRemove}/>
      </>
  )
}

export default App;