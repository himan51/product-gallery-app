import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import useDebounce from '../hooks/useDebounce';

const ProductList = ({ searchTerm, onLoadingChange }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const observer = useRef();
  const PRODUCTS_PER_PAGE = 6;

  // Fetch all products initially
  const fetchProducts = useCallback(async (retryCount = 0) => {
    console.log(retryCount)
    try {
      setLoading(true);
      setError(null);
      onLoadingChange(true);
      
      const response = await axios.get('https://fakestoreapi.com/products/');
      setProducts(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError({
        message: 'Failed to load products. Please check your internet connection.',
        retry: () => fetchProducts(retryCount + 1)
      });
      
      // Auto-retry up to 3 times
      if (retryCount < 3) {
        setTimeout(() => fetchProducts(retryCount + 1), 2000);
      }
    } finally {
      setLoading(false);
      onLoadingChange(false);
    }
  }, [onLoadingChange]);

  // Filter products based on search term
  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
    setPage(1); // Reset pagination when search changes
  }, [debouncedSearchTerm, products]);

  // Update displayed products for infinite scroll
  useEffect(() => {
    const startIndex = 0;
    const endIndex = page * PRODUCTS_PER_PAGE;
    const newDisplayedProducts = filteredProducts.slice(startIndex, endIndex);
    
    setDisplayedProducts(newDisplayedProducts);
    setHasMore(endIndex < filteredProducts.length);
  }, [filteredProducts, page]);

  // Intersection Observer for infinite scroll
  const lastProductElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setTimeout(() => { // to artifically delay the loading of the next page
          setPage(prevPage => prevPage + 1);
        }, 1500);
      }
    }, {
      threshold: 0.1,
      rootMargin: '100px'
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // Initial fetch
  useEffect(() => {
    console.log('once right?')
    fetchProducts();
  }, []);

  if (loading && products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="aspect-square bg-gray-300 dark:bg-gray-600"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                  <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mb-4">
            <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error.message}
          </p>
          <button
            onClick={error.retry}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (filteredProducts.length === 0 && debouncedSearchTerm) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
            <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No products found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms or browse all products.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Results Info */}
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400">
          {debouncedSearchTerm ? (
            <>Showing {filteredProducts.length} results for "<span className="font-medium">{debouncedSearchTerm}</span>"</>
          ) : (
            <>Showing all {products.length} products</>
          )}
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProducts.map((product, index) => {
          const isLast = index === displayedProducts.length - 1;
          return (
            <div
              key={product.id}
              ref={isLast ? lastProductElementRef : null}
            >
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>

      {/* Loading More Indicator */}
      {hasMore && !loading && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      )}

      {/* End of Results */}
      {!hasMore && displayedProducts.length > 0 && (
        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400">
            You've reached the end of the results
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
