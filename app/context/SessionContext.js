"use client";

import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SessionContext = createContext();

export function useSession() {
  return useContext(SessionContext);
}

export function SessionProvider({ children }) {
  const [sessionId, setSessionId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedSessionId = localStorage.getItem('sessionId');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    }
  }, []);

  useEffect(() => {
    if (sessionId) {
      localStorage.setItem('sessionId', sessionId);
    } else {
      localStorage.removeItem('sessionId');
    }

    if (!sessionId && router.pathname !== '/') {
      router.push('/');
    }
  }, [sessionId, router]);

  const logout = () => {
    setSessionId(null); // Clear the session ID from context
    localStorage.removeItem('sessionId'); // Remove the session ID from local storage
    router.push('/'); // Redirect to the upload page
  };

  return (
    <SessionContext.Provider value={{ sessionId, setSessionId, logout }}>
      {children}
    </SessionContext.Provider>
  );
}
 