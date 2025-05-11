import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Movie, MovieDetails, MovieContextType, Genre } from '../types';
import { tmdbAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) return [];

    const savedFavorites = localStorage.getItem(`favorites_${user.username}`);
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [filters, setFiltersState] = useState({
    genre: null as number | null,
    year: null as string | null,
    rating: null as number | null,
  });

  const navigate = useNavigate();

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      localStorage.setItem(`favorites_${user.username}`, JSON.stringify(favorites));
    }
  }, [favorites]);

  // Update favorites when user logs in or logs out
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      const savedFavorites = localStorage.getItem(`favorites_${user.username}`);
      setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
    } else {
      setFavorites([]);
    }
  }, [localStorage.getItem('user')]);

  // Fetch trending movies on component mount
  useEffect(() => {
    fetchTrending();
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await tmdbAPI.get('/genre/movie/list');
      setGenres(response.data.genres);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`Failed to fetch genres: ${err.message}`);
      } else {
        setError('Failed to fetch genres');
      }
    }
  };

  const fetchTrending = async () => {
    setLoading(true);
    try {
      const response = await tmdbAPI.get('/trending/movie/day');
      setTrending(response.data.results);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`Failed to fetch trending movies: ${err.message}`);
      } else {
        setError('Failed to fetch trending movies');
      }
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (query: string, page = 1) => {
    if (!query.trim()) {
      setMovies([]);
      setSearchTerm('');
      return;
    }

    setLoading(true);
    setSearchTerm(query);

    // Store the last searched movie in local storage
    localStorage.setItem('lastSearchedMovie', query);

    try {
      let url = '/search/movie';
      const params: Record<string, string | number> = {
        query,
        page,
        include_adult: 'false',
      };

      // Add filters if they exist
      if (filters.genre) params.with_genres = filters.genre;
      if (filters.year) params.primary_release_year = filters.year;
      if (filters.rating) params.vote_average_gte = filters.rating;

      const response = await tmdbAPI.get(url, { params });

      if (page === 1) {
        setMovies(response.data.results);
      } else {
        setMovies(prev => [...prev, ...response.data.results]);
      }

      setCurrentPage(response.data.page);
      setTotalPages(response.data.total_pages);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`Search failed: ${err.message}`);
      } else {
        setError('Search failed');
      }
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieDetails = async (id: number): Promise<MovieDetails | null> => {
    setLoading(true);
    try {
      const response = await tmdbAPI.get(`/movie/${id}`, {
        params: {
          append_to_response: 'credits,videos',
        },
      });
      setError(null);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`Failed to fetch movie details: ${err.message}`);
      } else {
        setError('Failed to fetch movie details');
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (movie: Movie) => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
      // Redirect to login page if user is not logged in
      navigate('/login');
      return;
    }

    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some((fav) => fav.id === movie.id);
      if (isAlreadyFavorite) {
        return prevFavorites.filter((fav) => fav.id !== movie.id);
      } else {
        return [...prevFavorites, movie];
      }
    });
  };

  const isFavorite = (id: number): boolean => {
    return favorites.some(movie => movie.id === id);
  };

  const clearMovies = () => {
    setMovies([]);
    setSearchTerm('');
    setCurrentPage(1);
  };

  const loadMoreMovies = async () => {
    if (currentPage < totalPages && !loading && searchTerm) {
      await searchMovies(searchTerm, currentPage + 1);
    }
  };

  const setFilters = (newFilters: { genre?: number | null; year?: string | null; rating?: number | null }) => {
    setFiltersState(prev => ({
      ...prev,
      ...newFilters,
    }));
    
    // Reset to page 1 when filters change and research if we have a search term
    setCurrentPage(1);
    if (searchTerm) {
      searchMovies(searchTerm, 1);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        trending,
        favorites,
        loading,
        error,
        searchTerm,
        currentPage,
        totalPages,
        searchMovies,
        fetchTrending,
        fetchMovieDetails,
        toggleFavorite,
        isFavorite,
        clearMovies,
        loadMoreMovies,
        filters,
        setFilters,
        genres,
        fetchGenres,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = (): MovieContextType => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};