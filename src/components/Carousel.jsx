import React, { useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { colors } from '../styles/colors';

function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const nextImage = useCallback(() => {
    setIsLoading(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setIsLoading(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    setCurrentIndex(0);
    setIsLoading(true);
  }, [images]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isPaused) {
        nextImage();
      }
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId);
  }, [isPaused, nextImage]);

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
  }, [nextImage, prevImage]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const getRawImageUrl = (url) => {
    return url.replace('github.com', 'raw.githubusercontent.com').replace('/blob', '');
  };

  return (
    <div 
      className="relative bg-gray-200 h-[70vh] mb-2 rounded-lg overflow-hidden" 
      style={{ backgroundColor: colors.background }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {images && images.length > 0 ? (
        <>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}
          <div className="h-full w-full flex transition-transform duration-500 ease-in-out" 
               style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {images.map((image, index) => (
              <img 
                key={index}
                src={getRawImageUrl(image)} 
                alt={`Dashboard image ${index + 1}`} 
                className="w-full h-full object-contain flex-shrink-0"
                onLoad={handleImageLoad}
                loading="lazy"
              />
            ))}
          </div>
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
            Image {currentIndex + 1} of {images.length}
          </div>
          <button 
            onClick={prevImage} 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
            aria-label="Previous image"
          >
            <FaChevronLeft />
          </button>
          <button 
            onClick={nextImage} 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
            aria-label="Next image"
          >
            <FaChevronRight />
          </button>
        </>
      ) : (
        <p className="text-center py-8" style={{ color: colors.textLight }}>No images available</p>
      )}
    </div>
  );
}

export default Carousel;