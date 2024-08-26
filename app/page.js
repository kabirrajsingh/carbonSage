"use client";

import FileUpload from './components/FileUpload';
import { useSession } from './context/SessionContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ImageCarousel from './components/ImageCarousel'; // Import the new carousel component

export default function Home() {
  const router = useRouter();
  const { sessionId } = useSession();

  useEffect(() => {
    if (sessionId && router.pathname === '/') {
      router.push('/dashboard');
    }
  }, [sessionId, router.pathname]);

  return (
    <div className="bg-gray-50  flex flex-col items-center justify-center p-8">
      <div className="bg-white shadow-2xl rounded-lg p-8 mx-auto max-w-4xl text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-blue-100 opacity-50 rounded-lg"></div>
        
        <h1 className="relative text-5xl font-extrabold text-gray-900 mb-6 z-10">Welcome to CarbonSage</h1>
        <p className="relative text-lg text-gray-700 mb-8 z-10">
          Your tool for tracking and reducing carbon emissions. Upload your project to get started.
        </p>

        

        <div className="relative z-10 bg-blue-50 p-8 rounded-lg shadow-lg mt-8">
          <p className="text-base text-gray-800 mb-6">
            <strong className="font-semibold">Note:</strong> Dynamic file upload will not work on the deployed link due to limited EC2 credits. 
            Responses are from a previous session. To run the solution based on your project, follow the 
            instructions given in the GitHub link below and set it up locally. Watch the YouTube video for 
            a demo of our solution.
          </p>
          
          <a 
            href="https://github.com/orgs/med-tech-solution/repositories" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 underline hover:text-blue-800 block mb-6 text-lg font-medium"
          >
            GitHub Repository
          </a>
          
          <div className="flex justify-center mb-8">
            <iframe 
              width="560" 
              height="315" 
              src="https://www.youtube.com/embed/W9BEOPmMx_A?si=q1o8kaT12IR53knH" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>

          <div className="relative z-10 mb-8">
            <ImageCarousel /> {/* Use the custom carousel here */}
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={() => router.push('/dashboard')} 
              className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
        <div className="relative z-10 mb-2">
          <FileUpload />
        </div>
      </div>
    </div>
  );
}
