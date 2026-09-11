interface StepBadgeProps {
  index: number;
  label: string;
  active: boolean;
  completed: boolean;
}

export const StepBadge = ({ index, label, active, completed }: StepBadgeProps) => {
  return (
    <div
      className={[
        "flex min-w-[120px] items-center gap-3 rounded-2xl border px-3 py-2 transition",
        active
          ? "border-cyan-300/40 bg-cyan-400/10 text-cyan-100"
          : completed
          ? "border-purple-300/30 bg-purple-400/10 text-purple-100"
          : "border-white/10 bg-white/5 text-white/60"
      ].join(" ")}
    >
      <div
        className={[
          "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
          active
            ? "bg-cyan-300/20 text-cyan-100"
            : completed
            ? "bg-purple-300/20 text-purple-100"
            : "bg-white/10 text-white/60"
        ].join(" ")}
      >
        {index}
      </div>
      <span className="text-xs font-medium leading-tight">{label}</span>
    </div>
  );
};
