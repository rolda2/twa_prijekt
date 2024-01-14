'use client'

import Link from 'next/link';
import React from 'react';

interface NavbarProps {
    currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage }) => {
    const isAdminPage = currentPage === '/admin';
    const isMainPage = currentPage === '/';

    return (
        <nav className='bg-[#330033] p-4 shadow-3xl'>
            <div className='container mx-auto flex justify-between items-center'>
                <Link href='/' passHref>
                    <div className='cursor-pointer text-white text-4xl'>Potions inc.</div>
                </Link>
                {isAdminPage && (
                    <>
                        <Link href='/addUser' passHref>
                            <div className='cursor-pointer text-white'>Add User</div>
                        </Link>
                        <Link href='/' passHref>
                            <div className='cursor-pointer text-white'>Logout</div>
                        </Link>
                    </>
                )}
                <Link href='/login' passHref>
                <div className='cursor-pointer text-white'>Login</div>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;