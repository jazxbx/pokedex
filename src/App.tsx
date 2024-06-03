import { useEffect, useState } from 'react';
import './tailwind.css';

function App() {
  // Fetch pokemon data\

  interface Pokemon {
    id: number;
    name: string;
    sprites: {
      front_default: string;
    };
  }

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  console.log(pokemonList);

  async function fetchPokemon(): Promise<void> {
    try {
      const res = await fetch('https://pokeapi.co/api/v2/ability/?limit=30');
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      console.log(data);
      setPokemonList(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <main className='bg-slate-100 h-screen overflow-hidden m-auto p-8'>
      <section className='grid md:grid-cols-3 gap-4 py-8'></section>
    </main>
  );
}

export default App;
