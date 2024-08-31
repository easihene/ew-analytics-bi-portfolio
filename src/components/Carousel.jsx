import React, { useState, useEffect } from 'react';
import { colors } from '../styles/colors';

function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        prevImage();
      } else if (event.key === 'ArrowRight') {
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
    setIsLoading(true);
  }, [images]);

  const nextImage = () => {
    setIsLoading(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setIsLoading(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const getRawImageUrl = (url) => {
    return url.replace('github.com', 'raw.githubusercontent.com').replace('/blob', '');
  };

  return (
    <div className="relative bg-gray-200 h-[70vh] mb-2 rounded-lg overflow-hidden" style={{ backgroundColor: colors.background }}>
      {images && images.length > 0 ? (
        <>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}
          <img 
            src={getRawImageUrl(images[currentIndex])} 
            alt={`Dashboard image ${currentIndex + 1}`} 
            className={`w-full h-full object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={handleImageLoad}
            loading="lazy"
          />
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
            Image {currentIndex + 1} of {images.length}
          </div>
          <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors">&lt;</button>
          <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors">&gt;</button>
        </>
      ) : (
        <p className="text-center py-8" style={{ color: colors.textLight }}>No images available</p>
      )}
    </div>
  );
}

export default Carousel;