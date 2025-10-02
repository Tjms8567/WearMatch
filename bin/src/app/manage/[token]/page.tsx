'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ManageTokenPage({ params }: { params: { token: string } }) {
  const router = useRouter();

  useEffect(() => {
    const token = params.token;
    const expected = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    if (token && expected && token === expected) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('wearmatch_admin_ok', '1');
      }
      router.replace('/admin');
    } else {
      router.replace('/');
    }
  }, [params.token, router]);

  return null;
}
