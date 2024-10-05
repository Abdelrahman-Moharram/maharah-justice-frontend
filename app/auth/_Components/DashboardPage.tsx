import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');

    if (!token) {
      // Redirect user to login if not authenticated
      router.push('/login');
    }
  }, [router]);

  return <div>Protected Content</div>;
}
