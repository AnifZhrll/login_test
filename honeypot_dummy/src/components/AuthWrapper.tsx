'use client';

import { SessionProvider } from 'next-auth/react';
import Navbar from './Navbar';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <main className="h-screen flex flex-col justify-center items-center">
        <Navbar />
        {children}
      </main>
    </SessionProvider>
  );
}
