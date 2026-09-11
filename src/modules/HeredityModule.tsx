import { GlassCard } from "../components/ui/GlassCard";
import { ProbabilityChart } from "../components/charts/ProbabilityChart";
import { Genotype, HeredityResult } from "../types/genetics";

interface ModuleProps {
  parentA: Genotype;
  parentB: Genotype;
  result: HeredityResult;
  onChangeParentA: (value: Genotype) => void;
  onChangeParentB: (value: Genotype) => void;
}

const options: { value: Genotype; label: string }[] = [
  { value: "BB", label: "BB — castanho dominante" },
  { value: "Bb", label: "Bb — castanho híbrido" },
  { value: "bb", label: "bb — azul recessivo" }
];

export const HeredityModule = ({
  parentA,
  parentB,
  result,
  onChangeParentA,
  onChangeParentB
}: ModuleProps) => {
  return (
    <GlassCard
      title="Módulo 3 — Hereditariedade"
      subtitle="Combine genes de dois indivíduos e observe as probabilidades de um descendente herdar olhos castanhos ou azuis."
      right={<span className="chip">Exemplo mendeliano</span>}
    >
      <div className="grid gap-6 xl:grid-cols-[.95fr_1.05fr]">
        <div className="space-y-5">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="label mb-3">Pai</p>
            <div className="grid gap-3">
              {options.map((option) => (
                <button
                  key={option.value}
                  className={`option-tile ${parentA === option.value ? "active" : ""}`}
                  onClick={() => onChangeParentA(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="label mb-3">Mãe</p>
            <div className="grid gap-3">
              {options.map((option) => (
                <button
                  key={option.value}
                  className={`option-tile ${parentB === option.value ? "active" : ""}`}
                  onClick={() => onChangeParentB(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="metric">
              <p className="label">Combinações</p>
              <p className="mt-2 text-sm text-white/85">{result.children.join(", ")}</p>
            </div>
            <div className="metric">
              <p className="label">Leitura rápida</p>
              <p className="mt-2 text-sm text-white/85">
                Alelos com B produzem fenótipo castanho. Somente bb gera olhos azuis.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="label">Probabilidades do filho</p>
            <div className="mt-4 grid gap-4 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
              <div className="max-w-[360px] justify-self-center">
                <ProbabilityChart brown={result.probabilities.brown} blue={result.probabilities.blue} />
              </div>
              <div className="space-y-3">
                <div className="metric">
                  <p className="label">Olhos castanhos</p>
                  <p className="mt-2 text-3xl font-black text-amber-300">{result.probabilities.brown}%</p>
                </div>
                <div className="metric">
                  <p className="label">Olhos azuis</p>
                  <p className="mt-2 text-3xl font-black text-sky-300">{result.probabilities.blue}%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-purple-300/20 bg-purple-400/10 p-5 text-sm leading-relaxed text-white/85">
            Demonstração educativa: este módulo usa um modelo simples de dominância e recessividade
            para facilitar a compreensão do visitante durante a feira.
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
