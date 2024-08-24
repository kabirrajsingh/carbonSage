"use client"
import React from 'react';

const CodeModal = ({ code, optimizedCode, source, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-semibold mb-4">Code from {source}</h2>
        <div className="flex flex-col space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 overflow-y-auto max-h-80">
            <h3 className="text-xl font-medium mb-2">Original Code</h3>
            <pre className="whitespace-pre-wrap">
              <code dangerouslySetInnerHTML={{ __html: code }} />
            </pre>
          </div>
          {optimizedCode && (
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 overflow-y-auto max-h-80">
              <h3 className="text-xl font-medium mb-2">Optimized Code</h3>
              <pre className="whitespace-pre-wrap">
                <code dangerouslySetInnerHTML={{ __html: optimizedCode }} />
              </pre>
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CodeModal;
