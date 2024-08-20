// app/pages/analytics/index.js
"use client"
import { useRouter } from 'next/navigation';
import TimeSeriesGraph from '../components/TimeSeriesGraph';
const AnalyticsPage = () => {
  const router = useRouter();
  const { session_id, results } = router.query;

  // Parse results if they are available
  const profilingResults = results ? JSON.parse(decodeURIComponent(results)) : [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics for Session ID: {session_id}</h1>

      <div className="space-y-8">
        {profilingResults.length > 0 ? (
          profilingResults.map((result, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Profiling Result {index + 1}</h2>
              {Object.keys(result.profile_log).map((attribute) => (
                <div key={attribute} className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    {attribute.replace(/_/g, ' ').toUpperCase()}
                  </h3>
                  <TimeSeriesGraph data={result.profile_log} attribute={attribute} />
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No profiling results available.</p>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;
