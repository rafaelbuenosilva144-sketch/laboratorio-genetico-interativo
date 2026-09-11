import { motion } from "framer-motion";
import { GlassCard } from "../components/ui/GlassCard";
import { MutationState } from "../types/genetics";

interface ModuleProps {
  state: MutationState;
  analysis: string;
  onSelectIndex: (index: number) => void;
  onReplacement: (base: "A" | "T" | "C" | "G") => void;
  onApply: () => void;
  onReset: () => void;
}

export const MutationModule = ({
  state,
  analysis,
  onSelectIndex,
  onReplacement,
  onApply,
  onReset
}: ModuleProps) => {
  const bases = state.current.split("");

  return (
    <GlassCard
      title="Módulo 4 — Simulador de Mutações"
      subtitle="Escolha uma posição da sequência, altere a base nitrogenada e observe como uma pequena mudança pode modificar o organismo."
      right={<span className="chip">Sequência editável</span>}
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_.95fr]">
        <div className="space-y-5">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="label">Sequência original</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {state.original.split("").map((base, index) => (
                <span
                  key={`${base}-${index}-original`}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-lg font-bold"
                >
                  {base}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="label">Selecione a base que deseja editar</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {bases.map((base, index) => {
                const active = state.selectedIndex === index;
                const changed = state.original[index] !== state.current[index];

                return (
                  <button
                    key={`${base}-${index}-editable`}
                    className={[
                      "flex h-12 w-12 items-center justify-center rounded-2xl border text-lg font-bold transition",
                      active
                        ? "border-cyan-300/50 bg-cyan-400/15 text-cyan-100"
                        : "border-white/10 bg-black/20 text-white",
                      changed ? "ring-2 ring-purple-300/35" : ""
                    ].join(" ")}
                    onClick={() => onSelectIndex(index)}
                  >
                    {base}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="label">Nova base</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {(["A", "T", "C", "G"] as const).map((base) => (
                <button
                  key={base}
                  className={`option-tile ${state.replacement === base ? "active" : ""}`}
                  onClick={() => onReplacement(base)}
                >
                  {base}
                </button>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button className="lab-button" onClick={onApply}>
                Aplicar mutação
              </button>
              <button className="secondary-button" onClick={onReset}>
                Restaurar sequência
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="label">Animação da mudança</p>
            <div className="mt-4 flex min-h-[120px] items-center justify-center overflow-hidden rounded-3xl border border-cyan-300/15 bg-black/20 p-5">
              <motion.div
                key={`${state.current}-${state.selectedIndex}`}
                initial={{ scale: 0.7, opacity: 0.35, rotate: -8 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 180, damping: 15 }}
                className="flex items-center gap-2 text-2xl font-black tracking-[0.3em]"
              >
                {bases.map((base, index) => {
                  const changed = state.original[index] !== state.current[index];
                  return (
                    <span
                      key={`${index}-${base}`}
                      className={[
                        "flex h-12 w-12 items-center justify-center rounded-2xl border",
                        changed
                          ? "border-purple-300/35 bg-purple-400/15 text-purple-100"
                          : "border-white/10 bg-white/5 text-white"
                      ].join(" ")}
                    >
                      {base}
                    </span>
                  );
                })}
              </motion.div>
            </div>
          </div>

          <div className="rounded-3xl border border-purple-300/20 bg-purple-400/10 p-5 text-sm leading-relaxed text-white/85">
            {analysis}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="metric">
              <p className="label">Antes</p>
              <p className="mt-2 text-lg font-bold">{state.original}</p>
            </div>
            <div className="metric">
              <p className="label">Depois</p>
              <p className="mt-2 text-lg font-bold">{state.current}</p>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
