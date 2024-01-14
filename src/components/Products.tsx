// File: Products.tsx
'use client'
import React, { useState, useEffect } from 'react';
import Card from './Card';

interface Product {
  id: string;
  image: string | null;
  name: string;
  price: number;
}

interface ProductsProps {
  isAdmin: boolean;
}

const Products: React.FC<ProductsProps> = ({ isAdmin }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(productsWithImages => {
        console.log(productsWithImages); // Log the data
        setProducts(productsWithImages);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap justify-around pt-20 pb-20">
      {products.map((product: Product, index: number) => (
        <Card 
          key={index} 
          id={product.id}
          image={product.image} 
          name={product.name} 
          price={product.price}
          onUpdate={() => {}}
          isEditable={false}
          onDelete={() => {}}
        />
      ))}
    </div>
  );
};

export default Products;