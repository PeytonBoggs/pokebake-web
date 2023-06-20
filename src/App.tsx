import { useState } from 'react';
import AppHeader from './Title';
import Menu from './Menu';
import Cart from './Cart';
import Bake from './Bake';
import { Pokemon } from './Pokemon-Interface';

function App() {
  const [cart, setCart] = useState<Pokemon[]>([]);

  function handleAdd(poke: Pokemon) {
    if (cart.includes(poke)) {
      handleRemove(poke)
      return;
    }
    
    if (cart.length >= 6) {
      return;
    }

    let tempCart: Pokemon[] = [...cart];

    tempCart.push(poke);
    setCart(tempCart);

    poke.clicked = true;
  }

  function handleRemove(poke: Pokemon) {
    let tempCart: Pokemon[] = [...cart]; 
    tempCart.splice(tempCart.indexOf(poke), 1);
    setCart(tempCart);

    poke.clicked = false;
  }

  function clearCart() {
    cart.forEach(poke => {
      poke.clicked = false
    });

    setCart([]);
  }

  return (
      <div className='App'>
        <AppHeader />
        <Menu handleAdd={handleAdd}/>
        <button className="clearButton" onClick={clearCart}>Clear Team</button>
        <Cart cart={cart} handleRemove={handleRemove}/>
        <Bake ingredients={cart}/>
      </div>
  )
}

export default App;