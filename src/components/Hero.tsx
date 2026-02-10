import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-white" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-3 lg:space-y-4">
              <p className="text-xs sm:text-sm tracking-[0.3em] text-muted-foreground">
                ESTHETIC PROFESSIONAL COSMETICS
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                에스테틱 전문<br />
                <span className="italic">화장품</span>
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
                프리미엄 브랜드의 정품만을 취급하는 가온 코스메틱스입니다
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="px-8 w-full sm:w-auto" asChild>
                <Link to="/">제품 보기</Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 w-full sm:w-auto" asChild>
                <Link to="/contact">상담 문의</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1767360963892-3353defd6584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBza2luY2FyZSUyMGNyZWFtJTIwYm90dGxlJTIwbWluaW1hbHxlbnwxfHx8fDE3NzAzNjQyOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Luxury skincare products"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}