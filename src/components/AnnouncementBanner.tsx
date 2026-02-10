import { useState } from 'react';
import { useAnnouncements } from './AnnouncementContext';
import { X, Megaphone } from 'lucide-react';

export function AnnouncementBanner() {
  const { activeAnnouncements } = useAnnouncements();
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());

  const visible = activeAnnouncements.filter((a) => !dismissedIds.has(a.id));

  if (visible.length === 0) return null;

  const dismiss = (id: string) => {
    setDismissedIds((prev) => new Set(prev).add(id));
  };

  return (
    <div className="bg-primary text-primary-foreground">
      {visible.map((announcement) => (
        <div
          key={announcement.id}
          className="container mx-auto px-4 py-4 sm:py-5 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <Megaphone className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm sm:text-base font-semibold truncate">
                {announcement.title}
              </p>
              {announcement.content && (
                <p className="text-xs sm:text-sm opacity-80 truncate mt-0.5">
                  {announcement.content}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => dismiss(announcement.id)}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      ))}
    </div>
  );
}
