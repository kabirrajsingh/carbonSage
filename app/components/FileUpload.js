"use client"; // Ensure this file is a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '../context/SessionContext';
import { API_ENDPOINTS } from '../config/appConfig';

export default function FileUpload() {
  const { sessionId, setSessionId } = useSession();
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(''); // Clear error when a new file is selected
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      let response;

      if (process.env.NEXT_PUBLIC_NODE_ENV === 'prod') {
        // Fetch response from a local file in production
        const fileData = await fetch('/data/createSession.json');
        response = await fileData.json();
      } else {
        // Make the API call in non-production environments
        response = await fetch(`${API_ENDPOINTS.UPLOAD_FILE}`, {
          method: 'POST',
          body: formData,
        });
      }

      if (response.ok || process.env.NEXT_PUBLIC_NODE_ENV === 'prod') {
        const data = await response.json();
        setSessionId(data.sessionId);
        router.push('/dashboard');
      } else {
        const errorText = await response.text();
        setError(`Upload failed: ${errorText}`);
      }
    } catch (error) {
      setError(`Error uploading file: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-8">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Upload Your Project</h1>
        <p className="text-lg text-gray-700 mb-6">
          Select a folder to upload. This will initialize your session and allow you to access the dashboard.
        </p>
        <div className="flex flex-col items-center">
          <label className="w-full">
            <input 
              type="file" 
              onChange={handleFileChange} 
              className="file-input hidden"
              webkitdirectory="true"
              directory="true"
              multiple
            />
            <div className="w-full bg-blue-100 border-2 border-dashed border-blue-300 rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-blue-200 transition duration-300">
              <p className="text-blue-600 mb-2">Drag & drop files here or</p>
              <button className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                Choose Files
              </button>
            </div>
          </label>
          <button 
            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 mt-6"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
          {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  );
}
