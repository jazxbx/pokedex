function Header({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) {
  return (
    <div className='bg-red-600 text-zinc-100 text-2xl content-center p-3 font-semibold flex justify-between  md:p-7 md:text-3xl'>
      <div className='max-sm:hidden'>{text}</div>
      <div>{children}</div>
    </div>
  );
}

export default Header;
