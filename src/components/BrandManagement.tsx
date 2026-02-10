import { useState } from 'react';
import { useBrands, Brand } from './BrandContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Trash2, Pencil, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const emptyForm = { name: '', description: '', image: '' };

export function BrandManagement() {
  const { brands, addBrand, updateBrand, deleteBrand } = useBrands();
  const [formData, setFormData] = useState(emptyForm);
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('파일 크기는 5MB 이하여야 합니다');
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error('이미지 파일만 업로드 가능합니다');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFormData({ ...formData, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (brand: Brand) => {
    setEditingId(brand.id);
    setFormData({
      name: brand.name,
      description: brand.description,
      image: brand.image,
    });
    setUploadMethod('url');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(emptyForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.image) {
      toast.error('모든 필드를 입력해주세요');
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        await updateBrand(editingId, formData);
        toast.success('브랜드가 수정되었습니다');
        setEditingId(null);
      } else {
        await addBrand(formData);
        toast.success('브랜드가 추가되었습니다');
      }
      setFormData(emptyForm);
    } catch {
      toast.error(editingId ? '브랜드 수정에 실패했습니다' : '브랜드 추가에 실패했습니다');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteBrand(id);
        if (editingId === id) handleCancelEdit();
        toast.success('브랜드가 삭제되었습니다');
      } catch {
        toast.error('브랜드 삭제에 실패했습니다');
      }
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
      {/* 브랜드 추가/수정 폼 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg sm:text-xl">
              {editingId ? '브랜드 수정' : '새 브랜드 추가'}
            </CardTitle>
            {editingId && (
              <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                <X className="w-4 h-4 mr-1" />
                취소
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Label className="text-sm">브랜드 이미지</Label>
              <div className="flex gap-4 mb-3">
                <button
                  type="button"
                  onClick={() => setUploadMethod('url')}
                  className={`flex-1 px-3 py-2 text-sm rounded-md border transition-colors ${
                    uploadMethod === 'url'
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background border-border hover:bg-accent'
                  }`}
                >
                  URL 입력
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMethod('file')}
                  className={`flex-1 px-3 py-2 text-sm rounded-md border transition-colors ${
                    uploadMethod === 'file'
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background border-border hover:bg-accent'
                  }`}
                >
                  파일 업로드
                </button>
              </div>

              {uploadMethod === 'url' ? (
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/brand-image.jpg"
                  className="text-sm"
                />
              ) : (
                <div className="border-2 border-dashed border-border rounded-lg p-4 hover:border-primary transition-colors">
                  <input
                    type="file"
                    id="brandFileUpload"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="brandFileUpload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">
                        클릭하여 이미지 선택
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG, WEBP (최대 5MB)
                      </p>
                    </div>
                  </label>
                </div>
              )}
            </div>

            {formData.image && (
              <div className="aspect-square w-full max-w-xs mx-auto">
                <ImageWithFallback
                  src={formData.image}
                  alt="미리보기"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="brandName" className="text-sm">브랜드 이름</Label>
              <Input
                id="brandName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="예: GREEN PEEL"
                className="text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brandDescription" className="text-sm">브랜드 설명</Label>
              <Textarea
                id="brandDescription"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="브랜드에 대한 간단한 설명을 입력하세요"
                rows={3}
                className="text-sm"
              />
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {editingId ? '수정 중...' : '추가 중...'}
                </>
              ) : (
                editingId ? '브랜드 수정' : '브랜드 추가'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* 브랜드 목록 */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">등록된 브랜드 ({brands.length}개)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4 max-h-[600px] sm:max-h-[800px] overflow-y-auto">
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className={`flex gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg transition-colors ${
                    editingId === brand.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-neutral-50'
                  }`}
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                    <ImageWithFallback
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3 className="text-sm sm:text-base mb-1 font-medium">{brand.name}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                          {brand.description}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(brand)}
                          className="flex-shrink-0"
                        >
                          <Pencil className="w-4 h-4 text-muted-foreground" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(brand.id)}
                          className="flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
