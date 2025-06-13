import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import AuthWrapper from '@/components/AuthWrapper';

const inter = Inter({ subsets: ['latin'] });

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthWrapper>
          {children}
        </AuthWrapper>
      </body>
    </html>
  );
}
