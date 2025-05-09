import React, { createContext, useState, useContext } from 'react';

// Create Product Context
const ProductContext = createContext();

// Create the ProductProvider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // Initial state for products

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]); // Add new product to the state
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children} {/* Render children components */}
    </ProductContext.Provider>
  );
};

// Create custom hook to use the ProductContext
export const useProducts = () => useContext(ProductContext);
