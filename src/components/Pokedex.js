import React from 'react';
import Pagination from './Pagination';
import Pokemon from './Pokemon';

const Pokedex = (props) => {
    // console.log(props);

    const { pokemons, page, setPage, total, loading } = props;

    const lastPage = () => {
        const nextPage = Math.max(page - 1, 0);
        setPage(nextPage);
    };

    const nextPage = () => {
        const nextPage = Math.min(page + 1, total);
        setPage(nextPage);
    };

    return (
        <div>
            <div className="header">
                <h1>Pokedex</h1>
                <div>
                    <Pagination 
                        page={page + 1}
                        totalPages={total}
                        onLeftClick={lastPage}
                        onRightClick={nextPage}
                    />
                </div>
            </div>
            { loading ?
            <div>Cargando Pokemones...</div> 
            : 
            <div className="pokedex-grid">
                {pokemons.map((pokemon, i) => {
                    return (
                        <Pokemon pokemon={pokemon} key={i} />
                    )
                })}
            </div>
            }
        </div>
    );
}

export default Pokedex;
