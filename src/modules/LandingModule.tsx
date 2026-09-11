import { motion } from "framer-motion";
import { Dna, FlaskConical, Microscope, Sparkles } from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";

export const LandingModule = ({ onStart }: { onStart: () => void }) => {
  return (
    <GlassCard>
      <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
        <div className="space-y-5">
          <span className="chip">Experiência de museu científico</span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black leading-tight text-white md:text-6xl"
          >
            Laboratório
            <span className="block bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              Genético Interativo
            </span>
          </motion.h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
            Explore o código da vida com um DNA 3D, monte um organismo virtual, simule
            hereditariedade, observe mutações e acompanhe a evolução de uma população.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="lab-button" onClick={onStart}>
              Começar experiência
            </button>
            <button
              className="secondary-button"
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
            >
              Ver estrutura do projeto
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: Dna, title: "DNA 3D", text: "hélice interativa com rotação e zoom" },
              { icon: FlaskConical, title: "Mutações", text: "troca de bases e efeitos visuais" },
              { icon: Microscope, title: "Hereditariedade", text: "cruzamento e probabilidades" },
              { icon: Sparkles, title: "Evolução", text: "simulação por gerações" }
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <item.icon className="mb-3 h-5 w-5 text-cyan-300" />
                <p className="font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-sm text-white/65">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-cyan-400/25 to-purple-400/20 blur-2xl" />
          <div className="relative rounded-[32px] border border-cyan-200/15 bg-black/30 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="metric">
                <p className="label">Tempo médio</p>
                <p className="mt-2 text-xl font-bold">3–5 min</p>
              </div>
              <div className="metric">
                <p className="label">Formato</p>
                <p className="mt-2 text-xl font-bold">Notebook e tablet</p>
              </div>
              <div className="metric">
                <p className="label">Visual</p>
                <p className="mt-2 text-xl font-bold">HUD futurista</p>
              </div>
              <div className="metric">
                <p className="label">Aprendizado</p>
                <p className="mt-2 text-xl font-bold">Interativo</p>
              </div>
            </div>
            <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="label">Fluxo do visitante</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-white/80">
                <span className="chip">Entrada</span>
                <span>→</span>
                <span className="chip">DNA</span>
                <span>→</span>
                <span className="chip">Criador</span>
                <span>→</span>
                <span className="chip">Hereditariedade</span>
                <span>→</span>
                <span className="chip">Mutação</span>
                <span>→</span>
                <span className="chip">Evolução</span>
                <span>→</span>
                <span className="chip">Relatório</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
