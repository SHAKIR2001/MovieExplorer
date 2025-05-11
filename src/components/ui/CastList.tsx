import React, { useRef } from 'react';
import { Cast } from '../../types';
import { getImageUrl } from '../../services/api';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CastListProps {
  cast: Cast[];
}

const CastList: React.FC<CastListProps> = ({ cast }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
  if (!cast.length) return null;
  
  return (
    <div className="mt-8 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Cast</h2>
        
        <div className="flex space-x-2">
          <button 
            onClick={scrollLeft}
            className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={scrollRight}
            className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      <div 
        ref={sliderRef}
        className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar"
        style={{ scrollbarWidth: 'none' }}
      >
        {cast.slice(0, 15).map(person => (
          <div 
            key={person.id} 
            className="flex-none w-[120px]"
          >
            <div className="rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700">
                <img 
                  src={getImageUrl(person.profile_path, 'w185')} 
                  alt={person.name}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              
              <div className="p-2">
                <h3 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-1">
                  {person.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                  {person.character}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastList;