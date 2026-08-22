import {
  TrendingUp,
  
} from "lucide-react";

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  description,
}) {
  return (
    <div className="group bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-0.5 transition-all duration-300">

      <div className="flex items-start justify-between">

        <div className="w-11 h-11 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
          <Icon size={21} />
        </div>

        <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
          <TrendingUp size={13} />
          Strong
        </div>

      </div>

      <div className="mt-5">

        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <div className="flex items-end gap-2 mt-1">

          <h3 className="text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>

          {subtitle && (
            <span className="text-xs text-slate-400 mb-1">
              {subtitle}
            </span>
          )}

        </div>

        {description && (
          <p className="text-xs text-slate-400 mt-2">
            {description}
          </p>
        )}

      </div>

      <div className="mt-5 h-1 rounded-full bg-slate-100 overflow-hidden">
        <div className="h-full w-[88%] rounded-full bg-cyan-500" />
      </div>

    </div>
  );
}