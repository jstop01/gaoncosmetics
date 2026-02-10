import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './components/ProductContext';
import { BrandProvider } from './components/BrandContext';
import { AnnouncementProvider } from './components/AnnouncementContext';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AdminPage } from './components/AdminPage';
import { HomePage } from './pages/HomePage';
import { DistributionPage } from './pages/DistributionPage';
import { AboutPage } from './pages/AboutPage';
import { IngredientsPage } from './pages/IngredientsPage';
import { ContactPage } from './pages/ContactPage';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);

  return (
    <BrandProvider>
      <ProductProvider>
        <AnnouncementProvider>
        <BrowserRouter>
          <div className="min-h-screen">
            {isAdminMode ? (
              <AdminPage onBack={() => setIsAdminMode(false)} />
            ) : (
              <>
                <Header />
                <main className="pt-16">
                  <AnnouncementBanner />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/distribution" element={<DistributionPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/ingredients" element={<IngredientsPage />} />
                    <Route path="/contact" element={<ContactPage onAdminAccess={() => setIsAdminMode(true)} />} />
                  </Routes>
                </main>
                <Footer />
              </>
            )}
          </div>
          <Toaster />
        </BrowserRouter>
        </AnnouncementProvider>
      </ProductProvider>
    </BrandProvider>
  );
}