import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  imageUrl?: string;
  description: string;
  isSpecial: boolean;
  isOnSale?: boolean;
  originalPrice?: number;
  discountPercentage?: number;
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Omit<Product, 'id'>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    const { data, error: err } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (err) {
      console.error('Products fetch error:', err);
      setError('제품 데이터를 불러올 수 없습니다');
    } else {
      setProducts(
        (data ?? []).map((row) => ({
          id: String(row.id),
          name: row.name,
          brand: row.brand,
          price: row.price,
          image: row.image,
          description: row.description,
          isSpecial: row.is_special,
          discountPercentage: row.discount_percentage,
        }))
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();

    const channel = supabase
      .channel('products-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
        fetchProducts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchProducts]);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    const { error: err } = await supabase.from('products').insert({
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      description: product.description,
      is_special: product.isSpecial,
      discount_percentage: product.discountPercentage ?? null,
    });
    if (err) throw err;
    await fetchProducts();
  };

  const updateProduct = async (id: string, product: Omit<Product, 'id'>) => {
    const { error: err } = await supabase.from('products').update({
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      description: product.description,
      is_special: product.isSpecial,
      discount_percentage: product.discountPercentage ?? null,
    }).eq('id', id);
    if (err) throw err;
    await fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    const { error: err } = await supabase.from('products').delete().eq('id', id);
    if (err) throw err;
    await fetchProducts();
  };

  return (
    <ProductContext.Provider value={{ products, loading, error, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
}
