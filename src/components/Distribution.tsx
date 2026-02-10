import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useProducts } from './ProductContext';
import { useBrands } from './BrandContext';
import { DataState } from './ui/DataState';

export function Distribution() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { products, loading: productsLoading, error: productsError } = useProducts();
  const { brands, loading: brandsLoading, error: brandsError } = useBrands();

  // 브랜드 목록을 동적으로 생성
  const categories = [
    { id: 'all', name: 'All' },
    ...brands.map(brand => ({
      id: brand.name.toLowerCase().replace(/['s\s]/g, ''),
      name: brand.name
    }))
  ];

  // Product 인터페이스에 맞게 데이터 변환
  const distributionProducts = products.map(p => ({
    ...p,
    imageUrl: p.image,
    isOnSale: p.isSpecial,
    originalPrice: p.isSpecial && p.discountPercentage 
      ? p.price 
      : undefined,
    price: p.isSpecial && p.discountPercentage
      ? p.price * (1 - p.discountPercentage / 100)
      : p.price
  }));

  const filteredProducts = selectedCategory === 'all' 
    ? distributionProducts 
    : distributionProducts.filter(p => p.brand?.toLowerCase().replace(/['s\s]/g, '') === selectedCategory);

  return (
    <section id="distribution" className="py-16 sm:py-20 lg:py-24 bg-[#e8e6df] min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4">
            유통 제품
          </h2>
          <p className="text-muted-foreground">
            브랜드별로 다양한 제품을 확인하세요
          </p>
        </div>

        <DataState loading={productsLoading || brandsLoading} error={productsError || brandsError}>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* 왼쪽 카테고리 필터 */}
          <aside className="lg:w-48 flex-shrink-0">
            <div className="bg-white rounded-lg p-4 sticky top-24">
              <h3 className="text-sm font-medium mb-4 text-muted-foreground tracking-wide">
                브랜드
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`block w-full text-left px-4 py-2 text-sm rounded transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-neutral-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* 오른쪽 제품 그리드 */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-muted-foreground">
                  해당 카테고리에 제품이 없습니다.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  어드민 페이지에서 제품을 추가해주세요.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="aspect-square p-4 sm:p-6 flex items-center justify-center bg-neutral-50 overflow-hidden">
                      <ImageWithFallback
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      {product.brand && (
                        <p className="text-xs text-muted-foreground mb-1">
                          {product.brand}
                        </p>
                      )}
                      <h3 className="text-sm font-medium text-primary mb-2">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          {product.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        {product.isOnSale && product.originalPrice && (
                          <span className="text-xs text-muted-foreground line-through">
                            ₩{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                        <span className={`text-sm font-medium ${product.isOnSale ? 'text-red-600' : 'text-primary'}`}>
                          ₩{product.price.toLocaleString()}
                        </span>
                        {product.isOnSale && (
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                            SALE
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        </DataState>
      </div>
    </section>
  );
}