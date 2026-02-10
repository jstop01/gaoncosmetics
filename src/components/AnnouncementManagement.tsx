import { useState } from 'react';
import { useAnnouncements, Announcement } from './AnnouncementContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Trash2, Pencil, X, Loader2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const emptyForm = { title: '', content: '', is_active: true };

export function AnnouncementManagement() {
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement } = useAnnouncements();
  const [formData, setFormData] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (announcement: Announcement) => {
    setEditingId(announcement.id);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      is_active: announcement.is_active,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(emptyForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title) {
      toast.error('제목을 입력해주세요');
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        await updateAnnouncement(editingId, formData);
        toast.success('공지사항이 수정되었습니다');
        setEditingId(null);
      } else {
        await addAnnouncement(formData);
        toast.success('공지사항이 추가되었습니다');
      }
      setFormData(emptyForm);
    } catch {
      toast.error(editingId ? '수정에 실패했습니다' : '추가에 실패했습니다');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (announcement: Announcement) => {
    try {
      await updateAnnouncement(announcement.id, {
        title: announcement.title,
        content: announcement.content,
        is_active: !announcement.is_active,
      });
      toast.success(announcement.is_active ? '공지가 숨겨졌습니다' : '공지가 표시됩니다');
    } catch {
      toast.error('상태 변경에 실패했습니다');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('공지사항을 삭제하시겠습니까?')) {
      try {
        await deleteAnnouncement(id);
        if (editingId === id) handleCancelEdit();
        toast.success('공지사항이 삭제되었습니다');
      } catch {
        toast.error('삭제에 실패했습니다');
      }
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
      {/* 공지사항 추가/수정 폼 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg sm:text-xl">
              {editingId ? '공지사항 수정' : '새 공지사항 추가'}
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
              <Label htmlFor="announcementTitle" className="text-sm">제목</Label>
              <Input
                id="announcementTitle"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="예: 여름 특가 세일 20% 할인"
                className="text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="announcementContent" className="text-sm">내용 (선택)</Label>
              <Textarea
                id="announcementContent"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="추가 설명을 입력하세요"
                rows={3}
                className="text-sm"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 rounded border-border"
                />
                <span className="text-sm">바로 표시</span>
              </label>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {editingId ? '수정 중...' : '추가 중...'}
                </>
              ) : (
                editingId ? '공지사항 수정' : '공지사항 추가'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* 공지사항 목록 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">공지사항 목록 ({announcements.length}개)</CardTitle>
        </CardHeader>
        <CardContent>
          {announcements.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              등록된 공지사항이 없습니다.
            </p>
          ) : (
            <div className="space-y-3 sm:space-y-4 max-h-[600px] sm:max-h-[800px] overflow-y-auto">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className={`p-3 sm:p-4 border rounded-lg transition-colors ${
                    editingId === announcement.id
                      ? 'border-primary bg-primary/5'
                      : announcement.is_active
                        ? 'border-border bg-white'
                        : 'border-border bg-neutral-100 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-medium truncate">{announcement.title}</h3>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                          announcement.is_active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-neutral-200 text-neutral-500'
                        }`}>
                          {announcement.is_active ? '표시중' : '숨김'}
                        </span>
                      </div>
                      {announcement.content && (
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-1">
                          {announcement.content}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {formatDate(announcement.created_at)}
                      </p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleActive(announcement)}
                        title={announcement.is_active ? '숨기기' : '표시하기'}
                      >
                        {announcement.is_active ? (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(announcement)}
                      >
                        <Pencil className="w-4 h-4 text-muted-foreground" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(announcement.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
