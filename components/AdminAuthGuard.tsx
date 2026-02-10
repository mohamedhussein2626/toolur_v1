"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAuth } from '@/lib/auth';

interface AdminAuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function AdminAuthGuard({ children, redirectTo = '/admin/login' }: AdminAuthGuardProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const authenticated = adminAuth.isAuthenticated();
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

