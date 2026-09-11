import { CreatorState, EnvironmentType, EvolutionPoint, SpecialTrait } from "../types/genetics";

export const creatorDefaults: CreatorState = {
  eyeColor: "Castanho",
  hairType: "Cacheado",
  bloodType: "O",
  specialTrait: "Maior resistência"
};

export const eyeGeneMap = {
  Castanho: "Bb",
  Azul: "bb",
  Verde: "Gb"
} as const;

export const hairGeneMap = {
  Liso: "ll",
  Ondulado: "Ll",
  Cacheado: "LL"
} as const;

export const bloodGeneMap = {
  A: "IAi",
  B: "IBi",
  AB: "IAIB",
  O: "ii"
} as const;

export const specialGeneMap: Record<SpecialTrait, string> = {
  "Maior resistência": "RR",
  "Pigmentação diferenciada": "PP",
  "Variação genética": "Vv"
};

export const environmentDescriptions: Record<EnvironmentType, string> = {
  "Temperatura elevada":
    "O ambiente quente favorece organismos com melhor estabilidade e maior tolerância ao estresse térmico.",
  "Presença de medicamento":
    "Organismos resistentes ao agente químico possuem maior sobrevivência ao longo das gerações.",
  "Pouco alimento":
    "A escassez favorece perfis com economia energética e maior eficiência de sobrevivência."
};

export const basePairs = [
  ["A", "T"],
  ["C", "G"],
  ["T", "A"],
  ["G", "C"],
  ["A", "T"],
  ["C", "G"],
  ["T", "A"],
  ["G", "C"],
  ["A", "T"],
  ["C", "G"],
  ["T", "A"],
  ["G", "C"]
] as const;

export const evolutionByEnvironment = (environment: EnvironmentType): EvolutionPoint[] => {
  const multipliers = {
    "Temperatura elevada": { resistant: 1.14, sensitive: 0.89 },
    "Presença de medicamento": { resistant: 1.18, sensitive: 0.82 },
    "Pouco alimento": { resistant: 1.12, sensitive: 0.88 }
  }[environment];

  let resistant = 22;
  let sensitive = 78;

  const points: EvolutionPoint[] = [{ generation: 1, resistant, sensitive }];

  for (let generation = 2; generation <= 10; generation += 1) {
    resistant *= multipliers.resistant;
    sensitive *= multipliers.sensitive;

    const total = resistant + sensitive;
    resistant = Number(((resistant / total) * 100).toFixed(1));
    sensitive = Number((100 - resistant).toFixed(1));

    points.push({ generation, resistant, sensitive });
  }

  return points;
};
