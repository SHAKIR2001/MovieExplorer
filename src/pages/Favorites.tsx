import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovies } from '../context/MovieContext';
import MovieGrid from '../components/ui/MovieGrid';
import { Heart } from 'lucide-react';

const Favorites: React.FC = () => {
  const { favorites } = useMovies();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (!user) {
    const navigate = useNavigate();
    useEffect(() => {
      navigate('/login');
    }, [navigate]);
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Favorites</h1>
        <Heart className="text-red-600" size={24} />
      </div>
      
      {favorites.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center my-10">
          <Heart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No favorites yet</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Start exploring movies and click the heart icon to add them to your favorites. They'll appear here for easy access.
          </p>
        </div>
      ) : (
        <MovieGrid 
          movies={favorites} 
          title={`${favorites.length} ${favorites.length === 1 ? 'Movie' : 'Movies'}`}
        />
      )}
    </div>
  );
};

export default Favorites;