import React, { useState, useEffect } from 'react';
import { useMovies } from '../../context/MovieContext';
import { X, Filter } from 'lucide-react';

const FilterBar: React.FC = () => {
  const { genres, filters, setFilters } = useMovies();
  const [isOpen, setIsOpen] = useState(false);
  
  // Generate years (from current year back 100 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => (currentYear - i).toString());
  
  // Ratings from 1 to 10
  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  // Close filter on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleClearFilters = () => {
    setFilters({ genre: null, year: null, rating: null });
  };
  
  // Determine if any filters are active
  const hasActiveFilters = filters.genre !== null || filters.year !== null || filters.rating !== null;
  
  return (
    <div className="mb-6">
      {/* Mobile filter toggle */}
      <div className="flex justify-between items-center md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full"
        >
          <Filter size={16} />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {(filters.genre !== null ? 1 : 0) + 
               (filters.year !== null ? 1 : 0) + 
               (filters.rating !== null ? 1 : 0)}
            </span>
          )}
        </button>
        
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-red-600 dark:text-red-400"
          >
            Clear all
          </button>
        )}
      </div>
      
      {/* Desktop filters - always visible */}
      <div className="hidden md:block">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Genre filter */}
          <div className="relative">
            <select
              value={filters.genre || ''}
              onChange={(e) => setFilters({ genre: e.target.value ? Number(e.target.value) : null })}
              className="bg-gray-100 dark:bg-gray-800 border-0 rounded-full px-4 py-2 pr-8 appearance-none cursor-pointer text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          
          {/* Year filter */}
          <div className="relative">
            <select
              value={filters.year || ''}
              onChange={(e) => setFilters({ year: e.target.value || null })}
              className="bg-gray-100 dark:bg-gray-800 border-0 rounded-full px-4 py-2 pr-8 appearance-none cursor-pointer text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">All Years</option>
              {years.slice(0, 30).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          
          {/* Rating filter */}
          <div className="relative">
            <select
              value={filters.rating || ''}
              onChange={(e) => setFilters({ rating: e.target.value ? Number(e.target.value) : null })}
              className="bg-gray-100 dark:bg-gray-800 border-0 rounded-full px-4 py-2 pr-8 appearance-none cursor-pointer text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Any Rating</option>
              {ratings.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}+ Stars
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          
          {/* Clear filters button */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-sm text-red-600 dark:text-red-400 flex items-center"
            >
              <X size={14} className="mr-1" />
              Clear filters
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile filter menu */}
      {isOpen && (
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:hidden">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Genre
              </label>
              <select
                value={filters.genre || ''}
                onChange={(e) => setFilters({ genre: e.target.value ? Number(e.target.value) : null })}
                className="w-full bg-gray-100 dark:bg-gray-700 border-0 rounded-md px-3 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Year
              </label>
              <select
                value={filters.year || ''}
                onChange={(e) => setFilters({ year: e.target.value || null })}
                className="w-full bg-gray-100 dark:bg-gray-700 border-0 rounded-md px-3 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">All Years</option>
                {years.slice(0, 30).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Rating
              </label>
              <select
                value={filters.rating || ''}
                onChange={(e) => setFilters({ rating: e.target.value ? Number(e.target.value) : null })}
                className="w-full bg-gray-100 dark:bg-gray-700 border-0 rounded-md px-3 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Any Rating</option>
                {ratings.map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}+ Stars
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-between pt-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md"
              >
                Close
              </button>
              
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 text-white bg-red-600 rounded-md"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;