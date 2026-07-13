export function ProgressDots({
  step,
  total,
}: {
  step: number; // 1-indexed
  total: number;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center justify-center gap-1.5">
        {Array.from({ length: total }).map((_, idx) => {
          const i = idx + 1;
          const active = i === step;
          const done = i < step;
          return (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                active ? "w-6 bg-white" : done ? "w-1.5 bg-white/80" : "w-1.5 bg-white/30"
              }`}
            />
          );
        })}
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
        Question {step} of {total}
      </p>
    </div>
  );
}
