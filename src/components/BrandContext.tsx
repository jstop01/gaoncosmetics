import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

export interface Brand {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface BrandContextType {
  brands: Brand[];
  loading: boolean;
  error: string | null;
  addBrand: (brand: Omit<Brand, 'id'>) => Promise<void>;
  deleteBrand: (id: string) => Promise<void>;
  updateBrand: (id: string, brand: Omit<Brand, 'id'>) => Promise<void>;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export function BrandProvider({ children }: { children: ReactNode }) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBrands = useCallback(async () => {
    const { data, error: err } = await supabase
      .from('brands')
      .select('*')
      .order('created_at', { ascending: false });

    if (err) {
      console.error('Brands fetch error:', err);
      setError('브랜드 데이터를 불러올 수 없습니다');
    } else {
      setBrands(
        (data ?? []).map((row) => ({
          id: String(row.id),
          name: row.name,
          description: row.description,
          image: row.image,
        }))
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBrands();

    const channel = supabase
      .channel('brands-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'brands' }, () => {
        fetchBrands();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchBrands]);

  const addBrand = async (brand: Omit<Brand, 'id'>) => {
    const { error: err } = await supabase.from('brands').insert({
      name: brand.name,
      description: brand.description,
      image: brand.image,
    });
    if (err) throw err;
    await fetchBrands();
  };

  const deleteBrand = async (id: string) => {
    const { error: err } = await supabase.from('brands').delete().eq('id', id);
    if (err) throw err;
    await fetchBrands();
  };

  const updateBrand = async (id: string, brand: Omit<Brand, 'id'>) => {
    const { error: err } = await supabase.from('brands').update({
      name: brand.name,
      description: brand.description,
      image: brand.image,
    }).eq('id', id);
    if (err) throw err;
    await fetchBrands();
  };

  return (
    <BrandContext.Provider value={{ brands, loading, error, addBrand, deleteBrand, updateBrand }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrands() {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrands must be used within BrandProvider');
  }
  return context;
}
