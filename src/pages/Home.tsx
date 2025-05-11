import React, { useEffect } from 'react';
import { useMovies } from '../context/MovieContext';
import TrendingSection from '../components/ui/TrendingSection';
import MovieGrid from '../components/ui/MovieGrid';
import FilterBar from '../components/ui/FilterBar';
import { AlertCircle, Loader2 } from 'lucide-react';

const Home: React.FC = () => {
  const { 
    movies, 
    trending, 
    loading, 
    error, 
    searchTerm,
    fetchTrending 
  } = useMovies();

  // Fetch trending movies if not already loaded
  useEffect(() => {
    if (trending.length === 0) {
      fetchTrending();
    }
  }, [trending.length, fetchTrending]);

  return (
    <div className="space-y-8">
      {/* Error alert */}
      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Trending section */}
      {!searchTerm && trending.length > 0 && (
        <TrendingSection movies={trending} />
      )}

      {/* Search results */}
      {searchTerm && (
        <>
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Search results for "{searchTerm}"
            </h2>
            <FilterBar />
          </div>
          
          {loading && movies.length === 0 ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-red-600" size={40} />
            </div>
          ) : (
            <MovieGrid 
              movies={movies} 
              emptyMessage={`No movies found matching "${searchTerm}"`} 
              infiniteScroll={true}
            />
          )}
        </>
      )}

      {/* Welcome section when no search or results */}
      {!searchTerm && !loading && movies.length === 0 && (
        <div className="text-center py-10 px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to MovieExplorer
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Discover new movies, search for your favorites, and keep track of what you want to watch.
            </p>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                Use the search bar above to find movies by title, or explore trending movies below.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;