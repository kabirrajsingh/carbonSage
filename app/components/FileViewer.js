// app/files/[filepath]/page.js
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '../config/appConfig';
export default function FileViewer() {
  const router = useRouter();
  const { pathname } = router;
  const filePath = decodeURIComponent(pathname.split('/').pop() || '');
  const [fileContent, setFileContent] = useState("");

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.GET_FILE_CONTENT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ file_path: filePath }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.text();
        setFileContent(data);
      } catch (error) {
        console.error('Error fetching file content:', error);
      }
    };

    fetchFileContent();
  }, [filePath]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">{filePath}</h1>
      <pre className="bg-gray-100 p-4 rounded">{fileContent}</pre>
    </div>
  );
}
