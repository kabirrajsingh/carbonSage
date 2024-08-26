"use client";

import FileUpload from './components/FileUpload';
import { useSession } from './context/SessionContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
export default function Home() {
  const router = useRouter();
  const { sessionId } = useSession();

  // useEffect(() => {
  //   if (sessionId && router.pathname === '/') {
  //     router.push('/dashboard');
  //   }
  // }, [sessionId, router.pathname]);

  return (
    <div className=" bg-gray-50 w-100 flex flex-col items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-lg p-8  mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Welcome to CarbonSage</h1>
        <p className="text-lg text-gray-600 mb-6">Your tool for tracking and reducing carbon emissions. Upload your project to get started.</p>
        
        <FileUpload />
      </div>
    </div>
  );
}
