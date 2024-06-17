import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MarketSummary = () => {
  const [marketSummary, setMarketSummary] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMarketSummary = async () => {
      try {
        const response = await axios.get('https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo');
        const marketSummaryData = response.data;
        const feed = marketSummaryData.feed || [];

        if (feed.length > 0) {
          const firstItem = feed[0];
          setMarketSummary(firstItem.summary);
          setSentiment(firstItem.overall_sentiment_label);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching market summary:', error);
        setError('Failed to fetch market summary. Please try again later.');
        setLoading(false);
      }
    };

    fetchMarketSummary();
  }, []);

  return (
    <div className="market-summary">
      {/* <h2>Market Summary</h2> */}
      {loading ? (
        <p>Loading market summary...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="summary-content">
          <p><strong>Sentiment Indicator:</strong> <span className={sentiment.toLowerCase()}>{sentiment}</span></p>
          <p>{marketSummary}</p>
          
        </div>
      )}
    </div>
  );
};

export default MarketSummary;
