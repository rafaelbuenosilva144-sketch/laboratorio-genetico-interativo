import { CreatorState } from "../../types/genetics";

const eyeColors = {
  Azul: "#60A5FA",
  Verde: "#34D399",
  Castanho: "#A16207"
} as const;

const hairPalette = {
  Liso: "#6B7280",
  Ondulado: "#7C3AED",
  Cacheado: "#111827"
} as const;

export const AvatarPreview = ({ state }: { state: CreatorState }) => {
  const hairShape =
    state.hairType === "Liso"
      ? "M30 34 Q60 10 90 34 L90 55 Q60 32 30 55 Z"
      : state.hairType === "Ondulado"
      ? "M25 38 Q35 20 45 34 Q60 12 75 34 Q88 18 95 40 L94 60 Q80 42 65 52 Q50 42 32 58 Z"
      : "M20 42 Q28 18 45 26 Q60 10 78 26 Q92 20 100 42 L95 62 Q80 46 64 56 Q48 44 25 60 Z";

  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="chip">Seu organismo criado</div>
      <svg viewBox="0 0 120 160" className="h-60 w-48">
        <defs>
          <linearGradient id="coat" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <path d={hairShape} fill={hairPalette[state.hairType]} />
        <circle cx="60" cy="63" r="28" fill="#f2c9a0" />
        <ellipse cx="50" cy="63" rx="4.5" ry="6" fill={eyeColors[state.eyeColor]} />
        <ellipse cx="70" cy="63" rx="4.5" ry="6" fill={eyeColors[state.eyeColor]} />
        <path d="M55 76 Q60 80 65 76" stroke="#9A3412" strokeWidth="2.2" fill="none" />
        <path d="M50 88 Q60 96 70 88" stroke="#9A3412" strokeWidth="2" fill="none" />
        <rect x="44" y="88" width="32" height="18" rx="12" fill="#f2c9a0" />
        <path d="M24 106 Q60 90 96 106 L106 156 H14 Z" fill="url(#coat)" />
        <circle cx="96" cy="26" r="12" fill="#F59E0B" opacity="0.85" />
        <path d="M91 26 L96 18 L101 26 L96 34 Z" fill="#fff" opacity="0.75" />
      </svg>
      <div className="grid w-full grid-cols-2 gap-3 text-sm">
        <div className="metric">
          <p className="label">Olhos</p>
          <p>{state.eyeColor}</p>
        </div>
        <div className="metric">
          <p className="label">Cabelo</p>
          <p>{state.hairType}</p>
        </div>
        <div className="metric">
          <p className="label">Sangue</p>
          <p>{state.bloodType}</p>
        </div>
        <div className="metric">
          <p className="label">Extra</p>
          <p>{state.specialTrait}</p>
        </div>
      </div>
    </div>
  );
};
