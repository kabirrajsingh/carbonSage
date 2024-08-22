"use client"; // Ensure this file is a client component

import { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
const ProjectFilesContext = createContext();

export const ProjectFilesProvider = ({ children }) => {
  const [projectFiles, setProjectFiles] = useState({});
  const [showFiles, setShowFiles] = useState(true);
  const router = useRouter();


  useEffect(() => {
    const storedProjectFiles = localStorage.getItem('projectFiles');
    if (storedProjectFiles ) {
      setProjectFiles(storedProjectFiles );
    }
  }, []);


  useEffect(() => {
    if (projectFiles) {
      localStorage.setItem('projectFiles', projectFiles);
    } else {
      localStorage.removeItem('projectFiles');
    }

   
  }, [projectFiles, router]);


  return (
    <ProjectFilesContext.Provider value={{ projectFiles, setProjectFiles, showFiles, setShowFiles }}>
      {children}
    </ProjectFilesContext.Provider>
  );
};

export const useProjectFiles = () => useContext(ProjectFilesContext);
