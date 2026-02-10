import { useState } from 'react';
import { useProducts, Product } from './ProductContext';
import { useBrands } from './BrandContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Trash2, Pencil, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const emptyForm = {
  name: '',
  brand: '',
  price: '',
  image: '',
  description: '',
  isSpecial: 'no',
  discountPercentage: ''
};

export function ProductManagement() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { brands } = useBrands();
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

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      brand: product.brand,
      price: String(product.price),
      image: product.image,
      description: product.description,
      isSpecial: product.isSpecial ? 'yes' : 'no',
      discountPercentage: product.discountPercentage ? String(product.discountPercentage) : ''
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

    if (!formData.name || !formData.brand || !formData.price || !formData.image || !formData.description) {
      toast.error('모든 필수 항목을 입력해주세요');
      return;
    }

    setSubmitting(true);
    try {
      const productData = {
        name: formData.name,
        brand: formData.brand,
        price: parseFloat(formData.price),
        image: formData.image,
        description: formData.description,
        isSpecial: formData.isSpecial === 'yes',
        discountPercentage: formData.isSpecial === 'yes' ? parseFloat(formData.discountPercentage) : undefined
      };

      if (editingId) {
        await updateProduct(editingId, productData);
        toast.success('제품이 수정되었습니다');
        setEditingId(null);
      } else {
        await addProduct(productData);
        toast.success('제품이 추가되었습니다');
      }

      setFormData(emptyForm);
    } catch {
      toast.error(editingId ? '제품 수정에 실패했습니다' : '제품 추가에 실패했습니다');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteProduct(id);
        if (editingId === id) handleCancelEdit();
        toast.success('제품이 삭제되었습니다');
      } catch {
        toast.error('제품 삭제에 실패했습니다');
      }
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
      {/* 제품 추가/수정 폼 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg sm:text-xl">
              {editingId ? '제품 수정' : '새 제품 추가'}
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
              <Label className="text-sm">제품 이미지</Label>
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
                  placeholder="https://example.com/image.jpg"
                  className="text-sm"
                />
              ) : (
                <div className="border-2 border-dashed border-border rounded-lg p-4 hover:border-primary transition-colors">
                  <input
                    type="file"
                    id="fileUpload"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="fileUpload"
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
              <Label htmlFor="name" className="text-sm">제품 이름</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="예: Radiance Serum"
                className="text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand" className="text-sm">브랜드</Label>
              <Select
                value={formData.brand}
                onValueChange={(value) => setFormData({ ...formData, brand: value })}
              >
                <SelectTrigger id="brand" className="text-sm">
                  <SelectValue placeholder="선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.name}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm">제품 설명</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="제품에 대한 간단한 설명을 입력하세요"
                rows={3}
                className="text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm">가격 (원)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="89000"
                className="text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="special" className="text-sm">특가 여부</Label>
              <Select
                value={formData.isSpecial}
                onValueChange={(value) => setFormData({ ...formData, isSpecial: value })}
              >
                <SelectTrigger id="special" className="text-sm">
                  <SelectValue placeholder="선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">일반 제품</SelectItem>
                  <SelectItem value="yes">특가 제품</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.isSpecial === 'yes' && (
              <div className="space-y-2">
                <Label htmlFor="discount" className="text-sm">할인율 (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  value={formData.discountPercentage}
                  onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })}
                  placeholder="20"
                  min="1"
                  max="99"
                  className="text-sm"
                />
              </div>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {editingId ? '수정 중...' : '추가 중...'}
                </>
              ) : (
                editingId ? '제품 수정' : '제품 추가'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* 제품 목록 */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">등록된 제품 ({products.length}개)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4 max-h-[600px] sm:max-h-[800px] overflow-y-auto">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`flex gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg transition-colors ${
                    editingId === product.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-neutral-50'
                  }`}
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h3 className="text-sm sm:text-base mb-1">{product.name}</h3>
                        <p className="text-xs text-muted-foreground mb-1 sm:mb-2">
                          {product.brand}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-1 sm:mb-2">
                          {product.description}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {product.isSpecial ? (
                            <>
                              <span className="text-xs sm:text-sm">
                                ₩{(product.price * (1 - (product.discountPercentage || 0) / 100)).toLocaleString()}
                              </span>
                              <span className="text-[10px] sm:text-xs text-muted-foreground line-through">
                                ₩{product.price.toLocaleString()}
                              </span>
                              <span className="text-[10px] sm:text-xs bg-destructive text-destructive-foreground px-1.5 sm:px-2 py-0.5 rounded">
                                {product.discountPercentage}% OFF
                              </span>
                            </>
                          ) : (
                            <span className="text-xs sm:text-sm">₩{product.price.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(product)}
                          className="flex-shrink-0"
                        >
                          <Pencil className="w-4 h-4 text-muted-foreground" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
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
