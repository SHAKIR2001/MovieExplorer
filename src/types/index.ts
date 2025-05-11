export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  overview: string;
  genre_ids?: number[];
  genres?: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface MovieDetails extends Movie {
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  tagline: string | null;
  homepage: string | null;
  genres: Genre[];
  credits?: {
    cast: Cast[];
    crew: Crew[];
  };
  videos?: {
    results: Video[];
  };
}

export interface MovieSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieContextType {
  movies: Movie[];
  trending: Movie[];
  favorites: Movie[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  searchMovies: (query: string, page?: number) => Promise<void>;
  fetchTrending: () => Promise<void>;
  fetchMovieDetails: (id: number) => Promise<MovieDetails | null>;
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
  clearMovies: () => void;
  loadMoreMovies: () => Promise<void>;
  filters: {
    genre: number | null;
    year: string | null;
    rating: number | null;
  };
  setFilters: (filters: { genre?: number | null; year?: string | null; rating?: number | null }) => void;
  genres: Genre[];
  fetchGenres: () => Promise<void>;
}

export interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}