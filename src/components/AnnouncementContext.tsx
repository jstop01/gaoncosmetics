import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  is_active: boolean;
  created_at: string;
}

interface AnnouncementContextType {
  announcements: Announcement[];
  activeAnnouncements: Announcement[];
  loading: boolean;
  error: string | null;
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'created_at'>) => Promise<void>;
  updateAnnouncement: (id: string, announcement: Omit<Announcement, 'id' | 'created_at'>) => Promise<void>;
  deleteAnnouncement: (id: string) => Promise<void>;
}

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined);

export function AnnouncementProvider({ children }: { children: ReactNode }) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnnouncements = useCallback(async () => {
    const { data, error: err } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });

    if (err) {
      console.error('Announcements fetch error:', err);
      setError('공지사항을 불러올 수 없습니다');
    } else {
      setAnnouncements(
        (data ?? []).map((row) => ({
          id: String(row.id),
          title: row.title,
          content: row.content,
          is_active: row.is_active,
          created_at: row.created_at,
        }))
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAnnouncements();

    const channel = supabase
      .channel('announcements-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'announcements' }, () => {
        fetchAnnouncements();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchAnnouncements]);

  const activeAnnouncements = announcements.filter((a) => a.is_active);

  const addAnnouncement = async (announcement: Omit<Announcement, 'id' | 'created_at'>) => {
    const { error: err } = await supabase.from('announcements').insert({
      title: announcement.title,
      content: announcement.content,
      is_active: announcement.is_active,
    });
    if (err) throw err;
    await fetchAnnouncements();
  };

  const updateAnnouncement = async (id: string, announcement: Omit<Announcement, 'id' | 'created_at'>) => {
    const { error: err } = await supabase.from('announcements').update({
      title: announcement.title,
      content: announcement.content,
      is_active: announcement.is_active,
    }).eq('id', id);
    if (err) throw err;
    await fetchAnnouncements();
  };

  const deleteAnnouncement = async (id: string) => {
    const { error: err } = await supabase.from('announcements').delete().eq('id', id);
    if (err) throw err;
    await fetchAnnouncements();
  };

  return (
    <AnnouncementContext.Provider value={{
      announcements, activeAnnouncements, loading, error,
      addAnnouncement, updateAnnouncement, deleteAnnouncement,
    }}>
      {children}
    </AnnouncementContext.Provider>
  );
}

export function useAnnouncements() {
  const context = useContext(AnnouncementContext);
  if (!context) {
    throw new Error('useAnnouncements must be used within AnnouncementProvider');
  }
  return context;
}
