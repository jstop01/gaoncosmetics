import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'PRODUCTS' },
  { to: '/distribution', label: 'DISTRIBUTION' },
  { to: '/about', label: 'ABOUT' },
  { to: '/ingredients', label: 'INGREDIENTS' },
  { to: '/contact', label: 'CONTACT' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className="flex-1 flex justify-center lg:justify-start">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <h1 className="text-2xl tracking-wider">가온 코스메틱스</h1>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm tracking-wide transition-opacity ${
                location.pathname === link.to ? 'opacity-100 font-medium' : 'opacity-60 hover:opacity-100'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="hover:opacity-60 transition-opacity">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <nav className="lg:hidden border-t border-border bg-white">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`text-sm tracking-wide py-2 transition-opacity ${
                  location.pathname === link.to ? 'opacity-100 font-medium' : 'opacity-60'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
