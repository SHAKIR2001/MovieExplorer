import React from 'react';
import { Star, Clock, Calendar, Heart } from 'lucide-react';
import { MovieDetails } from '../../types';
import { getImageUrl, formatDate, formatRuntime, formatCurrency } from '../../services/api';
import { useMovies } from '../../context/MovieContext';

interface MovieHeroProps {
  movie: MovieDetails;
}

const MovieHero: React.FC<MovieHeroProps> = ({ movie }) => {
  const { toggleFavorite, isFavorite } = useMovies();
  const favorited = isFavorite(movie.id);
  
  return (
    <div className="relative">
      {/* Backdrop image */}
      <div className="hidden sm:block absolute inset-0 bg-black">
        {movie.backdrop_path && (
          <div className="relative h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20"></div>
            <img 
              src={getImageUrl(movie.backdrop_path, 'original')} 
              alt=""
              className="w-full h-full object-cover opacity-40"
            />
          </div>
        )}
      </div>
      
      <div className="relative container mx-auto px-4 py-6 sm:py-16 flex flex-col sm:flex-row gap-6">
        {/* Poster */}
        <div className="flex-none w-full max-w-[300px] mx-auto sm:w-1/3 sm:max-w-[280px]">
          <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
            <img 
              src={getImageUrl(movie.poster_path, 'w500')} 
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Movie info */}
        <div className="flex-grow">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white sm:text-white">
              {movie.title}
            </h1>
            
            {movie.tagline && (
              <p className="mt-2 text-lg italic text-gray-600 dark:text-gray-300 sm:text-gray-300">
                "{movie.tagline}"
              </p>
            )}
            
            {/* Genres */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
              {movie.genres.map(genre => (
                <span 
                  key={genre.id}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-800 sm:bg-white/20 text-gray-800 dark:text-gray-200 sm:text-white rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            
            {/* Movie stats */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex flex-col items-center sm:items-start gap-1">
                <div className="flex items-center text-yellow-500">
                  <Star size={18} className="mr-1" />
                  <span className="font-bold">{movie.vote_average.toFixed(1)}</span>
                  <span className="text-gray-600 dark:text-gray-400 sm:text-gray-300 text-sm ml-1">/10</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 sm:text-gray-300">Rating</span>
              </div>
              
              <div className="flex flex-col items-center sm:items-start gap-1">
                <div className="flex items-center text-gray-700 dark:text-gray-200 sm:text-white">
                  <Clock size={18} className="mr-1" />
                  <span className="font-medium">{formatRuntime(movie.runtime)}</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 sm:text-gray-300">Runtime</span>
              </div>
              
              <div className="flex flex-col items-center sm:items-start gap-1">
                <div className="flex items-center text-gray-700 dark:text-gray-200 sm:text-white">
                  <Calendar size={18} className="mr-1" />
                  <span className="font-medium">{movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown'}</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 sm:text-gray-300">Release</span>
              </div>
              
              <div className="flex flex-col items-center sm:items-start gap-1">
                <button 
                  onClick={() => toggleFavorite(movie)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                    favorited 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-800 sm:bg-white/20 text-gray-800 dark:text-gray-200 sm:text-white hover:bg-red-600 hover:text-white'
                  } transition-colors`}
                >
                  <Heart size={16} fill={favorited ? 'white' : 'none'} />
                  {favorited ? 'Favorited' : 'Add to Favorites'}
                </button>
              </div>
            </div>
            
            {/* Overview */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white sm:text-white mb-2">Overview</h3>
              <p className="text-gray-700 dark:text-gray-300 sm:text-gray-200 leading-relaxed">
                {movie.overview || 'No overview available.'}
              </p>
            </div>
            
            {/* Additional details */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {movie.status && (
                <div className="sm:col-span-1">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white sm:text-white">Status</h4>
                  <p className="text-gray-700 dark:text-gray-300 sm:text-gray-200">{movie.status}</p>
                </div>
              )}
              
              {movie.budget > 0 && (
                <div className="sm:col-span-1">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white sm:text-white">Budget</h4>
                  <p className="text-gray-700 dark:text-gray-300 sm:text-gray-200">{formatCurrency(movie.budget)}</p>
                </div>
              )}
              
              {movie.revenue > 0 && (
                <div className="sm:col-span-1">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white sm:text-white">Revenue</h4>
                  <p className="text-gray-700 dark:text-gray-300 sm:text-gray-200">{formatCurrency(movie.revenue)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHero;