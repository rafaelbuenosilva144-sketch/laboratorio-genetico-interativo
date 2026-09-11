import { GlassCard } from "../components/ui/GlassCard";
import { AvatarPreview } from "../components/creator/AvatarPreview";
import { CreatorState, OrganismProfile } from "../types/genetics";

interface ModuleProps {
  state: CreatorState;
  profile: OrganismProfile;
  onChange: (next: CreatorState) => void;
}

const tileClass = (active: boolean) => `option-tile ${active ? "active" : ""}`;

export const GeneticCreatorModule = ({ state, profile, onChange }: ModuleProps) => {
  const update = <K extends keyof CreatorState>(key: K, value: CreatorState[K]) =>
    onChange({ ...state, [key]: value });

  return (
    <GlassCard
      title="Módulo 2 — Criador Genético"
      subtitle="Escolha algumas características para montar um organismo virtual e observar seu perfil genético."
      right={<span className="chip">Avatar + lógica genética simulada</span>}
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_.9fr]">
        <div className="space-y-6">
          <div>
            <p className="label mb-3">Cor dos olhos</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {(["Azul", "Verde", "Castanho"] as const).map((option) => (
                <button
                  key={option}
                  className={tileClass(state.eyeColor === option)}
                  onClick={() => update("eyeColor", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="label mb-3">Tipo de cabelo</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {(["Liso", "Ondulado", "Cacheado"] as const).map((option) => (
                <button
                  key={option}
                  className={tileClass(state.hairType === option)}
                  onClick={() => update("hairType", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="label mb-3">Grupo sanguíneo</p>
            <div className="grid gap-3 sm:grid-cols-4">
              {(["A", "B", "AB", "O"] as const).map((option) => (
                <button
                  key={option}
                  className={tileClass(state.bloodType === option)}
                  onClick={() => update("bloodType", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="label mb-3">Característica especial</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {(
                ["Maior resistência", "Pigmentação diferenciada", "Variação genética"] as const
              ).map((option) => (
                <button
                  key={option}
                  className={tileClass(state.specialTrait === option)}
                  onClick={() => update("specialTrait", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="label">Explicação dos genes escolhidos</p>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {profile.explanation.map((line) => (
                <li key={line} className="rounded-2xl border border-white/8 bg-black/10 p-3">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <AvatarPreview state={state} />
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="label">Código do organismo</p>
            <p className="mt-2 text-2xl font-bold text-cyan-200">{profile.code}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="metric">
                <p className="label">Gene ocular</p>
                <p>{profile.genotypes.eyes}</p>
              </div>
              <div className="metric">
                <p className="label">Gene capilar</p>
                <p>{profile.genotypes.hair}</p>
              </div>
              <div className="metric">
                <p className="label">Gene sanguíneo</p>
                <p>{profile.genotypes.blood}</p>
              </div>
              <div className="metric">
                <p className="label">Gene extra</p>
                <p>{profile.genotypes.special}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
