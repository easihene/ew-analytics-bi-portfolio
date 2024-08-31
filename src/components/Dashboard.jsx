// src/components/Dashboard.jsx

import React, { useState, useCallback } from 'react';
import Carousel from './Carousel';
import ContentArea from './ContentArea';
import { colors } from '../styles/colors';

function Dashboard({ dashboards }) {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleCarouselComplete = useCallback(() => {
    setCurrentTabIndex((prevIndex) => (prevIndex + 1) % dashboards.length);
  }, [dashboards.length]);

  const currentDashboard = dashboards[currentTabIndex];

  return (
    <div className="dashboard">
      <div className="tab-buttons flex space-x-2 mb-4">
        {dashboards.map((dashboard, index) => (
          <button
            key={dashboard.ID}
            onClick={() => setCurrentTabIndex(index)}
            className={`px-4 py-2 rounded transition-colors ${
              currentTabIndex === index 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            style={{ 
              backgroundColor: currentTabIndex === index ? colors.primary : colors.background,
              color: currentTabIndex === index ? colors.white : colors.text
            }}
          >
            {dashboard.ID}
          </button>
        ))}
      </div>
      
      {currentDashboard && (
        <div className="dashboard-content">
          <Carousel 
            images={currentDashboard.URL} 
            onComplete={handleCarouselComplete}
          />
          <ContentArea dashboard={currentDashboard} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;