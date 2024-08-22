"use client"
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
    try {
      const storedSessionId = localStorage.getItem('sessionId');
      if (storedSessionId) {
        setSessionId(storedSessionId);
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
  }, []);
  

  useEffect(() => {
    try {
      if (sessionId) {
        localStorage.setItem('sessionId', sessionId);
      } else {
        localStorage.removeItem('sessionId');
      }
  
      // if (!sessionId && router.pathname !== '/') {
      //   router.push('/');
      // }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
    
  }, [sessionId, router]);

  const logout = () => {
    setSessionId(null);
    localStorage.removeItem('sessionId');
    router.push('/');
  };

  return (
    <SessionContext.Provider value={{ sessionId, setSessionId, logout }}>
      {children}
    </SessionContext.Provider>
  );
}
