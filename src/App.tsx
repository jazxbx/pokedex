import { useEffect, useState } from 'react';
import { BASE_URL } from './config';

import './tailwind.css';
import Card from './components/Card';
import Modal from './components/Modal';
import PokemonInfo from './components/PokemonInfo';
import Header from './common/Header';
import Search from './components/Search';
import Error from './common/Error';

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
    stats: {
      base_stat: number;
      stat: {
        name: string;
      };
    }[];
  }

  const backgrounds: { [key: string]: string } = {
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    grass: 'bg-green-500',
    electric: 'bg-yellow-500',
    psychic: 'bg-fuchsia-500',
    dark: 'bg-black',
    normal: 'bg-gray-400',
    fighting: 'bg-orange-500',
    flying: 'bg-blue-800',
    poison: 'bg-purple-800',
    ground: 'bg-yellow-800',
    rock: 'bg-gray-800',
    bug: 'bg-green-800',
    ghost: 'bg-indigo-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
    dragon: 'bg-indigo-500',
  };
  // state get pokemon query
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState<string>('');
  //modal states
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchAllPokemon = async () => {
    const res = await fetch(`${BASE_URL}?limit=150`);
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

  function handleCardClick(pokemon: Pokemon) {
    setSelectedPokemon(pokemon);
    setOpenModal(true);
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const searchQuery = event.target.value.toLowerCase();
    setSearch(searchQuery);
  }

  const filteredPokemon = pokemons.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(search);
  });

  return (
    <main className='h-screen'>
      <Header text='Pokemon'>
        <Search placeholder='Search Pokemon...' onChange={handleSearch} />
      </Header>
      {filteredPokemon.length ? (
        <section className='grid md:grid-cols-3 gap-4 p-8'>
          {filteredPokemon.map((pokemon) => {
            return (
              <Card
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.sprites.front_default}
                types={pokemon.types}
                backgrounds={backgrounds}
                onClick={() => handleCardClick(pokemon)}
              />
            );
          })}
        </section>
      ) : (
        <Error />
      )}
      <Modal open={openModal} setOpen={setOpenModal}>
        {selectedPokemon && (
          <PokemonInfo
            id={selectedPokemon.id}
            name={selectedPokemon.name}
            img={selectedPokemon.sprites.front_default}
            types={selectedPokemon.types}
            stats={selectedPokemon.stats}
            backgrounds={backgrounds}
          />
        )}
      </Modal>
    </main>
  );
};

export default App;
