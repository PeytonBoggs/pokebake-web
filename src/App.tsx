import AppHeader from './Title';
import Menu from './Menu';

function App() {

  function addPokemonToCart(name: string) {
    console.log(name);
  }

  return (
      <>
        <AppHeader />
        <Menu addPokemonToCart={addPokemonToCart}/>
      </>
  )
}

export default App;