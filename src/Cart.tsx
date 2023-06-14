import { Pokemon } from './Pokemon-Interface';

interface CartProps {
    cart: Pokemon[];
    handleRemove: (poke: Pokemon)=>void;
}
  
  
export default function Cart({cart, handleRemove}: CartProps) {
    return (
      <>
       <h2>Cart:</h2>
       {cart.map(poke =>
          <ul key={poke.id}>
             <li>{poke.name}</li>
             <button onClick={() => handleRemove(poke)}>remove</button>
          </ul>
        )}
      </>
     )
}