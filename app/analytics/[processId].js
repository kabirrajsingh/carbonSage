"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '../../config/appConfig';

export default function AnalyticsPage() {
  const router = useRouter();
  const { processId } = router.query; // Get the processId from the URL
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    if (processId) {
      const fetchAnalytics = async () => {
        try {
          const response = await fetch(`${API_ENDPOINTS.ANALYZE_PROFILE}/${processId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const data = await response.json();
          setAnalyticsData(data);
        } catch (error) {
          console.error("Error fetching analytics data:", error);
        }
      };

      fetchAnalytics();
    }
  }, [processId]);

  if (!analyticsData) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">Analytics for Process ID: {processId}</h1>
      <pre className="bg-white p-4 rounded-lg shadow-lg overflow-x-auto">{JSON.stringify(analyticsData, null, 2)}</pre>
    </div>
  );
}
