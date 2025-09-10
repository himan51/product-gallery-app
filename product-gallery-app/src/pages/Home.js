import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleLoadingChange = (loading) => {
    setIsLoading(loading);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        isLoading={isLoading}
      />
      <ProductList
        searchTerm={searchTerm}
        onLoadingChange={handleLoadingChange}
      />
    </div>
  );
};

export default Home;
