"use client"; // Ensure this file is a client component

import { createContext, useState, useContext } from 'react';

const ProjectFilesContext = createContext();

export const ProjectFilesProvider = ({ children }) => {
  const [projectFiles, setProjectFiles] = useState({});
  const [showFiles, setShowFiles] = useState(true);

  return (
    <ProjectFilesContext.Provider value={{ projectFiles, setProjectFiles, showFiles, setShowFiles }}>
      {children}
    </ProjectFilesContext.Provider>
  );
};

export const useProjectFiles = () => useContext(ProjectFilesContext);
