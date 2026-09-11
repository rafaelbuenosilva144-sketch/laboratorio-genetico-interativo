import { Download, RefreshCcw } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";
import { ReportSummary } from "../types/genetics";

export const ReportModule = ({
  summary,
  onRestart
}: {
  summary: ReportSummary;
  onRestart: () => void;
}) => {
  const finalPoint = summary.evolution[summary.evolution.length - 1];
  const mutationChanged = summary.mutation.original !== summary.mutation.current;

  const handlePrint = () => window.print();

  return (
    <GlassCard
      title="Relatório Genético do Visitante"
      subtitle="Resumo final da experiência no laboratório genético digital."
      right={<span className="chip">Tela final / certificado</span>}
    >
      <div className="grid gap-5">
        <div className="rounded-[28px] border border-cyan-300/20 bg-gradient-to-br from-cyan-400/10 to-purple-400/10 p-6">
          <p className="label">Código do organismo</p>
          <p className="mt-2 text-4xl font-black text-white">{summary.organism.code}</p>
          <p className="mt-3 max-w-3xl text-sm text-white/75">
            Experiência concluída com sucesso. O visitante explorou DNA, criou um organismo,
            simulou hereditariedade, observou mutações e acompanhou um processo evolutivo.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="metric">
            <p className="label">Perfil do organismo</p>
            <p className="mt-2 text-sm text-white/85">
              {summary.organism.eyeColor}, {summary.organism.hairType}, sangue {summary.organism.bloodType}
            </p>
          </div>
          <div className="metric">
            <p className="label">Hereditariedade</p>
            <p className="mt-2 text-sm text-white/85">
              {summary.heredity.probabilities.brown}% castanho • {summary.heredity.probabilities.blue}% azul
            </p>
          </div>
          <div className="metric">
            <p className="label">Mutação</p>
            <p className="mt-2 text-sm text-white/85">
              {mutationChanged ? `${summary.mutation.original} → ${summary.mutation.current}` : "Sem alteração aplicada"}
            </p>
          </div>
          <div className="metric">
            <p className="label">Evolução</p>
            <p className="mt-2 text-sm text-white/85">
              Ambiente: {summary.environment}. Resistentes ao fim: {finalPoint.resistant}%.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="lab-button" onClick={handlePrint}>
            <Download className="mr-2 h-4 w-4" />
            Imprimir relatório
          </button>
          <button className="secondary-button" onClick={onRestart}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Reiniciar experiência
          </button>
        </div>
      </div>
    </GlassCard>
  );
};
