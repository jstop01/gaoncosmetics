import { Loader2 } from 'lucide-react';
import { ReactNode } from 'react';

interface DataStateProps {
  loading: boolean;
  error: string | null;
  children: ReactNode;
}

export function DataState({ loading, error, children }: DataStateProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return <>{children}</>;
}
