"use client"
import React from 'react';

const FunctionProfileTable = ({ functionProfileMap }) => {
    const tableHeaders = ["Function ID", "CPU %", "Iterations", "Pageins", "Pfaults", "RSS", "VMS", "Elapsed Time", "Energy Consumption", "CO2 Emissions"];

    return (
        <div className="bg-white shadow rounded-lg p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Function Profile Map</h2>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                    <tr>
                        {tableHeaders.map((header, index) => (
                            <th key={index} className="py-3 px-6 bg-gray-100 border-b border-gray-200 text-gray-600 text-left text-sm uppercase font-semibold">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(functionProfileMap).map((functionId, index) => (
                        functionProfileMap[functionId].map((profile, idx) => (
                            <tr key={`${functionId}-${idx}`} className="border-b border-gray-200">
                                <td className="py-3 px-6 text-gray-800 text-sm">{functionId}</td>
                                <td className="py-3 px-6 text-gray-800 text-sm">{profile.cpu_percent}</td>
                                <td className="py-3 px-6 text-gray-800 text-sm">{profile.iteration}</td>
                                <td className="py-3 px-6 text-gray-800 text-sm">{profile.pageins}</td>
                                <td className="py-3 px-6 text-gray-800 text-sm">{profile.pfaults}</td>
                                <td className="py-3 px-6 text-gray-800 text-sm">{profile.rss}</td>
                                <td className="py-3 px-6 text-gray-800 text-sm">{profile.vms}</td>
                                <td className="py-3 px-6 text-gray-800 text-sm">{profile.elapsed_time}</td>
                                <td className="py-3 px-6 text-gray-800 text-sm">{profile.energy_consumption}</td>
                                <td className="py-3 px-6 text-gray-800 text-sm">{profile.co2_emissions}</td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FunctionProfileTable;
