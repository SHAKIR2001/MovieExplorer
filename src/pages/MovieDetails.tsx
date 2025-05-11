import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { useMovies } from '../context/MovieContext';
import { MovieDetails as MovieDetailsType } from '../types';
import MovieHero from '../components/ui/MovieHero';
import CastList from '../components/ui/CastList';
import VideoSection from '../components/ui/VideoSection';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchMovieDetails, loading, error } = useMovies();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  
  useEffect(() => {
    const getMovie = async () => {
      if (id) {
        const movieData = await fetchMovieDetails(parseInt(id));
        if (movieData) {
          setMovie(movieData);
          
          // Update document title
          document.title = `${movieData.title} | MovieExplorer`;
        }
      }
    };
    
    getMovie();
    
    // Reset document title on unmount
    return () => {
      document.title = 'MovieExplorer';
    };
  }, [id, fetchMovieDetails]);
  
  if (loading && !movie) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-red-600 mb-4" size={40} />
        <p className="text-gray-600 dark:text-gray-300">Loading movie details...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-6 my-8">
        <div className="flex items-start gap-3 mb-4">
          <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" size={24} />
          <h2 className="text-xl font-semibold text-red-700 dark:text-red-300">Error Loading Movie</h2>
        </div>
        <p className="text-red-700 dark:text-red-300 ml-9">{error}</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 ml-9 flex items-center text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
        >
          <ArrowLeft size={16} className="mr-1" />
          Go Back
        </button>
      </div>
    );
  }
  
  if (!movie) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-600 dark:text-gray-300">Movie not found</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 inline-flex items-center text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
        >
          <ArrowLeft size={16} className="mr-1" />
          Go Back
        </button>
      </div>
    );
  }
  
  return (
    <div className="pb-10">
      {/* Back button (mobile only) */}
      <button 
        onClick={() => navigate(-1)}
        className="inline-flex items-center mb-4 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 sm:hidden"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back
      </button>
      
      {/* Movie hero section */}
      <MovieHero movie={movie} />
      
      <div className="container mx-auto px-4 mt-6">
        {/* Back button (desktop) */}
        <button 
          onClick={() => navigate(-1)}
          className="hidden sm:inline-flex items-center mb-6 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to results
        </button>
        
        {/* Cast list */}
        {movie.credits?.cast && movie.credits.cast.length > 0 && (
          <CastList cast={movie.credits.cast} />
        )}
        
        {/* Videos/trailers */}
        {movie.videos?.results && movie.videos.results.length > 0 && (
          <VideoSection videos={movie.videos.results} />
        )}
      </div>
    </div>
  );
};

export default MovieDetails;