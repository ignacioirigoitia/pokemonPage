import React from "react";
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import Searchbar from './components/Searchbar';
import { getPokemonData, getPokemons, searchPokemon } from "./api.js";
import "./styles.css";
import { FavoriteProvider } from "./contexts/favoritesContext";

const { useState, useEffect } = React;

const localStorageKey = "favorite_pokemon";

function App() {

  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false);

  const fetchPokemons = async () => {
    setLoading(true);
    try {
      const data = await getPokemons(24, 24 * page);
      //console.log(data.results);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const result = await Promise.all(promises);
      setPokemons(result);
      setLoading(false);
      setTotal(Math.ceil(data.count / 24));
      setNotFound(false);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if(!searching){
      fetchPokemons();
    };
  }, [page]);

  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    setFavorite(pokemons);
  };

  useEffect(() => {
    loadFavoritePokemons();
  }, []);

  const updateFavoritePokemon = (name) => {
    const updated = [...favorite];
    const isFavorite = favorite.indexOf(name);
    if(isFavorite >= 0){
      updated.splice(isFavorite, 1);
    }else{
      updated.push(name)
    };
    setFavorite(updated);
    window.localStorage.setItem(localStorageKey, JSON.stringify(updated));
  };

  const onSearch = async (pokemon) => {
    if(!pokemon){
      return fetchPokemons();
    }
    setLoading(true);
    setNotFound(false);
    setSearching(true);
    const result = await searchPokemon(pokemon);
    if(!result){
      setNotFound(true);
      setLoading(false);
      return;
    }else{
      setPokemons([result]);
      setPage(0);
      setTotal(1);
    };
    setLoading(false); 
    setSearching(false);
  };

  return (
    <FavoriteProvider value={{
      favoritePokemons: favorite, 
      updateFavoritePokemon : updateFavoritePokemon,
    }}>
      <div>
          <Navbar />
          <div className="App">
            <Searchbar onSearch={onSearch} />
            {notFound ? (
              <div className="loader">No se encontro el Pokemon que buscabas...</div>
              ) : (
                <Pokedex 
                  loading={loading}
                  pokemons={pokemons} 
                  page={page}
                  setPage={setPage}
                  total={total}
                />
              )}
          </div>
      </div>
    </FavoriteProvider>
  );
}

export default App;
