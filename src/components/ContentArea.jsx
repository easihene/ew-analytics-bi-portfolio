import React from 'react';
import { FaChartBar, FaTag } from 'react-icons/fa';
import { colors } from '../styles/colors';

function ContentArea({ dashboard }) {
  if (!dashboard) {
    return <p className="text-center py-2" style={{ color: colors.textLight }}>Please select a dashboard to view details</p>;
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-4 fade-in" style={{ backgroundColor: colors.white }}>
      <h2 className="text-lg mb-2 flex items-center" style={{ color: colors.text }}>
        <FaChartBar className="mr-2" style={{ color: colors.primary }} />
        <span className="font-semibold">{dashboard['Business Area']}:</span>
        <span className="ml-2 font-normal">{dashboard.Title}</span>
      </h2>
      <div className="flex items-start mt-2">
        <FaTag className="mr-2 mt-1 flex-shrink-0" style={{ color: colors.primary }} />
        <p className="text-sm" style={{ color: colors.textLight }}>{dashboard.Description}</p>
      </div>
    </div>
  );
}

export default ContentArea;