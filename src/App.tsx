import { useEffect, useState } from 'react';
import { BASE_URL } from './config';

import './tailwind.css';
import Card from './components/Card';

const App = () => {
  interface Pokemon {
    id: number;
    name: string;
    sprites: {
      front_default: string;
    };
    types: {
      type: {
        name: string;
      };
    }[];
  }

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const fetchAllPokemon = async () => {
    const res = await fetch(`${BASE_URL}?limit=50`);
    const data = await res.json();
    // console.log(data);
    const pokemonObject = data.results.map(async (pokemon: Pokemon) => {
      const res = await fetch(`${BASE_URL}${pokemon.name}`);
      return await res.json();
    });

    const allPokemonData = await Promise.all(pokemonObject);
    setPokemons(allPokemonData);
    // console.log('pokemons:', allPokemonData);
  };

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  return (
    <main className='h-screen'>
      <section className='grid md:grid-cols-3 gap-4 p-8'>
        {pokemons.map((pokemon) => {
          return (
            <Card
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.front_default}
              types={pokemon.types}
            />
          );
        })}
      </section>
    </main>
  );
};

export default App;
