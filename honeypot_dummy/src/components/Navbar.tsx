'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className=' bg-black py-2 border-b border-s-black fixed w-full z-10 top-0 px-8'>
      <div className='container flex items-center justify-between'>
        <Link href='/home'>
          Home
        </Link>
        <button
         onClick={() => signOut({ callbackUrl: '/' })}
         className="p-2 bg-red-700 rounded"
         >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;