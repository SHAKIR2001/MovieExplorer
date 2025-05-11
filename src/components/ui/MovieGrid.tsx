import React, { useRef, useCallback, useEffect } from 'react';
import { Movie } from '../../types';
import MovieCard from './MovieCard';
import { Loader2 } from 'lucide-react';
import { useMovies } from '../../context/MovieContext';

interface MovieGridProps {
  movies: Movie[];
  title?: string;
  emptyMessage?: string;
  infiniteScroll?: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({ 
  movies, 
  title, 
  emptyMessage = 'No movies found', 
  infiniteScroll = false 
}) => {
  const { loading, loadMoreMovies, currentPage, totalPages } = useMovies();
  
  // Reference for the observer element
  const observerRef = useRef<HTMLDivElement>(null);
  
  // Setup intersection observer for infinite scroll
  const lastMovieRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && currentPage < totalPages) {
        loadMoreMovies();
      }
    }, { threshold: 0.5 });
    
    if (node) observer.observe(node);
    
    return () => {
      if (node) observer.disconnect();
    };
  }, [loading, currentPage, totalPages, loadMoreMovies]);
  
  if (movies.length === 0 && !loading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {movies.map((movie, index) => (
          <div 
            key={`${movie.id}-${index}`} 
            ref={infiniteScroll && index === movies.length - 2 ? lastMovieRef : null}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
      
      {/* Loading indicator for infinite scroll */}
      {infiniteScroll && loading && (
        <div 
          className="flex justify-center py-6" 
          ref={observerRef}
        >
          <Loader2 className="animate-spin text-red-600" size={30} />
        </div>
      )}
      
      {/* Load more button (alternative to infinite scroll) */}
      {!infiniteScroll && currentPage < totalPages && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMoreMovies}
            disabled={loading}
            className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={16} />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieGrid;