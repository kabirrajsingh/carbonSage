"use client";
import { useEffect, useState, useMemo } from 'react';
import { useSession } from '../context/SessionContext';
import { API_ENDPOINTS } from '../config/appConfig';

const HashTable = ({ hashToLine, functionProfileMap, codeFiles }) => {
  const { sessionId } = useSession();
  const [projectFiles, setProjectFiles] = useState({});
  const [selectedCode, setSelectedCode] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // Adjust the number of rows per page here
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    if (sessionId) {
      const fetchProjectFiles = async () => {
        try {
          const response = await fetch(API_ENDPOINTS.GET_ALL_PROJECT_FILES, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ session_id: sessionId }),
          });
          if (!response.ok) {
            throw new Error('Failed to fetch project files');
          }
          const data = await response.json();
          setProjectFiles(data);
        //   console.log('Project Files:', JSON.stringify(data, null, 2));
        } catch (error) {
          console.error('Error fetching project files:', error);
        }
      };
      fetchProjectFiles();
    }
  }, [sessionId]);

  const getHighlightedCodeSnippet = (source, fromLine, toLine) => {
    const fileContent = projectFiles[source] || '';
    const codeLines = fileContent.split('\n');
    const highlightedLines = codeLines
      .slice(fromLine - 1, toLine)
      .map(line => `<span class="bg-yellow-200">${line}</span>`)
      .join('\n');
    return highlightedLines;
  };

  const handleRowClick = (source, fromLine, toLine) => {
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

    setSelectedCode({ source, fullCode: highlightedCode });
  };

  const sortedRows = useMemo(() => {
    let sortableItems = [...Object.keys(functionProfileMap)];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        const valA = functionProfileMap[a][0][sortConfig.key];
        const valB = functionProfileMap[b][0][sortConfig.key];

        if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
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
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
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
            const profile = functionProfileMap[hash][0];
            const lineData = hashToLine[hash] || {};
            const codeSnippet = getHighlightedCodeSnippet(lineData[2], lineData[0], lineData[1]);

            if (profile) {
              return (
                <tr
                  key={hash}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleRowClick(lineData[2], lineData[0], lineData[1])}
                >
                  <td className="px-4 py-2 border-b">{profile.cpu_percent || '-'}</td>
                  <td className="px-4 py-2 border-b">{profile.iteration || '-'}</td>
                  <td className="px-4 py-2 border-b">{profile.pageins || '-'}</td>
                  <td className="px-4 py-2 border-b">{profile.pfaults || '-'}</td>
                  <td className="px-4 py-2 border-b">{profile.rss || '-'}</td>
                  <td className="px-4 py-2 border-b">{profile.vms || '-'}</td>
                  <td
                    className="px-4 py-2 border-b whitespace-pre-wrap font-mono text-xs"
                    dangerouslySetInnerHTML={{ __html: codeSnippet || 'Code not available' }}
                  />
                </tr>
              );
            }

            return null;
          })}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        {Array.from({ length: Math.ceil(sortedRows.length / rowsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`px-4 py-2 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} rounded hover:bg-blue-600`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal for showing full code */}
      {selectedCode && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-4xl">
            <h2 className="text-2xl font-semibold mb-4">Full Code: {selectedCode.source}</h2>
            <div className="overflow-y-auto max-h-96"> {/* Scrollable code section */}
              <pre
                className="whitespace-pre-wrap font-mono text-sm border border-gray-300 p-4 rounded"
                dangerouslySetInnerHTML={{ __html: selectedCode.fullCode }}
              />
            </div>
            <button
              onClick={() => setSelectedCode(null)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HashTable;
