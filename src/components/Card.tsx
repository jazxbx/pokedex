function Card(id: number, name: string) {
  return (
    <div className='rounded-2xl border-2 border-slate-950 p-8 mb-4 flex flex-col justify-center items-center cursor-pointer'>
      <div className='w-full flex justify-center'>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={name}
        />
      </div>
      <p className=''>{id}</p>
      <div>{name}</div>
      {/* <div>grass etc</div> */}
    </div>
  );
}

export default Card;
