import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SelectedSymbolContext } from './SelectedSymbolContext';

const MarketsOverview = () => {
  const { setSelectedSymbol } = useContext(SelectedSymbolContext);
  const [marketData, setMarketData] = useState({});
  const [loading, setLoading] = useState(true);
  const apiKey = 'demo';

  useEffect(() => {
    const symbols = ['IBM', 'TSCO.LON','MSFT'];

    const fetchMarketData = async () => {
      try {
        const data = {};
        for (const symbol of symbols) {
          const response = await axios.get(
            `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`
          );
          const timeSeries = response.data['Weekly Adjusted Time Series'];
          if (!timeSeries) {
            throw new Error(`No data found for symbol: ${symbol}`);
          }
          const latestDate = Object.keys(timeSeries)[0];
          const latestData = timeSeries[latestDate];

          const price = parseFloat(latestData['4. close']);
          const previousPrice = parseFloat(timeSeries[Object.keys(timeSeries)[1]]['4. close']);
          const change = price - previousPrice;
          const changePercent = (change / previousPrice) * 100;

          data[symbol] = {
            price,
            change,
            changePercent,
          };
        }

        const sortedMarketData = Object.keys(data).sort((a, b) => {
          return data[b].changePercent - data[a].changePercent; 
        }).reduce((obj, key) => {
          obj[key] = data[key];
          return obj;
        }, {});

        setMarketData(sortedMarketData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching market data:', error);
        setLoading(false);
      }
    };

    fetchMarketData();
  }, [apiKey]); // Ensure apiKey is included as dependency if it changes

  const handleRowClick = (symbol) => {
    setSelectedSymbol(symbol);
  };

  return (
    <div className="markets-overview">
      <h2>Markets Overview</h2>
      {loading ? (
        <p>Loading market data...</p>
      ) : (
        <table>
          <tbody>
            {Object.keys(marketData).map(symbol => (
              <tr key={symbol} onClick={() => handleRowClick(symbol)} className={marketData[symbol].change >= 0 ? 'positive' : 'negative'}>
                <td>{symbol}</td>
                <td>${marketData[symbol].price.toFixed(2)}</td>
                <td>${marketData[symbol].change.toFixed(2)}</td>
                <td>{marketData[symbol].changePercent.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MarketsOverview;
