import React from 'react';
import { FaChartLine } from 'react-icons/fa';
import { colors } from '../styles/colors';

function Header({ dashboards, selectedId, onSelectDashboard }) {
  return (
    <header className="bg-primary text-white p-4 flex items-center justify-between" style={{ backgroundColor: colors.primary }}>
      <div className="flex items-center">
        <FaChartLine className="text-2xl mr-2" />
        <h1 className="text-xl font-bold">EW Analytics Business Intelligence Dashboard</h1>
      </div>
      <nav className="overflow-x-auto">
        <ul className="flex space-x-2">
          {dashboards.map((dashboard) => (
            <li key={dashboard.ID}>
              <button
                className={`px-4 py-2 rounded transition-colors duration-200 ${
                  selectedId === dashboard.ID 
                    ? `bg-white text-primary` 
                    : `bg-opacity-20 hover:bg-opacity-30 bg-white text-white`
                }`}
                style={{ color: selectedId === dashboard.ID ? colors.primary : colors.white }}
                onClick={() => onSelectDashboard(dashboard.ID)}
              >
                {dashboard.ID}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;