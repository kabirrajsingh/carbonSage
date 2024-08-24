// components/Sidebar.js
import { useState } from 'react';
import { FaFile, FaFolder, FaChevronLeft } from 'react-icons/fa';

const Sidebar = ({ files, onFileClick, selectedFilePath }) => {
  const [currentPath, setCurrentPath] = useState('');
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  // Navigate to a specific path
  const navigateTo = (path) => {
    setCurrentPath(path);
    setBreadcrumbs(path.split('/').filter(Boolean));
  };

  // Go back to the parent directory
  const goBack = () => {
    const pathParts = breadcrumbs.slice(0, -1);
    const newPath = pathParts.join('/');
    navigateTo(newPath);
  };

  // Handle file click
  const handleFileClick = (filePath) => {
    onFileClick(filePath);
  };

  // Render the file tree recursively
  const renderFileTree = (files, basePath) => {
    return Object.keys(files).map((key) => {
      const fullPath = basePath ? `${basePath}/${key}` : key;
      const isDirectory = files[key] && typeof files[key] === 'object';

      return (
        <div key={fullPath} className="relative">
          <div
            className={`flex cursor-pointer p-2 hover:bg-gray-200 rounded transition-colors duration-200 ${fullPath === selectedFilePath ? 'bg-gray-300 font-semibold' : ''}`}
            onClick={() => isDirectory ? navigateTo(fullPath) : handleFileClick(fullPath)}
          >
            {isDirectory ? (
              <FaFolder className="mr-2 text-yellow-500" />
            ) : (
              <FaFile className="mr-2 text-yellow-500" />
            )} <FaFolder className="mr-2 text-yellow-500" />
            {key} <FaFolder  />
          </div>
          {isDirectory && currentPath.startsWith(fullPath) && (
            <div className="ml-4">{renderFileTree(files[key], fullPath)}</div>
          )}
        </div>
      );
    });
  };

  // Get the files for the current path
  const getFilesForCurrentPath = () => {
    const pathParts = currentPath.split('/').filter(Boolean);
    let currentFiles = files;
    for (const part of pathParts) {
      currentFiles = currentFiles[part];
    }
    return currentFiles || {};
  };

  return (
    <div className="w-64 bg-gray-100 p-4 h-screen border-r border-gray-200 overflow-hidden">
      <div className="flex items-center mb-4">
        {breadcrumbs.length > 0 && (
          <button onClick={goBack} className="text-blue-600 hover:underline flex items-center">
            <FaChevronLeft className="mr-1" /> Back
          </button>
        )}
        <span className="font-semibold text-lg ml-2">Files</span>
      </div>
      <div className="overflow-auto h-[calc(100vh-6rem)]"> {/* Adjust height dynamically */}
        {renderFileTree(getFilesForCurrentPath(), '')}
      </div>
    </div>
  );
};

export default Sidebar;
