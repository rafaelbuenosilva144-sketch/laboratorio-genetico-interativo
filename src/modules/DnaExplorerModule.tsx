import { GlassCard } from "../components/ui/GlassCard";
import { DNAViewer } from "../components/dna/DNAViewer";

export const DnaExplorerModule = () => {
  return (
    <GlassCard
      title="Módulo 1 — Explorando o DNA"
      subtitle="Gire a molécula, aproxime, afaste e observe como as bases nitrogenadas formam a dupla hélice."
      right={<span className="chip">Modelo 3D interativo</span>}
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <DNAViewer />
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="label">Pareamento das bases</p>
            <div className="mt-4 space-y-3 text-sm text-white/85">
              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-4">
                <strong>Adenina (A)</strong> sempre se conecta com <strong>Timina (T)</strong>.
              </div>
              <div className="rounded-2xl border border-purple-300/20 bg-purple-400/10 p-4">
                <strong>Citosina (C)</strong> sempre se conecta com <strong>Guanina (G)</strong>.
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="metric">
              <p className="label">Ação sugerida</p>
              <p className="mt-2 text-sm text-white/85">Use o mouse ou toque para rotacionar e aproximar.</p>
            </div>
            <div className="metric">
              <p className="label">Objetivo</p>
              <p className="mt-2 text-sm text-white/85">Visualizar a estrutura da informação genética.</p>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
