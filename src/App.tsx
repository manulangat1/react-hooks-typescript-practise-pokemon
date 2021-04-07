import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { RootStore } from './store';
import { GetPokemon} from './actions/pokemonActions';
function App() {
  const [ pokemonName,setPokemonName] = useState("")
  const pokemonState = useSelector((state:RootStore) => state.pokemon)
  console.log(pokemonState)
  const dispatch = useDispatch()
  const handleChange = ( event:React.ChangeEvent<HTMLInputElement> ) => setPokemonName(event.target.value)
  const handleSubmit = () => {
    dispatch(GetPokemon(pokemonName))
  }
  useEffect(() => {
    dispatch(GetPokemon("ditto"))
  }, [dispatch]);
  // const pokemonState = dispatch(GetPokemon("ditto"))
  return (
    <div className="App">
      <input type="text" onChange={handleChange} />
      <button onClick={handleSubmit}>Search</button>

      {
        pokemonState.pokemon && (
          <div>
            <img src={pokemonState.pokemon.sprites.frontDefault} alt=""/>
            { pokemonState.pokemon.abilities.map( ability => (
              <div>
                <p>{ability.ability.name}</p>
              </div>
            )) }
          </div>
        )
      }
    </div>
  );
}

export default App;
