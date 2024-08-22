"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '../context/SessionContext';
import { useProjectFiles } from '../context/ProjectFilesContext';
import { API_ENDPOINTS } from '../config/appConfig';
import ProjectFileList from '../components/ProjectFileList';
import ParameterInput from '../components/ParameterInput';

export default function Dashboard() {
  const { sessionId, logout } = useSession();
  const { projectFiles, setProjectFiles, showFiles, setShowFiles } = useProjectFiles();
  const [selectedFilePath, setSelectedFilePath] = useState('');
  const [selectedFileContent, setSelectedFileContent] = useState('');
  const [parseArgs, setParseArgs] = useState({});
  const [userInputs, setUserInputs] = useState({});
  const [profilingInProgress, setProfilingInProgress] = useState(false);
  const [profilingMessage, setProfilingMessage] = useState('');
  const [profilingResults, setProfilingResults] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (sessionId) {
      const fetchProjectFiles = async () => {
        const response = await fetch(API_ENDPOINTS.GET_ALL_PROJECT_FILES, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ session_id: sessionId }),
        });
        const data = await response.json();
        setProjectFiles(data);
      };

      fetchProjectFiles();
    }
  }, [sessionId]);

  useEffect(() => {
    // Start polling for profiling status when the component mounts
    let intervalId;

    if (sessionId) {
      intervalId = setInterval(async () => {
        try {
          const response = await fetch(API_ENDPOINTS.ANALYZE_PROFILE, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ session_id: sessionId }),
          });

          if (response.ok) {
            const analysisData = await response.json();
            setProfilingResults([analysisData]);
            setProfilingMessage(''); // Clear message if results are found
            setProfilingInProgress(false);
          } else if (response.status === 501) {
            setProfilingMessage('Profiling is still in progress.');
          } else if (response.status === 300) {
            setProfilingMessage('No process to analyze.');
          } else {
            setProfilingMessage('An unexpected error occurred.');
          }
        } catch (error) {
          console.error("Error fetching analysis data:", error);
          setProfilingMessage('An error occurred while polling for results.');
        }
      }, 5000); // Poll every 5 seconds

      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [sessionId]);

  const handleUploadAnotherProject = () => {
    logout();
  };

  const toggleFilesVisibility = () => {
    setShowFiles(prev => !prev);
  };

  const handleFileClick = (filePath) => {
    setSelectedFilePath(filePath);
    setSelectedFileContent(projectFiles[filePath]);
  };

  const handleProcessProject = async () => {
    const response = await fetch(API_ENDPOINTS.PROCESS_PROJECT_FOLDER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session_id: sessionId }),
    });

    const data = await response.json();
    setParseArgs(data.parse_args_fullproj);
  };

  const handleUserInputChange = (filePath, paramName, value) => {
    setUserInputs(prev => ({
      ...prev,
      [filePath]: {
        ...prev[filePath],
        [paramName]: value,
      },
    }));
  };

  const handleStartProfiling = async () => {
    if (profilingInProgress) {
      alert("Profiling is already in progress. Please wait until it completes.");
      return;
    }

    // Set profiling status to true
    setProfilingInProgress(true);
    setProfilingMessage('');

    // Default values for arguments
    const defaultArgs = {
      cpu_power: 0,
      memory_power: 0,
      io_power: 0,
      power_of_10: 0
    };

    // Construct callerMetadata with default values
    const callerMetadata = {
      filepath: selectedFilePath,
      args: { 
        ...defaultArgs, 
        ...userInputs[selectedFilePath] 
      },
    };

    console.log("Caller Metadata:", callerMetadata);

    try {
      await fetch(API_ENDPOINTS.START_PROFILING, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          caller_metadata: callerMetadata,
        }),
      });

      // Display message to the user
      alert("Profiling is in progress. Please refrain from sending duplicate requests.");
    } catch (error) {
      console.error("Error starting profiling:", error);
    }
  };

  const handleViewAnalytics = () => {
    const analyticsUrl = `/analytics?session_id=${sessionId}&results=${encodeURIComponent(JSON.stringify(profilingResults))}`;
    window.open(analyticsUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="bg-red-500 text-white p-4">
        Test Tailwind
      </div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-xl mb-4">Session ID: {sessionId}</p>

      <div className="flex gap-4 mb-6">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          onClick={handleUploadAnotherProject}
        >
          Upload Another Project
        </button>
        <button
          className="bg-gray-500 py-2 px-4 rounded hover:bg-gray-600 transition"
          onClick={toggleFilesVisibility}
        >
          {showFiles ? 'Hide' : 'Show'} Project Files
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
          onClick={handleProcessProject}
        >
          Process Project Folder
        </button>
      </div>

      {showFiles && projectFiles && (
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 space-y-6">
          <ProjectFileList files={projectFiles} onFileClick={handleFileClick} />
          {selectedFilePath && (
            <div className="border-t border-gray-300 pt-6">
              <h3 className="text-2xl font-semibold mb-2">File: {selectedFilePath}</h3>
              <div className="relative bg-gray-100 rounded-lg overflow-auto">
                <pre className="whitespace-pre-wrap p-4 text-sm">{selectedFileContent}</pre>
                <div className="absolute top-0 right-0 p-2">
                  <button
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => setSelectedFilePath('')}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
              {parseArgs[selectedFilePath] && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold mb-2">Parameters</h4>
                  {parseArgs[selectedFilePath].map((param, index) => (
                    <ParameterInput
                      key={index}
                      filePath={selectedFilePath}
                      param={param}
                      handleUserInputChange={handleUserInputChange}
                    />
                  ))}
                </div>
              )}
              <button
                className="mt-4 bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition"
                onClick={handleStartProfiling}
              >
                Start Profiling
              </button>
            </div>
          )}
        </div>
      )}

      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mt-6 space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Profiling Status</h2>
        {profilingMessage && (
          <p>{profilingMessage}</p>
        )}
        {profilingResults.length > 0 && (
          <ul>
            {profilingResults.map((result, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <span>Profiling Completed</span>
                <button
                  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
                  onClick={handleViewAnalytics}
                >
                  View Analytics
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
