import { ReactNode } from "react";

interface GlassCardProps {
  title?: string;
  subtitle?: string;
  right?: ReactNode;
  children: ReactNode;
}

export const GlassCard = ({ title, subtitle, right, children }: GlassCardProps) => {
  return (
    <section className="glass-panel p-5 md:p-7">
      {(title || subtitle || right) && (
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1">
            {title ? <h2 className="section-title">{title}</h2> : null}
            {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
          </div>
          {right ? <div>{right}</div> : null}
        </div>
      )}
      {children}
    </section>
  );
};
