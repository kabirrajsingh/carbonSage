"use client"; // Ensure this file is a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '../context/SessionContext';
import { API_ENDPOINTS } from '../config/appConfig';

export default function FileUpload() {
  const { sessionId, setSessionId } = useSession();
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('folder', file);

    try {
      const response = await fetch(`${API_ENDPOINTS.UPLOAD_FILE}`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const { sessionId } = await response.json();
        setSessionId(sessionId);
        router.push('/dashboard');
      } else {
        const errorText = await response.text();
        setError(`Upload failed: ${errorText}`);
      }
    } catch (error) {
      setError(`Error uploading file: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Upload Your Project</h1>
        <p className="text-lg text-gray-600 mb-6">Select a folder to upload. This will initialize your session and allow you to access the dashboard.</p>
        <div className="flex flex-col items-center">
          <input 
            type="file" 
            onChange={handleFileChange} 
            className="file-input mb-4 py-2 px-4 border rounded-lg shadow-md"
            webkitdirectory="true"
            directory="true"
            multiple
          />
          <button 
            className="btn bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            onClick={handleUpload}
          >
            Upload
          </button>
          {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  );
}
