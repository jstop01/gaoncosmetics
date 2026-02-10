import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-8 sm:py-10 lg:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-lg sm:text-xl mb-3 sm:mb-4 tracking-wide">가온 코스메틱스</h3>
            <p className="text-xs sm:text-sm text-primary-foreground/70">
              에스테틱 전문 화장품
            </p>
          </div>
          
          <div>
            <h4 className="mb-3 sm:mb-4 text-xs sm:text-sm tracking-wide">브랜드</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">GREEN PEEL</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">ANUBIS</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">ERBASOL</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Julie's Lim</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-3 sm:mb-4 text-xs sm:text-sm tracking-wide">회사</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-primary-foreground/70">
              <li><Link to="/about" className="hover:text-primary-foreground transition-colors">회사 소개</Link></li>
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">제품</Link></li>
              <li><Link to="/contact" className="hover:text-primary-foreground transition-colors">문의하기</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-3 sm:mb-4 text-xs sm:text-sm tracking-wide">연락처</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-primary-foreground/70">
              <li>010-6344-9656</li>
              <li>info@gaoncosmetics.com</li>
              <li>대표: 가온 이상엽</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-6 sm:pt-8 border-t border-primary-foreground/10 text-center text-xs sm:text-sm text-primary-foreground/70">
          <p>&copy; 2026 가온 코스메틱스. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}