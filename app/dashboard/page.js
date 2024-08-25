// pages/dashboard.js
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '../context/SessionContext';
import { useProjectFiles } from '../context/ProjectFilesContext';
import { API_ENDPOINTS } from '../config/appConfig';
import ProjectFileList from '../components/ProjectFileList';
import Sidebar from '../components/SideBar';
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
  const [showPopup, setShowPopup] = useState(false)
  const router = useRouter();

  useEffect(() => {
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
  }, [sessionId]);

  useEffect(() => {
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
            setProfilingMessage(''); 
            setProfilingInProgress(false);
            setShowPopup(true);
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
      }, 5000); 

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
    console.log(data)
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

    setProfilingInProgress(true);
    setProfilingMessage('');

    const defaultArgs = {
      cpu_power: 0,
      memory_power: 0,
      io_power: 0,
      power_of_10: 0
    };

    const callerMetadata = {
      filepath: selectedFilePath,
      args: { 
        ...defaultArgs, 
        ...userInputs[selectedFilePath] 
      },
    };

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

      alert("Profiling is in progress. Please refrain from sending duplicate requests.");
    } catch (error) {
      console.error("Error starting profiling:", error);
    }
  };

  const handleViewAnalytics = () => {
    const analyticsUrl = `/analytics`;
    window.open(analyticsUrl, '_blank');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
  {/* Sidebar */}
  {showPopup && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Analytics Completed
        </h2>
        <p className="mt-2 text-gray-600">
          The results have been sent to <strong>developerkabir@gmail.com</strong>.
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Powered by <strong>OpenText API</strong>.
        </p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          onClick={() => setShowPopup(false)}
        >
          Close
        </button>
      </div>
    </div>
  )}
  
  <Sidebar files={projectFiles} onFileClick={handleFileClick} selectedFilePath={selectedFilePath} />

  <div className="flex-1 p-8 space-y-6">
    <h1 className="text-4xl font-bold text-gray-800 mb-4">Dashboard</h1>
    <p className="text-xl text-gray-600 mb-6">Session ID: <span className="font-medium">{sessionId}</span></p>

    <div className="flex gap-4 mb-6">
      <button
        className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition"
        onClick={handleUploadAnotherProject}
      >
        Upload Another Project
      </button>
      <button
        className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-700 transition"
        onClick={handleProcessProject}
      >
        Process Project Folder
      </button>
    </div>

    {selectedFilePath && (
      <div className="border-t border-gray-300 pt-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">File: {selectedFilePath}</h3>
        <div className="relative bg-white rounded-lg overflow-hidden shadow-md">
          <div className="p-4 bg-gray-100">
            <pre className="whitespace-pre-wrap text-sm text-gray-800">{selectedFileContent}</pre>
          </div>
          <div className="absolute top-2 right-2">
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() => setSelectedFilePath('')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        {parseArgs[selectedFilePath] && parseArgs[selectedFilePath].length !== 0 && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Parameters</h4>
            <div className="space-y-4">
              {parseArgs[selectedFilePath].map((param, index) => (
                <ParameterInput
                  key={index}
                  filePath={selectedFilePath}
                  param={param}
                  handleUserInputChange={handleUserInputChange}
                />
              ))}
            </div>
            <button
              className="mt-6 bg-purple-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-purple-700 transition"
              onClick={handleStartProfiling}
            >
              Start Profiling
            </button>
          </div>
        )}
      </div>
    )}


        <div className="w-full max-w-5xl bg-white shadow-xl rounded-lg p-6 space-y-6 mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profiling Status</h2>
          {profilingMessage && (
            <p className="text-gray-700">{profilingMessage}</p>
          )}
          {profilingResults.length > 0 && (
            <ul className="space-y-4">
              {profilingResults.map((result, index) => (
                <li key={index} className="flex justify-between items-center p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm">
                  <span className="text-gray-700">Profiling Completed</span>
                  <button
                    className="bg-blue-600 text-white py-1 px-3 rounded-lg shadow-md hover:bg-blue-700 transition"
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
    </div>
  );
}
