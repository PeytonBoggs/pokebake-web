import { Pokemon } from './Pokemon-Interface';

interface CartProps {
    cart: Pokemon[];
    handleRemove: (poke: Pokemon)=>void;
}
  
  
export default function Cart({cart, handleRemove}: CartProps) {
  return (
    <div>
      <h2 className="heading">Team:</h2>
      <div className='menu'>
        {cart.map(poke =>
        <div className="pokeInterface" key={poke.id}>
          <div className='lineOne'>
            <p className='number'>#{poke.id}</p>
            <img className="ball" src={poke.sprite} alt={poke.name}></img>
          </div>
          <p className='types'>type: {poke.types.join(", ")}</p>
          <button className="removeButton" onClick={() => handleRemove(poke)}>{poke.name}</button>
          <br></br>
         </div>
        )}
      </div>
    </div>
  )
}