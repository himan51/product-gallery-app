# Product Gallery App

A modern, responsive e-commerce product gallery built with React.js featuring debounced search, infinite scrolling, lazy loading images, and dark/light theme support.

## 🚀 Features

### Core Features
- **Debounced Search**: Optimized search functionality with 300ms debounce to reduce API calls
- **Infinite Scrolling**: Smooth product loading using IntersectionObserver API
- **Lazy Loading Images**: Images load only when entering the viewport for better performance
- **Global Theme Management**: Light/Dark mode toggle with localStorage persistence
- **Error Handling**: Comprehensive error handling with retry mechanism
- **Responsive Design**: Mobile-first design that works on all screen sizes

### Technical Features
- **React 18.3.1** with modern hooks (useState, useEffect, useContext)
- **Axios 1.7.9** for API requests
- **TailwindCSS 3.4.17** for styling
- **React LazyLoad 3.2.1** for image lazy loading
- **Custom useDebounce hook** for search optimization
- **Context API** for global state management

## 🛠️ Tech Stack

- **Frontend**: React.js 18.3.1
- **HTTP Client**: Axios 1.7.9
- **Styling**: TailwindCSS 3.4.17
- **Image Loading**: React LazyLoad 3.2.1
- **State Management**: React Context API + Hooks
- **Build Tool**: Create React App

## 📁 Project Structure

```
src/
├── components/
│   ├── SearchBar.js          # Search bar with theme toggle
│   ├── ProductList.js        # Product grid with infinite scroll
│   └── ProductCard.js        # Individual product card with lazy loading
├── hooks/
│   └── useDebounce.js        # Custom debounce hook
├── context/
│   └── ThemeContext.js       # Theme management context
├── pages/
│   └── Home.js               # Main home page
├── App.js                    # Root component
├── index.js                  # Entry point
└── index.css                 # Global styles with Tailwind
```

## 🔗 API Integration

The app uses the [Fake Store API](https://fakestoreapi.com/) for product data:

- **Get All Products**: `https://fakestoreapi.com/products`
- **Get Single Product**: `https://fakestoreapi.com/products/{id}`

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd product-gallery-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 🎨 UI/UX Features

### Header Section
- **Search Bar**: Real-time product search with debouncing
- **Theme Toggle**: Switch between light and dark modes
- **Loading Indicator**: Visual feedback during search operations

### Product Grid
- **Responsive Layout**: 3-column grid on desktop, 2-column on tablet, 1-column on mobile
- **Product Cards**: Clean design with lazy-loaded images
- **Category Badges**: Visual category indicators
- **Star Ratings**: Interactive rating display
- **Price Formatting**: Proper currency formatting

### Performance Optimizations
- **Debounced Search**: Prevents excessive API calls
- **Lazy Loading**: Images load only when visible
- **Infinite Scroll**: Smooth pagination without page reloads
- **Error Boundaries**: Graceful error handling with retry options

## 🌙 Theme Management

The app supports both light and dark themes:
- **Auto-detection**: Respects system preference on first visit
- **Manual Toggle**: Users can switch themes manually
- **Persistence**: Theme preference saved in localStorage
- **Smooth Transitions**: CSS transitions for theme changes

## 🔍 Search Functionality

- **Real-time Search**: Search across product titles, descriptions, and categories
- **Debounced Input**: 300ms delay to optimize API performance
- **Visual Feedback**: Loading indicators and result counts
- **No Results State**: Helpful message when no products match

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Breakpoints**: 
  - Mobile: < 768px (1 column)
  - Tablet: 768px - 1024px (2 columns)
  - Desktop: > 1024px (3 columns)
- **Touch-Friendly**: Appropriate touch targets and spacing

## 🚨 Error Handling

- **Network Errors**: Automatic retry mechanism (up to 3 attempts)
- **API Failures**: User-friendly error messages
- **Loading States**: Visual feedback during operations
- **Retry Actions**: Manual retry buttons for failed requests

## 🎯 Performance Features

1. **Image Optimization**: Lazy loading with placeholder states
2. **Search Optimization**: Debounced input to reduce API calls
3. **Infinite Scroll**: Load products on-demand
4. **Memory Management**: Proper cleanup of event listeners
5. **CSS Optimization**: Tailwind's purge for smaller bundle size

## 🔧 Configuration

### Tailwind Configuration
The app uses a custom Tailwind configuration with:
- Dark mode support
- Custom color palette
- Responsive breakpoints
- Custom utilities

### Environment Variables
No environment variables required - the app uses public APIs.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Deploy to Netlify/Vercel
The app is ready for deployment to any static hosting service:
1. Run `npm run build`
2. Deploy the `build` folder
3. Configure redirects for SPA routing if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Fake Store API](https://fakestoreapi.com/) for providing the product data
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React LazyLoad](https://github.com/twobin/react-lazyload) for image lazy loading
- [Axios](https://axios-http.com/) for HTTP requests

---

Built with ❤️ using React.js and modern web technologies.
