import React from 'react';
import { searchPokemon } from "../api.js";
const { useState } = React;


const Searchbar = () => {
    const [search, setSearch] = useState("");
    const [pokemon, setPokemon] = useState();

    const onChange = (e) => {
        // console.log(e.target.value);
        setSearch(e.target.value);
    };

    const onClick = async (e) => {
        const data =  await searchPokemon(search);
        // console.log(data);
        setPokemon(data);
    };

    return (
        <div className="searchbar-container">
            <div className="searchbar">
                <input 
                    placeholder="Buscar Pokemon..."
                    onChange={onChange}
                />
            </div>
            <div className="searchbar-btn">
                <button onClick={onClick}>Buscar</button>
            </div>
            {/* <div>
                {pokemon && (
                <div>
                    <div>Nombre: {pokemon.name}</div>
                    <div>Peso: {pokemon.weight}</div>
                    <img src={pokemon.sprites.front_default} alt={`imagen de ${pokemon.name}`} />
                </div>
                )}
            </div> */}
        </div>
    );
}

export default Searchbar;
