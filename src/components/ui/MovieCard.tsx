import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { Movie } from '../../types';
import { getImageUrl } from '../../services/api';
import { useMovies } from '../../context/MovieContext';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { toggleFavorite, isFavorite } = useMovies();
  const favorited = isFavorite(movie.id);
  
  // Format release year
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown';
  
  // Format rating to one decimal place
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
      <Link to={`/movie/${movie.id}`} className="block h-full">
        <div className="relative aspect-[2/3] bg-gray-200 dark:bg-gray-700">
          <img 
            src={getImageUrl(movie.poster_path, 'w500')} 
            alt={movie.title}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <p className="text-white text-sm line-clamp-3">{movie.overview}</p>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{movie.title}</h3>
            <div className="flex items-center ml-2 bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded-full">
              <Star size={14} className="text-yellow-500 mr-1" />
              <span className="text-xs font-medium text-gray-800 dark:text-yellow-100">{rating}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{releaseYear}</p>
        </div>
      </Link>
      
      {/* Favorite button */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(movie);
        }}
        className={`absolute top-2 right-2 p-2 rounded-full ${
          favorited 
            ? 'bg-red-500 text-white' 
            : 'bg-black/40 text-white hover:bg-red-500'
        } transition-colors duration-200`}
        aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart size={16} fill={favorited ? 'white' : 'none'} />
      </button>
    </div>
  );
};

export default MovieCard;