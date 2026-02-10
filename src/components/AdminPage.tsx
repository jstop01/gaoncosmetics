import { useState } from 'react';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { BrandManagement } from './BrandManagement';
import { ProductManagement } from './ProductManagement';
import { InquiryManagement } from './InquiryManagement';
import { AnnouncementManagement } from './AnnouncementManagement';

interface AdminPageProps {
  onBack: () => void;
}

export function AdminPage({ onBack }: AdminPageProps) {
  const [activeTab, setActiveTab] = useState<'brands' | 'products' | 'inquiries' | 'announcements'>('brands');

  return (
    <div className="min-h-screen bg-neutral-50 py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 sm:mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4 text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            메인으로 돌아가기
          </Button>
          <h1 className="text-3xl sm:text-4xl mb-6">관리자 페이지</h1>
          
          {/* 탭 메뉴 */}
          <div className="flex gap-2 border-b border-border">
            <button
              onClick={() => setActiveTab('brands')}
              className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                activeTab === 'brands'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              취급 브랜드 관리
              {activeTab === 'brands' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                activeTab === 'products'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              유통 제품 관리
              {activeTab === 'products' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                activeTab === 'inquiries'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              고객 문의
              {activeTab === 'inquiries' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('announcements')}
              className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                activeTab === 'announcements'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              공지사항
              {activeTab === 'announcements' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          </div>
        </div>

        {/* 탭 컨텐츠 */}
        <div className="mb-8 sm:mb-12">
          {activeTab === 'brands' && <BrandManagement />}
          {activeTab === 'products' && <ProductManagement />}
          {activeTab === 'inquiries' && <InquiryManagement />}
          {activeTab === 'announcements' && <AnnouncementManagement />}
        </div>
      </div>
    </div>
  );
}