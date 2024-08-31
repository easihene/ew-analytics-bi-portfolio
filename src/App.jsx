import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboards, setSelectedId } from './store/dashboardSlice';
import Header from './components/Header';
import Carousel from './components/Carousel';
import ContentArea from './components/ContentArea';
import Footer from './components/Footer';
import { colors } from './styles/colors';

function App() {
  const dispatch = useDispatch();
  const { data: dashboards, status, selectedId } = useSelector((state) => state.dashboards);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDashboards());
    }
  }, [status, dispatch]);

  const selectedDashboard = dashboards.find(d => d.ID === selectedId);

  const handleSelectDashboard = (id) => {
    dispatch(setSelectedId(id));
  };

  if (status === 'loading') {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (status === 'failed') {
    return (
      <div className="flex items-center justify-center h-screen" style={{ color: colors.error }}>
        Error loading dashboards. Please try again later.
      </div>
    );
  }

  if (dashboards.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ color: colors.textLight }}>
        No dashboards available.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: colors.background }}>
      <Header 
        dashboards={dashboards} 
        selectedId={selectedId} 
        onSelectDashboard={handleSelectDashboard}
        isMobile={isMobile}
      />
      <main className={`flex-grow p-4 ${isMobile ? 'flex-col' : 'flex'}`}>
        {selectedDashboard && (
          <>
            <div className={`${isMobile ? 'w-full' : 'w-2/3'} pr-4`}>
              <Carousel images={selectedDashboard.URL} />
            </div>
            <div className={`${isMobile ? 'w-full mt-4' : 'w-1/3'}`}>
              <ContentArea dashboard={selectedDashboard} />
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;