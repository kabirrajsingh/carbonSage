"use client";
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import HashTable from '../components/HashTable';
import TimeSeriesGraph from '../components/TimeSeriesGraph';
import { API_ENDPOINTS } from '../config/appConfig';
import { useSession } from '../context/SessionContext';
import FunctionProfileTable from '../components/FunctionProfileTable';

const AnalyticsPage = () => {
    const { sessionId, hashToLine, setHashToLine } = useSession();
    const [data, setData] = useState({});
    const [functionMap, setFunctionMap] = useState([]);
    const [averageValues, setAverageValues] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                let responseData;
                
                if (process.env.NEXT_PUBLIC_NODE_ENV === 'prod') {
                    // Fetch the response from a local file in production
                    const response = await fetch('/data/analyzeProfile.json');
                    responseData = await response.json();
                } else {
                    // Make the API call in non-production environments
                    const response = await fetch(API_ENDPOINTS.ANALYZE_PROFILE, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ session_id: sessionId }),
                    });
                    responseData = await response.json();
                }
                
                setData(responseData);
            
                if (true) {
                    let hashToLine;
                    
                    if (process.env.NEXT_PUBLIC_NODE_ENV === 'prod') {
                        // Fetch the response from a local file in production
                        const response = await fetch('/data/hashToLine.json');
                        hashToLine = await response.json();
                    } else {
                        // Make the API call in non-production environments
                        const response = await fetch(API_ENDPOINTS.GET_HASH_TO_LINENO, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ session_id: sessionId }),
                        });
                        hashToLine = await response.json();
                    }
            
                    const hashToLinePart = hashToLine["hash_to_lineno_fullproj"];
                    console.log(hashToLinePart)
                    setHashToLine(hashToLinePart);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
        };

        fetchData();
    }, [sessionId]);

    useEffect(() => {
        setFunctionMap(data["function_wise_energy_and_avg"]);
    }, [data]);

    useEffect(() => {
        setAverageValues(data["all_function_avg"]);
    }, [data]);

    const timeSeriesData = data.profiletime_to_function || {}; 
    const functionProfileMap = data.function_profile_map || {}; 
    const timestamps = Object.keys(timeSeriesData);

    const getTimeRange = () => {
        if (timestamps.length === 0) return { start: '-', end: '-' };
        const start = format(new Date(timestamps[0]), 'MMM dd, yyyy HH:mm:ss');
        const end = format(new Date(timestamps[timestamps.length - 1]), 'MMM dd, yyyy HH:mm:ss');
        return { start, end };
    };

    const getSummaryStats = (attribute) => {
        const values = timestamps.map(timestamp => parseFloat(timeSeriesData[timestamp]?.profile_log[attribute]) || 0);
        const min = Math.min(...values).toFixed(2);
        const max = Math.max(...values).toFixed(2);
        const avg = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
        return { min, max, avg };
    };

    const { start, end } = getTimeRange();

    return (
        <div className="p-8 bg-gradient-to-r from-gray-50 to-gray-200 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-5xl font-extrabold mb-8 text-gray-900 text-center">Analytics Dashboard</h1>
                <p className="text-xl mb-6 text-gray-700 text-center">
                    Data from <span className="font-semibold text-gray-900">{start}</span> to <span className="font-semibold text-gray-900">{end}</span>
                </p>
                <div className="mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
                        <FunctionProfileTable functionParams={functionMap} averageValues={averageValues} />
                    </div>
                </div>
                <div className="mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
                        {Object.keys(functionProfileMap).length > 0 ? (
                            <HashTable functionProfileMap={functionProfileMap} />
                        ) : (
                            <p className="text-center text-gray-500">No function profile data available.</p>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {['cpu_percent', 'iteration', 'pageins', 'pfaults', 'rss', 'vms'].map((attribute) => {
                        const { min, max, avg } = getSummaryStats(attribute);
                        return (
                            <div key={attribute} className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 transition-transform transform hover:scale-105">
                                <h2 className="text-2xl font-semibold mb-4 text-gray-800 capitalize">{attribute.replace('_', ' ')}</h2>
                                <TimeSeriesGraph data={timeSeriesData} attribute={attribute} />
                                <div className="mt-4 text-gray-800">
                                    <p className="text-lg"><span className="font-semibold">Min:</span> {min}</p>
                                    <p className="text-lg"><span className="font-semibold">Max:</span> {max}</p>
                                    <p className="text-lg"><span className="font-semibold">Average:</span> {avg}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
