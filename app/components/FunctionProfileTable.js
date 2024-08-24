"use client"
import React from 'react';

const FunctionProfileTable = ({ functionParams, averageValues }) => {
    if (!functionParams) return null;

    const convertToMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2); // Convert bytes to megabytes

    const getHighlightClass = (value, average) => {
        return value < average ? 'bg-green-100' : 'bg-yellow-100';
    };

    const tableHeaders = [
        "Function ID", "CPU %", "Pageins", "Pfaults", 
        "Physical Memory (RSS MB)", "Virtual Memory (VMS MB)", 
        "Elapsed Time (secs)", "Energy Consumption (kWh)", 
        "CO2 Emissions (kg)"
    ];

    const averageHeaders = [
        "Metric", "Value"
    ];

    const averagesTable = (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-300">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Average Values For Function Parameters</h3>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        {averageHeaders.map((header, index) => (
                            <th
                                key={index}
                                className="py-3 px-6 text-left text-sm uppercase font-semibold"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(averageValues).map(([metric, value]) => (
                        <tr key={metric} className="border-b border-gray-200">
                            <td className="py-3 px-6 text-gray-800 text-sm font-medium">{metric.replace(/_/g, ' ').toUpperCase().slice(0,-3)}</td>
                            <td className="py-3 px-6 text-gray-800 text-sm">{value.toFixed(6)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className=" shadow-2xl rounded-lg p-4 mt-8 overflow-x-auto">
            {averagesTable}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-300">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 ">Function Profile Map</h2>
            
            <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
                <thead>
                    {/* <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"> */}
                    <tr>
                        {tableHeaders.map((header, index) => (
                            <th
                                key={index}
                                className="py-4 px-2 text-left text-sm uppercase font-semibold tracking-wider"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(functionParams).map((functionId) => {
                        const profile = functionParams[functionId];

                        return (
                            <tr key={functionId} className="hover:bg-gray-100 transition duration-300 ease-in-out" >
                                <td className="py-4 px-3 text-gray-800 text-sm">{functionId}</td>
                                <td className={`py-4 px-3 text-gray-800 text-sm ${getHighlightClass(profile.avg_cpu_percent, averageValues.avg_cpu_percent_all)}`}>
                                    {profile.avg_cpu_percent.toFixed(2)}%
                                </td>
                                <td className={`py-4 px-3 text-gray-800 text-sm ${getHighlightClass(profile.avg_pageins, averageValues.avg_pageins_all)}`}>
                                    {profile.avg_pageins}
                                </td>
                                <td className={`py-4 px-6 text-gray-800 text-sm ${getHighlightClass(profile.avg_pfaults, averageValues.avg_pfaults_all)}`}>
                                    {profile.avg_pfaults}
                                </td>
                                <td className={`py-4 px-6 text-gray-800 text-sm ${getHighlightClass(convertToMB(profile.avg_rss), convertToMB(averageValues.avg_rss_all))}`}>
                                    {convertToMB(profile.avg_rss)} MB
                                </td>
                                <td className={`py-4 px-6 text-gray-800 text-sm ${getHighlightClass(convertToMB(profile.avg_vms), convertToMB(averageValues.avg_vms_all))}`}>
                                    {convertToMB(profile.avg_vms)} MB
                                </td>
                                <td className={`py-4 px-6 text-gray-800 text-sm ${getHighlightClass(profile.elapsed_time_secs, averageValues.elapsed_time_secs_all)}`}>
                                    {profile.elapsed_time_secs.toFixed(2)} secs
                                </td>
                                <td className={`py-4 px-6 text-gray-800 text-sm ${getHighlightClass(profile.energy_consumption_kwh, averageValues.energy_consumption_kwh_all)}`}>
                                    {profile.energy_consumption_kwh.toFixed(2)} kWh
                                </td>
                                <td className={`py-4 px-6 text-gray-800 text-sm ${getHighlightClass(profile.co2_emissions_kg, averageValues.co2_emissions_kg_all)}`}>
                                    {profile.co2_emissions_kg.toFixed(6)} kg
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default FunctionProfileTable;
