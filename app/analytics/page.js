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
    useEffect(() => {
        console.log(sessionId)
    }, [sessionId]);
    
    const [data, setData] = useState({});
    useEffect(() => {
      console.log(data)
  }, [data]);
    const attributes = ['cpu_percent', 'iteration', 'pageins', 'pfaults', 'rss', 'vms'];
  const [functionMap, setFunctionMap] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from /analyze_profile
                const responseData = await fetch(API_ENDPOINTS.ANALYZE_PROFILE, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ session_id: sessionId }),
                });
                const resultData = await responseData.json();
                setData(resultData);
                

                // Fetch hash_to_line from /get_hash_to_lineno_fullproj if not already in context
                // if (Object.keys(hashToLine).length === 0) {
                if(true){
                    const responseHashToLine = await fetch(API_ENDPOINTS.GET_HASH_TO_LINENO, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ session_id: sessionId }),
                    });
                    const resultHashToLine = await responseHashToLine.json();
                    const hashToLinePart = await resultHashToLine["hash_to_lineno_fullproj"];
                    console.log(hashToLinePart);
                    setHashToLine(hashToLinePart);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [sessionId]);

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
        <div className="p-8 bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold mb-8 text-gray-900 text-center">Analytics Dashboard</h1>
                <p className="text-xl mb-6 text-gray-700 text-center">
                    Data from: <span className="font-bold text-gray-900">{start}</span> to <span className="font-bold text-gray-900">{end}</span>
                </p>
                <div className="analytics-page-container">
            
            <FunctionProfileTable functionProfileMap={functionMap} />
            
        </div>
                <div className="mb-12">
                    <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Function Profile Details</h2>
                    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                        {Object.keys(functionProfileMap).length > 0 ? (
                          
                            <HashTable  functionProfileMap={functionProfileMap} />
                        ) : (
                            <p className="text-center text-gray-500">No function profile data available.</p>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {attributes.map((attribute) => {
                        const { min, max, avg } = getSummaryStats(attribute);
                        return (
                            <div key={attribute} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105">
                                <h2 className="text-2xl font-semibold mb-6 capitalize text-gray-700">{attribute.replace('_', ' ')}</h2>
                                <TimeSeriesGraph data={timeSeriesData} attribute={attribute} />
                                <div className="mt-6 text-gray-800">
                                    <p className="text-lg"><span className="font-bold">Min:</span> {min}</p>
                                    <p className="text-lg"><span className="font-bold">Max:</span> {max}</p>
                                    <p className="text-lg"><span className="font-bold">Average:</span> {avg}</p>
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
