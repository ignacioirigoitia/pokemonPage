import React from 'react';
import Pagination from './Pagination';
import Pokemon from './Pokemon';

const Pokedex = (props) => {
    // console.log(props);

    const svgLoader = <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <line x1="12" y1="2" x2="12" y2="6" />
            <line x1="12" y1="18" x2="12" y2="22" />
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
            <line x1="2" y1="12" x2="6" y2="12" />
            <line x1="18" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </svg>;

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
            <div className="loader">Cargando Pokemones...  {svgLoader}</div> 
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
