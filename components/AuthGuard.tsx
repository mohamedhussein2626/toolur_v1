"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { userAuth } from '@/lib/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function AuthGuard({ children, redirectTo = '/login' }: AuthGuardProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const authenticated = userAuth.isAuthenticated();
    setIsAuthenticated(authenticated);
    
    if (!authenticated) {
      router.push(redirectTo);
    }
  }, [router, redirectTo]);

  // During SSR or before mount, show nothing to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  // If not authenticated, show nothing (redirect will happen)
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

