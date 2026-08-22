import { ArrowRight } from "lucide-react";

export default function PageHeader({
  eyebrow = "Overview",
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">

      <div>

        <p className="text-xs uppercase tracking-[0.18em] font-bold text-cyan-600 mb-2">
          {eyebrow}
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>

        {description && (
          <p className="mt-2 text-slate-500 max-w-2xl leading-6">
            {description}
          </p>
        )}

      </div>

      {actionLabel && (
        <button
          onClick={onAction}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-950 text-white text-sm font-semibold hover:bg-slate-800 transition"
        >
          {actionLabel}
          <ArrowRight size={16} />
        </button>
      )}

    </div>
  );
}