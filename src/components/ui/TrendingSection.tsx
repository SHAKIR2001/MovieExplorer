import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Movie } from '../../types';
import { getImageUrl, formatDate } from '../../services/api';

interface TrendingSectionProps {
  movies: Movie[];
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ movies }) => {
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
  
  if (!movies.length) return null;
  
  return (
    <div className="my-8 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Trending Today</h2>
        
        <div className="flex space-x-2">
          <button 
            onClick={scrollLeft}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={scrollRight}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div 
        ref={sliderRef}
        className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar"
        style={{ scrollbarWidth: 'none' }}
      >
        {movies.map(movie => (
          <Link 
            key={movie.id} 
            to={`/movie/${movie.id}`}
            className="flex-none w-[260px] group"
          >
            <div className="relative overflow-hidden rounded-lg">
              <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-700">
                <img 
                  src={getImageUrl(movie.backdrop_path || movie.poster_path, 'w500')} 
                  alt={movie.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="bg-yellow-500 px-1.5 py-0.5 rounded text-xs font-bold text-gray-900 flex items-center">
                    <Star size={10} className="mr-0.5" />
                    {movie.vote_average.toFixed(1)}
                  </div>
                  <span className="text-xs text-gray-300">
                    {movie.release_date ? formatDate(movie.release_date) : 'Unknown'}
                  </span>
                </div>
                <h3 className="text-white font-medium line-clamp-1 group-hover:text-red-400 transition-colors">
                  {movie.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;