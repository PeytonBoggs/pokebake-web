import { useState } from 'react';
import AppHeader from './Title';
import Menu from './Menu';
import Cart from './Cart';
import Bake from './Bake';
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

  function clearCart() {
    setCart([]);
  }

  return (
      <div className='App'>
        <AppHeader />
        <button className="clearButton" onClick={clearCart}>Clear Team</button>
        <div className="siblings">
          <Menu handleAdd={handleAdd}/>
          <Cart cart={cart} handleRemove={handleRemove}/>
        </div>
        <Bake ingredients={cart}/>
      </div>
  )
}

export default App;