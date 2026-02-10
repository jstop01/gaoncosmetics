import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Trash2, Phone, Clock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { DataState } from './ui/DataState';

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export function InquiryManagement() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInquiries = useCallback(async () => {
    const { data, error: err } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (err) {
      console.error('Inquiries fetch error:', err);
      setError('문의 데이터를 불러올 수 없습니다');
    } else {
      setInquiries(
        (data ?? []).map((row) => ({
          id: String(row.id),
          name: row.name,
          phone: row.phone,
          message: row.message,
          is_read: row.is_read,
          created_at: row.created_at,
        }))
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleMarkRead = async (id: string) => {
    try {
      await supabase.from('inquiries').update({ is_read: true }).eq('id', id);
      await fetchInquiries();
    } catch {
      toast.error('상태 변경에 실패했습니다');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('문의를 삭제하시겠습니까?')) {
      try {
        await supabase.from('inquiries').delete().eq('id', id);
        await fetchInquiries();
        toast.success('문의가 삭제되었습니다');
      } catch {
        toast.error('삭제에 실패했습니다');
      }
    }
  };

  const unreadCount = inquiries.filter((i) => !i.is_read).length;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
          고객 문의 ({inquiries.length}건)
          {unreadCount > 0 && (
            <span className="text-xs bg-destructive text-destructive-foreground px-2 py-0.5 rounded-full">
              {unreadCount} 신규
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataState loading={loading} error={error}>
          {inquiries.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              아직 접수된 문의가 없습니다.
            </p>
          ) : (
            <div className="space-y-3 sm:space-y-4 max-h-[700px] overflow-y-auto">
              {inquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className={`p-4 border rounded-lg transition-colors ${
                    inquiry.is_read
                      ? 'border-border bg-white'
                      : 'border-primary/30 bg-primary/5'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {!inquiry.is_read && (
                          <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                        )}
                        <h3 className="text-sm font-medium truncate">{inquiry.name}</h3>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {inquiry.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(inquiry.created_at)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      {!inquiry.is_read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkRead(inquiry.id)}
                          title="읽음 처리"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(inquiry.id)}
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-foreground whitespace-pre-wrap">
                    {inquiry.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </DataState>
      </CardContent>
    </Card>
  );
}
