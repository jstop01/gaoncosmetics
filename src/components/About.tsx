import { ImageWithFallback } from './figma/ImageWithFallback';

export function About() {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="relative h-[400px] sm:h-[500px] lg:h-[700px] order-2 lg:order-1">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1743926959711-73960c2a7b4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpYyUyMHByb2R1Y3QlMjBwaG90b2dyYXBoeSUyMGVsZWdhbnR8ZW58MXx8fHwxNzcwMzY0Mjk4fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="About our brand"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          
          <div className="space-y-6 lg:space-y-8 order-1 lg:order-2">
            <div className="space-y-3 lg:space-y-4">
              <p className="text-xs sm:text-sm tracking-[0.3em] text-muted-foreground">
                OUR STORY
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight">
                에스테틱 전문<br />
                <span className="italic">화장품</span>
              </h2>
            </div>
            
            <div className="space-y-4 lg:space-y-6 text-sm sm:text-base text-muted-foreground">
              <p>
                가온 코스메틱스는 에스테틱 전문 화장품을 제공하는 전문 업체입니다.
                프리미엄 브랜드들의 검증된 제품으로 고객님의 아름다움을 책임집니다.
              </p>
              <p>
                GREEN PEEL, ANUBIS, ERBASOL, Julie's Lim, Ordicosy 등
                세계적으로 인정받은 브랜드들의 정품만을 취급하며,
                전문적인 상담과 함께 최상의 서비스를 제공합니다.
              </p>
              <p>
                피부 관리 전문가들이 신뢰하는 제품으로 고객님의 피부 건강과
                아름다움을 위한 최선의 선택을 도와드립니다.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-6 lg:pt-8">
              <div>
                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">5+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">프리미엄 브랜드</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">100%</div>
                <div className="text-xs sm:text-sm text-muted-foreground">정품 보장</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">전문</div>
                <div className="text-xs sm:text-sm text-muted-foreground">에스테틱 케어</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}