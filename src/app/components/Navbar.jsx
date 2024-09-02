import Link from 'next/link';
import React from 'react';

function Navbar() {
  return (
    <nav className='bg-[#333] text-white p-5'>
      <div className='container mx-auto'>
        <div className='flex justify-between items-center'>
            <div>
                <Link href="/">testNextAuyh</Link>
            </div>
            <ul className='flex'>
                <li className='mx-3'><Link href="/login">Sing In</Link></li>
                <li className='mx-3'><Link href="/register">Sing Up</Link></li>
                <li className='mx-3'><Link href="/profile">Profile</Link></li>
                <li className='mx-3'><Link href="/products">Products</Link></li>
            </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
