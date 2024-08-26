"use client";
import { useEffect, useState, useMemo } from 'react';
import { useSession } from '../context/SessionContext';
import { API_ENDPOINTS } from '../config/appConfig';
import CodeModal from './CodeModal';
import getAllProjectFiles from '../../public/data/getAllProjectFiles';
const HashTable = ({ functionProfileMap, codeFiles }) => {
  const { sessionId, hashToLine } = useSession();
  const [projectFiles, setProjectFiles] = useState({});
  const [selectedCode, setSelectedCode] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // Adjust the number of rows per page here
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [optimizedCode, setOptimizedCode] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    console.log(hashToLine)
  }, [hashToLine])
  
  useEffect(() => {
    const fetchProjectFiles = async () => {
      if (process.env.NEXT_PUBLIC_NODE_ENV === "prod") {
        // Use the preloaded JSON data in production
        // projectF-await fetch('/data/getAllProjectFiles.json')
        // projAwait=await projectF.json()
        // setProjectFiles(projAwait);
        setProjectFiles(getAllProjectFiles);
      }else{
         
      
      const response = await fetch(API_ENDPOINTS.GET_ALL_PROJECT_FILES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session_id: sessionId }),
      });
      const data = await response.json();
      setProjectFiles(data);
    }
    };

    fetchProjectFiles();
  }, [sessionId]);


  const getHighlightedCodeSnippet = (source, fromLine, toLine) => {
    const fileContent = projectFiles[source] || '';
    const codeLines = fileContent.split('\n');
    const highlightedLines = codeLines
      .slice(fromLine - 1, toLine)
      .map(line => `<div class="bg-yellow-200">${line}</div>`)
      .join('');
    return highlightedLines;
  };

  const handleRowClick = (source, fromLine, toLine, hash) => {
    const fullCode = projectFiles[source] || '';
    const highlightedCode = fullCode
      .split('\n')
      .map((line, index) => {
        const lineNumber = index + 1;
        return lineNumber >= fromLine && lineNumber <= toLine
          ? `<span class="bg-yellow-200">${line}</span>`
          : line;
      })
      .join('\n');

    setSelectedCode({ source, fullCode: highlightedCode, hash });
  };

  const handleOptimizeCode = async () => {
    if (selectedCode) {
      setLoading(true);
      try {
        let data;
        if (process.env.NEXT_PUBLIC_NODE_ENV === "prod") {
          // Fetch from a file in production
          const response = await fetch('/data/optimize.json');
          if (!response.ok) {
            throw new Error('Failed to load optimize code response from file');
          }
          data = await response.json();
        } else {
          // Make an API call in other environments
          const response = await fetch(API_ENDPOINTS.OPTIMIZE, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              session_id: sessionId,
              function_id: selectedCode.hash,
            }),
          });
          if (!response.ok) {
            throw new Error('Failed to optimize code');
          }
          data = await response.json();
        }
        setOptimizedCode(data.optimized_code);
      } catch (error) {
        console.error('Error optimizing code:', error);
      } finally {
        setLoading(false);
      }
    }
  };
  

  const sortedRows = useMemo(() => {
    let sortableItems = [...Object.keys(functionProfileMap)];
    
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        const profileA = functionProfileMap[a] ? functionProfileMap[a][0] : {};
        const profileB = functionProfileMap[b] ? functionProfileMap[b][0] : {};

        const valA = profileA[sortConfig.key] !== undefined ? profileA[sortConfig.key] : '';
        const valB = profileB[sortConfig.key] !== undefined ? profileB[sortConfig.key] : '';

        if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }

    // Filter out rows that don't have a valid profile
    return sortableItems.filter(hash => functionProfileMap[hash] && functionProfileMap[hash][0]);
  }, [functionProfileMap, sortConfig]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedRows.slice(indexOfFirstRow, indexOfLastRow);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="overflow-x-auto">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-300">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Function Profile Details</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th
              className="px-4 py-2 border-b cursor-pointer"
              onClick={() => requestSort('hash')}
            >
              hash {sortConfig.key === 'hash' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
            </th>
            <th
              className="px-4 py-2 border-b cursor-pointer"
              onClick={() => requestSort('cpu_percent')}
            >
              CPU % {sortConfig.key === 'cpu_percent' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
            </th>
            <th
              className="px-4 py-2 border-b cursor-pointer"
              onClick={() => requestSort('iteration')}
            >
              Iteration {sortConfig.key === 'iteration' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
            </th>
            <th
              className="px-4 py-2 border-b cursor-pointer"
              onClick={() => requestSort('pageins')}
            >
              Page Ins {sortConfig.key === 'pageins' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
            </th>
            <th
              className="px-4 py-2 border-b cursor-pointer"
              onClick={() => requestSort('pfaults')}
            >
              Page Faults {sortConfig.key === 'pfaults' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
            </th>
            <th
              className="px-4 py-2 border-b cursor-pointer"
              onClick={() => requestSort('rss')}
            >
              RSS {sortConfig.key === 'rss' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
            </th>
            <th
              className="px-4 py-2 border-b cursor-pointer"
              onClick={() => requestSort('vms')}
            >
              VMS {sortConfig.key === 'vms' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
            </th>
            <th className="px-4 py-2 border-b">Code Snippet</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((hash) => {
            
            const profile = functionProfileMap[hash] ? functionProfileMap[hash][0] : {};
            // {console.log(hash)}
            // {console.log(hashToLine)}
            const lineData = hashToLine && hashToLine[hash] ? hashToLine[hash] : {};

            const codeSnippet = getHighlightedCodeSnippet(lineData[2], lineData[0], lineData[1]);
            {
            // console.log(profile)
            //   console.log(hash)
            //   console.log(hashToLine)
            //   console.log(lineData)
            }
            return (
              <tr
                key={hash}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(lineData[2], lineData[0], lineData[1], hash)}
              >
                <td className="px-4 py-2 border-b">{hash || '-'}</td>
                <td className="px-4 py-2 border-b">{profile.cpu_percent || '-'}</td>
                <td className="px-4 py-2 border-b">{profile.iteration || '-'}</td>
                <td className="px-4 py-2 border-b">{profile.pageins || '-'}</td>
                <td className="px-4 py-2 border-b">{profile.pfaults || '-'}</td>
                <td className="px-4 py-2 border-b">{profile.rss || '-'}</td>
                <td className="px-4 py-2 border-b">{profile.vms || '-'}</td>
                <td className="px-4 py-2 border-b">
                  <div dangerouslySetInnerHTML={{ __html: codeSnippet }} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(sortedRows.length / rowsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {selectedCode && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50 overflow-y-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-8xl max-h-[100vh] overflow-hidden">
          <h2 className="text-2xl font-bold mb-4">Code from {selectedCode.source}</h2>
      
          {/* Button to optimize the code */}
          <button
            onClick={handleOptimizeCode}
            className={`w-full px-4 py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${loading ? 'cursor-wait' : 'cursor-pointer'}`}
          >
            {loading ? 'Optimizing...' : 'Optimize Code'}
          </button>
      
          {/* Split view for code and optimized code */}
          <div className="flex  mb-4 ">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Original Code:</h3>
              <div className="overflow-y-auto max-h-[70vh] bg-gray-100 p-4 rounded border border-gray-300">
                <pre className="whitespace-pre-wrap">
                  <code dangerouslySetInnerHTML={{ __html: selectedCode.fullCode }} />
                </pre>
              </div>
            </div>
      
            {optimizedCode && (
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Optimized Code:</h3>
                <div className="overflow-y-auto max-h-[70vh] bg-gray-100 p-4 rounded border border-gray-300">
                  <pre className="whitespace-pre-wrap">
                    <code dangerouslySetInnerHTML={{ __html: optimizedCode }} />
                  </pre>
                </div>
              </div>
            )}
          </div>
      
          {/* Close button */}
          <button
            onClick={() => setSelectedCode(null)}
            className="w-full px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
          >
            Close
          </button>
        </div>
      </div>
      
      
      
      )}
    </div>
    </div>
  );
};

export default HashTable;
