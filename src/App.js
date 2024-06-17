import React, { useState } from 'react';
import Header from './components/Header';
import MarketSummary from './components/MarketSummary';
import SectorPerformance from './components/SectorPerformance';
import MarketsOverview from './components/MarketsOverview';
import ChartSection from './components/ChartSection';
import { SelectedSymbolProvider } from './components/SelectedSymbolContext';

import './App.css';


const App = () => {
  return (
    <SelectedSymbolProvider>
      <div className="app">
        <Header />
        <div className="main-content">
          <div className='overview'>
          <MarketSummary />
          <SectorPerformance />
          </div>
          <div className='market-section'>
          <MarketsOverview />
          <ChartSection />
          </div>
        </div>
      </div>
    </SelectedSymbolProvider>
  );
};

export default App;
