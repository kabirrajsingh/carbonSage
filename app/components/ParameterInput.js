"use client";

import { useState } from 'react';

export default function ParameterInput({ filePath, param, handleUserInputChange }) {
  const [sliderValue, setSliderValue] = useState(0);

  const handleChange = (event) => {
    const value = event.target.type === 'range' ? parseInt(event.target.value, 10) : event.target.value;
    handleUserInputChange(filePath, param.name, value);

    if (event.target.type === 'range') {
      setSliderValue(value);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-gray-800 text-sm font-semibold">
          {param.help}
          <span className="text-gray-500 text-xs"> ({param.name})</span>
        </label>
        {param.type === 'int' && (
          <span className="text-gray-500 text-xs">Value: {sliderValue}</span>
        )}
      </div>
      {param.type === 'int' ? (
        <div className="relative">
          <input
            type="range"
            min="0"
            max="10"
            value={sliderValue}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer transition duration-200 ease-in-out hover:bg-gray-300 focus:outline-none"
            onChange={handleChange}
          />
          <div className="flex justify-between mt-1 text-xs text-gray-600">
            <span>0</span>
            <span>10</span>
          </div>
        </div>
      ) : (
        <input
          type="text"
          placeholder={`Enter ${param.name}`}
          className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          onChange={handleChange}
        />
      )}
    </div>
  );
}
