import React, { useContext } from 'react';
import FavoriteContext from '../contexts/favoritesContext';

const Pokemon = (props) => {

    const {favoritePokemons, updateFavoritePokemon} = useContext(FavoriteContext);

    const { pokemon } = props;

    const redHeart = "❤️";
    const blackHeart = "🖤";
    const heart = favoritePokemons.includes(pokemon.name) ? redHeart : blackHeart;

    const clickHeart = (e) => {
        e.preventDefault();
        updateFavoritePokemon(pokemon.name)
    };

    return (
        <div className="pokemon-card">
            <div className="pokemon-img-container">
                <img 
                    className="pokemon-img" 
                    src={pokemon.sprites.front_default} 
                    alt={pokemon.name}
                />
            </div>
            <div className="pokemon-card-body">
                <div className="pokemon-card-top">
                    <h3>{pokemon.name}</h3>
                    <div>#{pokemon.id}</div>
                </div>
                <div className="pokemon-card-bottom">
                    <div className="pokemon-card-type">
                        {pokemon.types.map((type, i) => {
                            return (
                                <div className="pokemon-card-type-text" key={i}>{type.type.name}</div>
                            )
                        })}
                    </div>
                    <div className="pokemon-card-favorite">
                        <button onClick={clickHeart}>
                            {heart}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pokemon;
