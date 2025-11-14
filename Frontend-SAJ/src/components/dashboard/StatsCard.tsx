import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  isLoading?: boolean;
  iconColor?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  isLoading = false,
  iconColor = 'text-primary'
}: StatsCardProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-4 w-24 rounded bg-slate-200"></div>
        <div className="mt-2 h-8 w-16 rounded bg-slate-200"></div>
      </div>
    );
  }

  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-sm font-medium text-slate-600">{title}</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">{value}</div>
        </div>
        <div className={`rounded-lg bg-slate-50 p-3 transition-colors group-hover:bg-slate-100`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}
