"use client"

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/');
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return null; 
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
