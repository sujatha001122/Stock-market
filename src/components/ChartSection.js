import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import { Chart as ChartJS, LinearScale, LineController, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { SelectedSymbolContext } from './SelectedSymbolContext';

ChartJS.register(
  LinearScale,
  LineController,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartSection = () => {
  const { selectedSymbol } = useContext(SelectedSymbolContext);
  const [chartData, setChartData] = useState({});
  const chartRef = useRef();

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${selectedSymbol}&apikey=demo`
        );
        const data = response.data['Weekly Adjusted Time Series'];

        if (!data) {
          throw new Error('No data found in the API response');
        }

        const processedData = {
          labels: Object.keys(data).map((date) => new Date(date)),
          datasets: [
            {
              label: `${selectedSymbol} Prices`,
              data: Object.values(data).map((item) => parseFloat(item['4. close'])),
              borderColor: 'rgba(75,192,192,1)',
              fill: false,
            },
          ],
        };

        setChartData(processedData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, [selectedSymbol]);

  useEffect(() => {
    if (chartRef.current && chartRef.current.chartInstance) {
      chartRef.current.chartInstance.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (ctx && chartData.labels && chartData.datasets) {
      chartRef.current.chartInstance = new ChartJS(ctx, {
        type: 'line',
        data: chartData,
        options: {
          scales: {
            x: {
              type: 'linear', 
              title: {
                display: true,
                text: 'Date',
              },
            },
            y: {
              type: 'linear',
              title: {
                display: true,
                text: 'Price',
              },
            },
          },
        },
      });
    }
  }, [chartData]);

  return (
    <div className='chart'>
      <h2>Market Chart for {selectedSymbol}</h2>
      <canvas  ref={chartRef} ></canvas>
    </div>
  );
};

export default ChartSection;
