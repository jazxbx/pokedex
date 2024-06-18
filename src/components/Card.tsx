interface CardProps {
  id: number;
  name: string;
  image: string;
  types: {
    type: {
      name: string;
    };
  }[];
  onClick: () => void;
  backgrounds: { [key: string]: string };
}

function Card({ id, name, image, types, onClick, backgrounds }: CardProps) {
  const formattedId = id.toString().padStart(3, '0');

  return (
    <div
      className='rounded-2xl border-2 border-b-8 border-slate-950 p-8 mb-4 flex flex-col justify-center items-center cursor-pointer'
      onClick={onClick}
    >
      <div className='w-full flex justify-center relative'>
        <p className='absolute text-8xl opacity-40 text-gray-400 font-extrabold -z-10'>
          #{formattedId}
        </p>
        <img src={image} alt={name} />
      </div>

      <div className='font-semibold capitalize text-xl'>{name}</div>
      <div className='flex gap-4'>
        {types.map((type) => {
          return (
            <div
              key={type.type.name}
              className={`${
                backgrounds[type.type.name] || backgrounds.normal
              } text-white rounded-full px-4 py-1 mt-2`}
            >
              {type.type.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Card;
