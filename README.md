# MovieExplorer

A comprehensive movie discovery web application built with React and TypeScript. Browse trending movies, search for your favorites, and keep track of what you want to watch.


## Features

- **Beautiful UI with Dark/Light Mode**: Sleek, responsive design with theme toggle and persistent user preference
- **Movie Search**: Find movies by title with real-time results
- **Trending Movies**: Discover what's popular right now
- **Detailed Movie Pages**: View comprehensive information including cast, ratings, and YouTube trailers
- **Favorites System**: Save your favorite movies for easy access later
- **Advanced Filtering**: Filter movies by genre, year, and rating
- **Responsive Design**: Perfect experience on any device
- **Infinite Scroll**: Seamlessly load more search results

## Updated Features

- **User-Specific Favorites**: Each user has their own favorites list, ensuring a personalized experience.
- **Login Enforcement**: Users must log in to access and manage their favorites.


## Setup Instructions

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env.local` file in the root directory with the following variables:
   ```
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
   ```
   (Get your API keys from [TMDB](https://www.themoviedb.org/documentation/api) and [Google Cloud Console](https://console.cloud.google.com/))
4. Start the development server:
   ```
   npm run dev
   ```

## Deployment

This app can be easily deployed to services like Vercel or Netlify:

1. Build the production version:
   ```
   npm run build
   ```
2. Deploy the `dist` folder to your hosting provider
3. Make sure to set the environment variables in your hosting provider's dashboard

## Technologies Used

- **React**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **React Router**: Navigation
- **Context API**: State management
- **Lucide React**: Icons
- **Vite**: Build tool

## API Information

 This project uses the [TMDB API](https://www.themoviedb.org/documentation/api) for movie data and the <!--[YouTube API](https://developers.google.com/youtube/v3) for trailers. -->

## License

This project is licensed under the MIT License - see the LICENSE file for details.