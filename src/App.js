import React from "react";
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import Searchbar from './components/Searchbar';
import { getPokemonData, getPokemons } from "./api.js";
import "./styles.css";
import { FavoriteProvider } from "./contexts/favoritesContext";

const { useState, useEffect } = React;

function App() {

  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState([]);

  const fetchPokemons = async () => {
    setLoading(true);
    try {
      const data = await getPokemons(12, 12 * page);
      //console.log(data.results);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const result = await Promise.all(promises);
      setPokemons(result);
      setLoading(false);
      setTotal(Math.ceil(data.count / 12))
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchPokemons();
  }, [page]);

  const updateFavoritePokemon = (name) => {
    const updated = [...favorite];
    const isFavorite = favorite.indexOf(name);
    if(isFavorite >= 0){
      updated.splice(isFavorite, 1);
    }else{
      updated.push(name)
    };
    setFavorite(updated);
  };

  return (
    <FavoriteProvider value={{
      favoritePokemons: favorite, 
      updateFavoritePokemon : updateFavoritePokemon,
    }}>
      <div>
          <Navbar />
          <div className="App">
            <Searchbar /> 
            <Pokedex 
            loading={loading}
            pokemons={pokemons} 
            page={page}
            setPage={setPage}
            total={total}
            />
          </div>
      </div>
    </FavoriteProvider>
  );
}

export default App;
