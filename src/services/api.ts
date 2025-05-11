import axios from 'axios';

// Create an Axios instance with base configuration
export const tmdbAPI = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'en-US',
  },
});

// Image URLs - various sizes for responsive design
export const imgBaseUrl = 'https://image.tmdb.org/t/p';

export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '/img/no-image.png';
  return `${imgBaseUrl}/${size}${path}`;
};

// Format date to more readable format
export const formatDate = (date: string): string => {
  if (!date) return 'Unknown';
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
};

// Format runtime from minutes to hours and minutes
export const formatRuntime = (minutes: number): string => {
  if (!minutes) return 'Unknown';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

// Format large numbers with commas
export const formatCurrency = (amount: number): string => {
  if (!amount) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};