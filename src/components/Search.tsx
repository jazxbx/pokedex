type SearchProps = {
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function Search({ placeholder, onChange }: SearchProps) {
  return (
    <div className='rounded-lg text-lg py-2 px-3 bg-white'>
      <input
        className=' text-zinc-950 focus:outline-none'
        type='search'
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default Search;
