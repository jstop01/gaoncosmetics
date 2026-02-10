import { Menu, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button className="lg:hidden">
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="flex-1 flex justify-center lg:justify-start">
          <Link to="/">
            <h1 className="text-2xl tracking-wider">가온 코스메틱스</h1>
          </Link>
        </div>
        
        <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <Link to="/" className="text-sm tracking-wide hover:opacity-60 transition-opacity">
            PRODUCTS
          </Link>
          <Link to="/distribution" className="text-sm tracking-wide hover:opacity-60 transition-opacity">
            DISTRIBUTION
          </Link>
          <Link to="/about" className="text-sm tracking-wide hover:opacity-60 transition-opacity">
            ABOUT
          </Link>
          <Link to="/ingredients" className="text-sm tracking-wide hover:opacity-60 transition-opacity">
            INGREDIENTS
          </Link>
          <Link to="/contact" className="text-sm tracking-wide hover:opacity-60 transition-opacity">
            CONTACT
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <button className="hover:opacity-60 transition-opacity">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}