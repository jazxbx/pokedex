interface PokemonInfoProps {
  id: number;
  name: string;
  img: string;
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
  backgrounds: { [key: string]: string };
}

export default function PokemonInfo({
  id,
  name,
  img,
  types,
  stats,
  backgrounds,
}: PokemonInfoProps) {
  const formattedId = id.toString().padStart(3, '0');

  return (
    <div className='cursor-default'>
      <div className='flex items-center'>
        <img src={img} alt='' />
        <div className='ml-2'>
          <p className='text-xs text-gray-500 font-medium'>#{formattedId}</p>
          <h1 className='capitalize text-xl font-extrabold'>{name}</h1>
          <div className='flex mt-2 gap-2'>
            {types.map((type) => {
              return (
                <div
                  key={type.type.name}
                  className={`${
                    backgrounds[type.type.name] || backgrounds.normal
                  } text-white rounded-full px-3 py-1 mt-2 text-sm`}
                >
                  {type.type.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className='mt-2 mb-4 px-4'>
        <p className='font-bold mb-2'>Base Stats</p>
        {stats.map((stat) => (
          <div className='flex items-center my-2' key={stat.stat.name}>
            <p className='w-1/5 md:w-2/6 font-medium text-xs'>
              {stat.stat.name}
            </p>
            <div className='w-4/5 md:4/6'>
              <progress
                className='[&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg   [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-blue-500 [&::-moz-progress-bar]:bg-blue-500'
                value={stat.base_stat}
                max='100'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
