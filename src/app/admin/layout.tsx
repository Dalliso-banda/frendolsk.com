import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import AdminLayoutClient from './AdminLayoutClient';

export const metadata = {
  title: 'Admin Dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </SessionProvider>
  );
}
