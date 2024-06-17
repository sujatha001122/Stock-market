import React, { useState, useEffect } from 'react';
import axios from 'axios';


const SectorPerformance = () => {
  const [sectorPerformance, setSectorPerformance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSectorPerformance = async () => {
      try {
        const apiKey = '9jVwoLSEfpxf3IVe5ipiu01rV5GOL3Rj';
        const response = await axios.get(
          `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-01-09?adjusted=true&apiKey=${apiKey}`
        );
        const sectorData = response.data.results;

        const sectorsOfInterest = ['ATXG', 'TECH', 'CYBN','TETC','JOB','HLTH','ESNT','SEALpB','SWX','NZF'];
        const sectorPerformanceMap = new Map();

        sectorData.forEach((stock) => {
          const sector = stock.T;
          const changePercentage = ((stock.c - stock.o) / stock.o) * 100;

          if (sectorsOfInterest.includes(sector)) {
            if (sectorPerformanceMap.has(sector)) {
              const currentPerformance = sectorPerformanceMap.get(sector);
              sectorPerformanceMap.set(sector, currentPerformance + changePercentage);
            } else {
              sectorPerformanceMap.set(sector, changePercentage);
            }
          }
        });

        const processedData = Array.from(sectorPerformanceMap, ([sector, performance]) => ({
          sector,
          performance,
        }));

        processedData.sort((a, b) => b.performance - a.performance);

        setSectorPerformance(processedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sector performance:', error);
        setLoading(false);
      }
    };

    fetchSectorPerformance();
  }, []);

  return (
    <div className="sector-performance">
      <h2>Sector Performance</h2>
      <span>All Selector </span>
      {loading ? (
        <p>Loading sector performance data...</p>
      ) : (
        <ul>
          
          {sectorPerformance.map((sector, index) => (
            <li key={index} className={sector.performance >= 0 ? 'positive' : 'negative'}>
              <span>{sector.sector}</span>
              <span>{sector.performance.toFixed(2)}%</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SectorPerformance;
