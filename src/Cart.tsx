import { Pokemon } from './Pokemon-Interface';

interface CartProps {
    cart: Pokemon[];
    handleRemove: (poke: Pokemon)=>void;
}
  
  
export default function Cart({cart, handleRemove}: CartProps) {
    return (
      <div className='cart'>
       <h2 className="heading">Team:</h2>
       {cart.map(poke =>
          <div key={poke.id}>
            <div className='siblings'>
             <button className="removeButton" onClick={() => handleRemove(poke)}>X</button>
             <p className='selectedName'>{poke.name}</p>
            </div>
          </div>
        )}
      </div>
     )
}