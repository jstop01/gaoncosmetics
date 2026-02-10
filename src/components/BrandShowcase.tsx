import { ImageWithFallback } from './figma/ImageWithFallback';
import { useBrands } from './BrandContext';
import { DataState } from './ui/DataState';

export function BrandShowcase() {
  const { brands, loading, error } = useBrands();

  return (
    <section id="products" className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-xs sm:text-sm tracking-[0.3em] text-muted-foreground mb-3">
            OUR BRANDS
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4">
            취급 브랜드
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            세계적인 프리미엄 브랜드의 정품만을 취급합니다
          </p>
        </div>

        <DataState loading={loading} error={error}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {brands.map((brand, index) => (
            <div
              key={brand.id}
              className={`group relative overflow-hidden rounded-lg bg-neutral-50 hover:shadow-xl transition-all duration-500 ${
                index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="aspect-square overflow-hidden">
                <ImageWithFallback
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-xl sm:text-2xl mb-2 tracking-wide">
                  {brand.name}
                </h3>
                <p className="text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {brand.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 lg:mt-16">
          <p className="text-sm text-muted-foreground">
            더 많은 제품을 보려면{' '}
            <a href="/distribution" className="text-primary hover:underline">
              Distribution 페이지
            </a>
            를 방문하세요
          </p>
        </div>
        </DataState>
      </div>
    </section>
  );
}