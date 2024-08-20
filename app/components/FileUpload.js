// app/upload/page.js
"use client"; // Ensure this file is a client component

import { useState ,useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '../context/SessionContext';
import { API_ENDPOINTS } from '../config/appConfig';
export default function FileUpload() {
  


  const { sessionId,setSessionId } = useSession();
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    console.log('Session ID:', sessionId); // Check if sessionId is logged correctly
  }, [sessionId]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Upload Project</h1>
      <input type="file" onChange={handleFileChange} />
      <button className="btn mt-4" onClick={handleUpload}>
        Upload
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}