import { useState, useMemo } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useProducts } from './ProductContext';
import { useBrands } from './BrandContext';
import { DataState } from './ui/DataState';

export function Products() {
  const { products, loading, error } = useProducts();
  const { brands } = useBrands();
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  const filteredProducts = useMemo(
    () => selectedBrand === 'all' ? products : products.filter((p) => p.brand === selectedBrand),
    [products, selectedBrand]
  );

  const brandNames = useMemo(
    () => [...new Set(products.map((p) => p.brand))],
    [products]
  );

  return (
    <section id="products" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm tracking-[0.3em] text-muted-foreground mb-4">
            OUR COLLECTION
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-4">
            Featured Products
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Discover our carefully curated selection of premium skincare products,
            formulated with the finest ingredients
          </p>
        </div>
        
        <DataState loading={loading} error={error}>
        {brandNames.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
            <button
              onClick={() => setSelectedBrand('all')}
              className={`px-4 py-2 text-xs sm:text-sm rounded-full border transition-colors ${
                selectedBrand === 'all'
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-white border-border text-muted-foreground hover:border-foreground hover:text-foreground'
              }`}
            >
              전체
            </button>
            {brandNames.map((name) => (
              <button
                key={name}
                onClick={() => setSelectedBrand(name)}
                className={`px-4 py-2 text-xs sm:text-sm rounded-full border transition-colors ${
                  selectedBrand === name
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-white border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => {
            const discountedPrice = product.isSpecial && product.discountPercentage
              ? product.price * (1 - product.discountPercentage / 100)
              : product.price;

            return (
              <div key={product.id} className="group">
                <div className="relative aspect-[3/4] mb-3 sm:mb-4 overflow-hidden rounded-lg bg-neutral-50">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.isSpecial && (
                    <Badge className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-destructive text-destructive-foreground text-xs">
                      {product.discountPercentage}% OFF
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-[10px] sm:text-xs tracking-[0.2em] text-muted-foreground">
                    {product.category}
                  </p>
                  <h3 className="text-sm sm:text-base lg:text-lg">{product.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                  {product.price > 0 && (
                    <div className="flex items-center gap-2 pt-1 sm:pt-2">
                      {product.isSpecial ? (
                        <>
                          <p className="text-sm sm:text-base lg:text-lg">₩{discountedPrice.toLocaleString()}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground line-through">
                            ₩{product.price.toLocaleString()}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm sm:text-base lg:text-lg">₩{product.price.toLocaleString()}</p>
                      )}
                    </div>
                  )}
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-3 sm:mt-4 opacity-0 group-hover:opacity-100 transition-opacity text-xs sm:text-sm"
                >
                  문의하기
                </Button>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Button variant="outline" size="lg" className="px-8">
            VIEW ALL PRODUCTS
          </Button>
        </div>
        </DataState>
      </div>
    </section>
  );
}