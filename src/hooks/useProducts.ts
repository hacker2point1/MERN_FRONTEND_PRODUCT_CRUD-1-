import { useEffect, useState } from 'react';
import { Product } from '../types/product';
import { fetchProducts } from '../services/product.service';

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetchProducts().then(setProducts).catch(() => {});
  }, []);
  return { products };
}
