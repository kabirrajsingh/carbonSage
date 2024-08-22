"use client";

export const renderFileTree = (files, path = '', handleFileClick) => {
 
  const directories = new Set();
  const fileNames = [];

  Object.keys(files).forEach(key => {
    if (key.startsWith(path)) {
      const relativePath = key.slice(path.length).split('/').filter(Boolean);
      if (relativePath.length > 1) {
        directories.add(relativePath[0]);
      } else {
        fileNames.push(relativePath[0]);
      }
    }
  });
  


  return (
    <ul className="list-disc pl-5 space-y-2">
      {Array.from(directories).map(directory => (
        <li key={directory} className="ml-4">
          <details className="cursor-pointer">
            <summary className="text-blue-600 hover:underline">{directory}</summary>
            {renderFileTree(files, `${path}${directory}/`, handleFileClick)}
          </details>
        </li>
      ))}
      {fileNames.map(fileName => (
        <li key={fileName} className="ml-4">
          <a
            href="#"
            onClick={() => handleFileClick(`${path}${fileName}`)}
            className="text-blue-600 hover:underline"
          >
            {fileName}
          </a>
        </li>
      ))}
    </ul>
  );
};

const ProjectFileList = ({ files, onFileClick }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Project Files</h2>
      {renderFileTree(files, '', onFileClick)}
    </div>
  );
};

export default ProjectFileList;
