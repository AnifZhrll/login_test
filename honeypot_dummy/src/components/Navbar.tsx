import Link from 'next/link';

const Navbar = () => {
  return (
    <div className=' bg-black py-2 border-b border-s-black fixed w-full z-10 top-0 px-8'>
      <div className='container flex items-center justify-between'>
        <Link href='/home'>
          Home
        </Link>
        <Link className="p-2 bg-red-700" href='/'>
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default Navbar