# 🎬 Movie Nest - Your Ultimate Movie Discovery Platform

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5+-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)](https://mui.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-1.9+-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![TMDB API](https://img.shields.io/badge/TMDB%20API-v3-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white)](https://www.themoviedb.org/)

> A modern, responsive movie discovery platform built with React, Material-UI, and powered by The Movie Database (TMDB) API. Discover movies, explore cast details, manage your watchlist, and enjoy a seamless cinematic experience with both light and dark themes.

## ✨ Features

### 🎥 **Movie Discovery & Browsing**
- **Featured Movies**: Dynamic hero section showcasing trending movies
- **Category Browsing**: Popular, Top Rated, Upcoming, and Now Playing sections
- **Genre Filtering**: Browse movies by 19+ different genres with custom icons
- **Advanced Search**: Real-time movie search with instant results
- **Pagination**: Smooth navigation through extensive movie collections
- **Responsive Grid**: Adaptive movie grid layout for all screen sizes

### 📱 **User Experience**
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Smooth Animations**: Fade-in effects, zoom transitions, and hover animations
- **Loading States**: Beautiful loading indicators and skeleton screens
- **Error Handling**: Graceful error states with user-friendly messages

### 🔐 **Authentication & User Management**
- **TMDB Authentication**: Secure OAuth integration with TMDB
- **Session Management**: Persistent login sessions with token validation
- **User Profile**: Personal profile page with user information
- **Account Integration**: Full integration with TMDB user accounts

### 📋 **Personal Movie Management**
- **Favorites**: Add/remove movies from your favorites list
- **Watchlist**: Manage your personal watchlist
- **User Lists**: View and manage your TMDB lists
- **Sync Across Devices**: Lists sync with your TMDB account

### 🎬 **Detailed Movie Information**
- **Movie Details**: Comprehensive movie information including:
  - Plot synopsis and overview
  - Release dates and runtime
  - Cast and crew information
  - Production companies
  - User ratings and reviews
  - HD poster and backdrop images
- **Video Integration**: Movie trailers and video content
- **Recommendations**: AI-powered movie recommendations
- **Genre Tags**: Visual genre indicators with custom icons

### 👥 **Actor & Cast Information**
- **Actor Profiles**: Detailed actor biographies and information
- **Filmography**: Complete list of movies by actor
- **Actor Search**: Dedicated actor search and browsing
- **Cast Details**: Full cast information for each movie

### 🎨 **Design & Interface**
- **Material Design**: Modern Material-UI components
- **Custom Theming**: Carefully crafted color schemes
- **Typography**: Roboto font family for optimal readability
- **Icon System**: Custom movie genre icons and Material icons
- **Glassmorphism**: Modern blur effects and transparency
- **Gradient Elements**: Animated gradient borders and effects

### 🔍 **Navigation & Routing**
- **Single Page Application**: Fast navigation with React Router
- **Breadcrumb Navigation**: Easy navigation tracking
- **Deep Linking**: Shareable URLs for movies, actors, and categories
- **Back Navigation**: Intuitive back button functionality

### 📊 **State Management**
- **Redux Toolkit**: Efficient state management
- **RTK Query**: Powerful data fetching and caching
- **Persistent State**: Theme and user preferences persistence
- **Optimistic Updates**: Instant UI feedback for user actions

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- TMDB API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MahyudeenShahid/Filmy-Buddy.git
   cd Filmy-Buddy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Getting TMDB API Key
1. Visit [TMDB](https://www.themoviedb.org/)
2. Create an account or sign in
3. Go to Settings > API
4. Request an API key
5. Copy your API key to the `.env` file

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 18+**: Latest React with hooks and concurrent features
- **Vite**: Lightning-fast build tool and dev server
- **JavaScript (ES6+)**: Modern JavaScript features

### **UI & Styling**
- **Material-UI (MUI) v5**: Complete UI component library
- **Material Icons**: Comprehensive icon set
- **Emotion**: CSS-in-JS styling solution
- **Responsive Design**: Mobile-first responsive layouts

### **State Management**
- **Redux Toolkit**: Modern Redux development
- **RTK Query**: Data fetching and caching
- **React-Redux**: React bindings for Redux

### **Routing & Navigation**
- **React Router v6**: Declarative routing
- **Dynamic Routing**: Parameter-based routes
- **Navigation Guards**: Route protection

### **API & Data**
- **TMDB API v3**: Movie database API
- **Axios**: HTTP client for API requests
- **RESTful Architecture**: Standard API patterns

### **Development Tools**
- **ESLint**: Code linting and formatting
- **Vite HMR**: Hot module replacement
- **Modern Build System**: Optimized production builds

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Actors/          # Actor-related components
│   ├── Footer/          # Footer component
│   ├── Movies/          # Movie listing components
│   ├── MovieInfo/       # Movie details page
│   ├── MovieList/       # Movie grid/list display
│   ├── NavBar/          # Navigation header
│   ├── Pagination/      # Pagination controls
│   ├── Profile/         # User profile page
│   ├── Search/          # Search functionality
│   ├── sideBar/         # Sidebar navigation
│   └── utils/           # Utility components
├── features/            # Redux slices
│   ├── Auth.jsx         # Authentication state
│   └── currentGenreAndCategory.jsx
├── Services/            # API services
│   └── TMBD.jsx         # TMDB API integration
├── assets/              # Static assets
│   ├── icons/           # Genre icons
│   └── images/          # App images
├── app/                 # Redux store configuration
└── main.jsx             # Application entry point
```

## 🎯 Key Components

### **Movies Component**
- Main movie listing page
- Category and genre filtering
- Search functionality
- Pagination support

### **MovieInfo Component**
- Detailed movie information
- Cast and crew details
- Recommendations
- User actions (favorite/watchlist)

### **Actors Component**
- Actor biography and details
- Filmography listing
- Actor-specific movie filtering

### **Profile Component**
- User account information
- Favorites and watchlist management
- Account settings

### **Search Component**
- Real-time movie search
- Search suggestions
- Results filtering

## 🌐 API Integration

### **TMDB API Endpoints Used**
- `/movie/popular` - Popular movies
- `/movie/top_rated` - Top rated movies
- `/movie/upcoming` - Upcoming releases
- `/discover/movie` - Movie discovery with filters
- `/search/movie` - Movie search
- `/movie/{id}` - Movie details
- `/person/{id}` - Actor details
- `/genre/movie/list` - Movie genres
- `/account/{id}/favorite` - User favorites
- `/account/{id}/watchlist` - User watchlist

### **Authentication Flow**
1. Request token from TMDB
2. Redirect to TMDB for user authorization
3. Create session with approved token
4. Store session for API requests

## 🎨 Theming & Design

### **Color Schemes**
- **Light Mode**: Blue primary colors, clean whites
- **Dark Mode**: Red accent colors, dark backgrounds
- **Adaptive**: Automatic system preference detection

### **Typography**
- **Font Family**: Roboto, sans-serif
- **Responsive Sizing**: Adaptive font sizes
- **Hierarchy**: Clear typographic hierarchy

### **Animations**
- **Page Transitions**: Smooth fade effects
- **Hover States**: Interactive button animations
- **Loading States**: Skeleton loading animations
- **Micro-interactions**: Subtle UI feedback

## 📱 Responsive Design

### **Breakpoints**
- **Mobile**: < 600px
- **Tablet**: 600px - 960px
- **Desktop**: > 960px

### **Adaptive Features**
- **Navigation**: Collapsible sidebar on mobile
- **Grid Layout**: Responsive movie grid
- **Typography**: Scalable text sizes
- **Touch Targets**: Mobile-optimized button sizes

## 🔧 Configuration

### **Environment Variables**
```env
VITE_TMDB_API_KEY=your_api_key
```

### **Build Configuration**
- **Vite Config**: Optimized for production
- **ESLint Rules**: Code quality enforcement
- **Path Aliases**: Simplified imports

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 🚀 Deployment

The application is ready for deployment on:
- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**
- **Any static hosting service**

### Deploy to Vercel
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Mahyudeen Shahid**
- 🌐 Website: [mahyudeen.me](https://mahyudeen.me)
- 💼 LinkedIn: [linkedin.com/in/mahyudeen-shahid](https://linkedin.com/in/mahyudeen-shahid)
- 🐱 GitHub: [github.com/MahyudeenShahid](https://github.com/MahyudeenShahid)
- 📧 Email: mahyudeenjutt@gmail.com

## 🙏 Acknowledgments

- **TMDB** for providing the comprehensive movie database API
- **Material-UI** for the beautiful component library
- **React Team** for the amazing framework
- **Flaticon** for the genre icons

## 🔮 Future Enhancements

- [ ] Social features and movie reviews
- [ ] Advanced filtering options
- [ ] Movie recommendation engine
- [ ] Offline support with PWA
- [ ] Multi-language support
- [ ] Enhanced mobile app experience
- [ ] Integration with streaming platforms
- [ ] Movie trailer autoplay
- [ ] Social sharing features
- [ ] Advanced search filters

---

Made with ❤️ by [Mahyudeen Shahid](https://mahyudeen.me) for movie lovers worldwide 🎬
