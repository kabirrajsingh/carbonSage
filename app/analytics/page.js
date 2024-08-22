"use client";
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

import TimeSeriesGraph from '../components/TimeSeriesGraph';



const AnalyticsPage = () => {
  const data={
    "function_profile_map": {
        "4247": [
            {
                "cpu_percent": "0.0",
                "iteration": "20",
                "pageins": "164",
                "pfaults": "2112",
                "rss": "24117248",
                "time": "2024-08-22 09:49:43",
                "vms": "420472832000"
            }
        ],
        "9412": [
            {
                "cpu_percent": "0.0",
                "iteration": "20",
                "pageins": "164",
                "pfaults": "2112",
                "rss": "24117248",
                "time": "2024-08-22 09:49:43",
                "vms": "420472832000"
            }
        ],
        "9996": [
            {
                "cpu_percent": "0.0",
                "iteration": "20",
                "pageins": "164",
                "pfaults": "2112",
                "rss": "24117248",
                "time": "2024-08-22 09:49:43",
                "vms": "420472832000"
            }
        ],
        "13634": [
            {
                "cpu_percent": "0.0",
                "iteration": "20",
                "pageins": "164",
                "pfaults": "2112",
                "rss": "24117248",
                "time": "2024-08-22 09:49:43",
                "vms": "420472832000"
            }
        ],
        "17049": [
            {
                "cpu_percent": "6.0",
                "iteration": "0",
                "pageins": "164",
                "pfaults": "2098",
                "rss": "23887872",
                "time": "2024-08-22 09:49:23",
                "vms": "420444520448"
            }
        ],
        "19055": [
            {
                "cpu_percent": "0.0",
                "iteration": "20",
                "pageins": "164",
                "pfaults": "2112",
                "rss": "24117248",
                "time": "2024-08-22 09:49:43",
                "vms": "420472832000"
            }
        ],
        "19555": [
            {
                "cpu_percent": "6.0",
                "iteration": "0",
                "pageins": "164",
                "pfaults": "2098",
                "rss": "23887872",
                "time": "2024-08-22 09:49:23",
                "vms": "420444520448"
            },
            {
                "cpu_percent": "0.1",
                "iteration": "1",
                "pageins": "164",
                "pfaults": "2102",
                "rss": "23953408",
                "time": "2024-08-22 09:49:24",
                "vms": "420453957632"
            },
            {
                "cpu_percent": "0.0",
                "iteration": "2",
                "pageins": "164",
                "pfaults": "2104",
                "rss": "23986176",
                "time": "2024-08-22 09:49:25",
                "vms": "420455006208"
            },
            {
                "cpu_percent": "0.0",
                "iteration": "3",
                "pageins": "164",
                "pfaults": "2106",
                "rss": "24018944",
                "time": "2024-08-22 09:49:26",
                "vms": "420463394816"
            },
            {
                "cpu_percent": "0.0",
                "iteration": "4",
                "pageins": "164",
                "pfaults": "2106",
                "rss": "24018944",
                "time": "2024-08-22 09:49:27",
                "vms": "420463394816"
            },
            {
                "cpu_percent": "0.0",
                "iteration": "5",
                "pageins": "164",
                "pfaults": "2106",
                "rss": "24018944",
                "time": "2024-08-22 09:49:28",
                "vms": "420463394816"
            },
            {
                "cpu_percent": "0.0",
                "iteration": "6",
                "pageins": "164",
                "pfaults": "2106",
                "rss": "24018944",
                "time": "2024-08-22 09:49:29",
                "vms": "420463394816"
            },
            {
                "cpu_percent": "0.0",
                "iteration": "7",
                "pageins": "164",
                "pfaults": "2107",
                "rss": "24035328",
                "time": "2024-08-22 09:49:30",
                "vms": "420463394816"
            },
            {
                "cpu_percent": "0.0",
                "iteration": "8",
                "pageins": "164",
                "pfaults": "2107",
                "rss": "24035328",
                "time": "2024-08-22 09:49:31",
                "vms": "420463394816"
            },
            {
                "cpu_percent": "0.0",
                "iteration": "9",
                "pageins": "164",
                "pfaults": "2107",
                "rss": "24035328",
                "time": "2024-08-22 09:49:32",
                "vms": "420463394816"
            },
            {
                "cpu_percent": "0.0",
                "iteration": "10",
                "pageins": "164",
                "pfaults": "2107",
                "rss": "24035328",
                "time": "2024-08-22 09:49:33",
                "vms": "420463394816"
            }
        ],
        "41611": [
            {
                "cpu_percent": "0.0",
                "iteration": "10",
                "pageins": "164",
                "pfaults": "2107",
                "rss": "24035328",
                "time": "2024-08-22 09:49:33",
                "vms": "420463394816"
            },
            {
                "cpu_percent": "0.1",
                "iteration": "11",
                "pageins": "164",
                "pfaults": "2107",
                "rss": "24035328",
                "time": "2024-08-22 09:49:34",
                "vms": "420463394816"
            },
            {
                "cpu_percent": "0.0",
                "iteration": "12",
                "pageins": "164",
                "pfaults": "2109",
                "rss": "24068096",
                "time": "2024-08-22 09:49:35",
                "vms": "420464443392"
            },
            {
                "cpu_percent": "0.0",
                "iteration": "13",
                "pageins": "164",
                "pfaults": "2111",
                "rss": "24100864",
                "time": "2024-08-22 09:49:36",
                "vms": "420472832000"
            },
            {
                "cpu_percent": "0.0",
                "iteration": "14",
                "pageins": "164",
                "pfaults": "2111",
                "rss": "24100864",
                "time": "2024-08-22 09:49:37",
                "vms": "420472832000"
            },
            {
                "cpu_percent": "0.0",
                "iteration": "15",
                "pageins": "164",
                "pfaults": "2111",
                "rss": "24100864",
                "time": "2024-08-22 09:49:38",
                "vms": "420472832000"
            },
            {
                "cpu_percent": "0.0",
                "iteration": "16",
                "pageins": "164",
                "pfaults": "2111",
                "rss": "24100864",
                "time": "2024-08-22 09:49:39",
                "vms": "420472832000"
            },
            {
                "cpu_percent": "0.0",
                "iteration": "17",
                "pageins": "164",
                "pfaults": "2111",
                "rss": "24100864",
                "time": "2024-08-22 09:49:40",
                "vms": "420472832000"
            },
            {
                "cpu_percent": "0.0",
                "iteration": "18",
                "pageins": "164",
                "pfaults": "2112",
                "rss": "24117248",
                "time": "2024-08-22 09:49:41",
                "vms": "420472832000"
            },
            {
                "cpu_percent": "0.0",
                "iteration": "19",
                "pageins": "164",
                "pfaults": "2112",
                "rss": "24117248",
                "time": "2024-08-22 09:49:42",
                "vms": "420472832000"
            },
            {
                "cpu_percent": "0.0",
                "iteration": "20",
                "pageins": "164",
                "pfaults": "2112",
                "rss": "24117248",
                "time": "2024-08-22 09:49:43",
                "vms": "420472832000"
            }
        ]
    },
    "profiletime_to_function": {
        "2024-08-22 09:49:23": {
            "function_id": "19555",
            "profile_log": {
                "cpu_percent": "6.0",
                "iteration": "0",
                "pageins": "164",
                "pfaults": "2098",
                "rss": "23887872",
                "time": "2024-08-22 09:49:23",
                "vms": "420444520448"
            }
        },
        "2024-08-22 09:49:24": {
            "function_id": "19555",
            "profile_log": {
                "cpu_percent": "0.1",
                "iteration": "1",
                "pageins": "164",
                "pfaults": "2102",
                "rss": "23953408",
                "time": "2024-08-22 09:49:24",
                "vms": "420453957632"
            }
        },
        "2024-08-22 09:49:25": {
            "function_id": "19555",
            "profile_log": {
                "cpu_percent": "0.0",
                "iteration": "2",
                "pageins": "164",
                "pfaults": "2104",
                "rss": "23986176",
                "time": "2024-08-22 09:49:25",
                "vms": "420455006208"
            }
        },
        "2024-08-22 09:49:26": {
            "function_id": "19555",
            "profile_log": {
                "cpu_percent": "0.0",
                "iteration": "3",
                "pageins": "164",
                "pfaults": "2106",
                "rss": "24018944",
                "time": "2024-08-22 09:49:26",
                "vms": "420463394816"
            }
        },
        "2024-08-22 09:49:27": {
            "function_id": "19555",
            "profile_log": {
                "cpu_percent": "0.0",
                "iteration": "4",
                "pageins": "164",
                "pfaults": "2106",
                "rss": "24018944",
                "time": "2024-08-22 09:49:27",
                "vms": "420463394816"
            }
        },
        "2024-08-22 09:49:28": {
            "function_id": "19555",
            "profile_log": {
                "cpu_percent": "0.0",
                "iteration": "5",
                "pageins": "164",
                "pfaults": "2106",
                "rss": "24018944",
                "time": "2024-08-22 09:49:28",
                "vms": "420463394816"
            }
        },
        "2024-08-22 09:49:29": {
            "function_id": "19555",
            "profile_log": {
                "cpu_percent": "0.0",
                "iteration": "6",
                "pageins": "164",
                "pfaults": "2106",
                "rss": "24018944",
                "time": "2024-08-22 09:49:29",
                "vms": "420463394816"
            }
        },
        "2024-08-22 09:49:30": {
            "function_id": "19555",
            "profile_log": {
                "cpu_percent": "0.0",
                "iteration": "7",
                "pageins": "164",
                "pfaults": "2107",
                "rss": "24035328",
                "time": "2024-08-22 09:49:30",
                "vms": "420463394816"
            }
        },
        "2024-08-22 09:49:31": {
            "function_id": "19555",
            "profile_log": {
                "cpu_percent": "0.0",
                "iteration": "8",
                "pageins": "164",
                "pfaults": "2107",
                "rss": "24035328",
                "time": "2024-08-22 09:49:31",
                "vms": "420463394816"
            }
        },
        "2024-08-22 09:49:32": {
            "function_id": "19555",
            "profile_log": {
                "cpu_percent": "0.0",
                "iteration": "9",
                "pageins": "164",
                "pfaults": "2107",
                "rss": "24035328",
                "time": "2024-08-22 09:49:32",
                "vms": "420463394816"
            }
        },
        "2024-08-22 09:49:33": {
            "function_id": "41611",
            "profile_log": {
                "cpu_percent": "0.0",
                "iteration": "10",
                "pageins": "164",
                "pfaults": "2107",
                "rss": "24035328",
                "time": "2024-08-22 09:49:33",
                "vms": "420463394816"
            }
        },
        "2024-08-22 09:49:34": {
            "function_id": "41611",
            "profile_log": {
                "cpu_percent": "0.1",
                "iteration": "11",
                "pageins": "164",
                "pfaults": "2107",
                "rss": "24035328",
                "time": "2024-08-22 09:49:34",
                "vms": "420463394816"
            }
        },
        "2024-08-22 09:49:35": {
            "function_id": "41611",
            "profile_log": {
                "cpu_percent": "0.0",
                "iteration": "12",
                "pageins": "164",
                "pfaults": "2109",
                "rss": "24068096",
                "time": "2024-08-22 09:49:35",
                "vms": "420464443392"
            }
        },
        "2024-08-22 09:49:36": {
            "function_id": "41611",
            "profile_log": {
                "cpu_percent": "0.0",
                "iteration": "13",
                "pageins": "164",
                "pfaults": "2111",
                "rss": "24100864",
                "time": "2024-08-22 09:49:36",
                "vms": "420472832000"
            }
        },
        "2024-08-22 09:49:37": {
            "function_id": "41611",
            "profile_log": {
                "cpu_percent": "0.0",
                "iteration": "14",
                "pageins": "164",
                "pfaults": "2111",
                "rss": "24100864",
                "time": "2024-08-22 09:49:37",
                "vms": "420472832000"
            }
        },
        "2024-08-22 09:49:38": {
            "function_id": "41611",
            "profile_log": {
                "cpu_percent": "0.0",
                "iteration": "15",
                "pageins": "164",
                "pfaults": "2111",
                "rss": "24100864",
                "time": "2024-08-22 09:49:38",
                "vms": "420472832000"
            }
        },
        "2024-08-22 09:49:39": {
            "function_id": "41611",
            "profile_log": {
                "cpu_percent": "0.0",
                "iteration": "16",
                "pageins": "164",
                "pfaults": "2111",
                "rss": "24100864",
                "time": "2024-08-22 09:49:39",
                "vms": "420472832000"
            }
        },
        "2024-08-22 09:49:40": {
            "function_id": "41611",
            "profile_log": {
                "cpu_percent": "0.0",
                "iteration": "17",
                "pageins": "164",
                "pfaults": "2111",
                "rss": "24100864",
                "time": "2024-08-22 09:49:40",
                "vms": "420472832000"
            }
        },
        "2024-08-22 09:49:41": {
            "function_id": "41611",
            "profile_log": {
                "cpu_percent": "0.0",
                "iteration": "18",
                "pageins": "164",
                "pfaults": "2112",
                "rss": "24117248",
                "time": "2024-08-22 09:49:41",
                "vms": "420472832000"
            }
        },
        "2024-08-22 09:49:42": {
            "function_id": "41611",
            "profile_log": {
                "cpu_percent": "0.0",
                "iteration": "19",
                "pageins": "164",
                "pfaults": "2112",
                "rss": "24117248",
                "time": "2024-08-22 09:49:42",
                "vms": "420472832000"
            }
        },
        "2024-08-22 09:49:43": {
            "function_id": "4247",
            "profile_log": {
                "cpu_percent": "0.0",
                "iteration": "20",
                "pageins": "164",
                "pfaults": "2112",
                "rss": "24117248",
                "time": "2024-08-22 09:49:43",
                "vms": "420472832000"
            }
        }
    }
  }
    
  const hash_to_line={
    "4247": [
      23,
      26,
      "../target_projects/proj1/lib2.py"
    ],
    "9412": [
      28,
      30,
      "../target_projects/proj1/lib2.py"
    ],
    "9996": [
      49,
      54,
      "../target_projects/proj1/lib1.py"
    ],
    "13634": [
      3,
      10,
      "../target_projects/proj1/lib2.py"
    ],
    "17049": [
      4,
      14,
      "../target_projects/proj1/lib1.py"
    ],
    "19055": [
      12,
      21,
      "../target_projects/proj1/lib2.py"
    ],
    "19555": [
      16,
      26,
      "../target_projects/proj1/lib1.py"
    ],
    "41611": [
      28,
      47,
      "../target_projects/proj1/lib1.py"
    ]
  }
  // const [timeSeriesData, setTimeSeriesData] = useState({});
  const attributes = ['cpu_percent', 'iteration', 'pageins', 'pfaults', 'rss', 'vms'];
  const timeSeriesData = data.profiletime_to_function;
  const timestamps = Object.keys(timeSeriesData);
  
  const getTimeRange = () => {
    if (timestamps.length === 0) return { start: '-', end: '-' };
    const start = format(new Date(timestamps[0]), 'MMM dd, yyyy HH:mm:ss');
    const end = format(new Date(timestamps[timestamps.length - 1]), 'MMM dd, yyyy HH:mm:ss');
    return { start, end };
  };

  const getSummaryStats = (attribute) => {
    const values = timestamps.map(timestamp => parseFloat(timeSeriesData[timestamp].profile_log[attribute]) || 0);
    const min = Math.min(...values).toFixed(2);
    const max = Math.max(...values).toFixed(2);
    const avg = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
    return { min, max, avg };
  };

  const { start, end } = getTimeRange();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Analytics Page for Process ID</h1>
      <p className="text-lg mb-4 text-gray-600">Data from: <span className="font-medium text-gray-900">{start}</span> to <span className="font-medium text-gray-900">{end}</span></p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {attributes.map(attribute => {
          const { min, max, avg } = getSummaryStats(attribute);
          return (
            <div key={attribute} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 capitalize text-gray-700">{attribute.replace('_', ' ')}</h2>
              <TimeSeriesGraph data={timeSeriesData} attribute={attribute} />
              <div className="mt-4 text-gray-800">
                <p><span className="font-medium">Min:</span> {min}</p>
                <p><span className="font-medium">Max:</span> {max}</p>
                <p><span className="font-medium">Average:</span> {avg}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnalyticsPage;
