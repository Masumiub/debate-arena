'use client';

import { SessionProvider } from 'next-auth/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ClientLayout({ children }) {
  return (
    <SessionProvider>
      <Navbar />
      {children}
      <div className='w-full md:w-10/12 mx-auto'>
        <Footer></Footer>
      </div>

    </SessionProvider>
  );
}
