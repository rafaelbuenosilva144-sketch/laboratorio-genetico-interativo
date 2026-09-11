import { GlassCard } from "../components/ui/GlassCard";
import { EvolutionChart } from "../components/charts/EvolutionChart";
import { EnvironmentType, EvolutionPoint } from "../types/genetics";
import { environmentDescriptions } from "../data/genetics";

interface ModuleProps {
  environment: EnvironmentType;
  data: EvolutionPoint[];
  onChange: (value: EnvironmentType) => void;
}

export const EvolutionModule = ({ environment, data, onChange }: ModuleProps) => {
  return (
    <GlassCard
      title="Módulo 5 — Evolução Genética"
      subtitle="Selecione um ambiente e acompanhe como a população muda ao longo de 10 gerações."
      right={<span className="chip">Gráfico evolutivo</span>}
    >
      <div className="grid gap-6 xl:grid-cols-[.95fr_1.05fr]">
        <div className="space-y-5">
          <div>
            <p className="label mb-3">Escolha o ambiente</p>
            <div className="grid gap-3">
              {(
                ["Temperatura elevada", "Presença de medicamento", "Pouco alimento"] as const
              ).map((option) => (
                <button
                  key={option}
                  className={`option-tile ${environment === option ? "active" : ""}`}
                  onClick={() => onChange(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed text-white/85">
            {environmentDescriptions[environment]}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="metric">
              <p className="label">Geração 1</p>
              <p className="mt-2 text-sm text-white/85">
                {data[0].resistant}% resistentes • {data[0].sensitive}% sensíveis
              </p>
            </div>
            <div className="metric">
              <p className="label">Geração 10</p>
              <p className="mt-2 text-sm text-white/85">
                {data[data.length - 1].resistant}% resistentes • {data[data.length - 1].sensitive}% sensíveis
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="label">Mudança populacional</p>
          <div className="mt-4">
            <EvolutionChart data={data} />
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
