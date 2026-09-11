import {
  bloodGeneMap,
  creatorDefaults,
  eyeGeneMap,
  hairGeneMap,
  specialGeneMap
} from "../data/genetics";
import {
  CreatorState,
  Genotype,
  HeredityResult,
  MutationState,
  OrganismProfile
} from "../types/genetics";

const randomCode = () => `BIO-${Math.floor(100 + Math.random() * 900)}`;

export const buildOrganismProfile = (state: CreatorState): OrganismProfile => {
  const code = randomCode();

  return {
    ...state,
    code,
    genotypes: {
      eyes: eyeGeneMap[state.eyeColor],
      hair: hairGeneMap[state.hairType],
      blood: bloodGeneMap[state.bloodType],
      special: specialGeneMap[state.specialTrait]
    },
    explanation: [
      `Olhos ${state.eyeColor.toLowerCase()} associados ao genótipo ${eyeGeneMap[state.eyeColor]}.`,
      `Cabelo ${state.hairType.toLowerCase()} modelado com padrão ${hairGeneMap[state.hairType]}.`,
      `Grupo sanguíneo ${state.bloodType} representado como ${bloodGeneMap[state.bloodType]}.`,
      `A característica especial usa o marcador ${specialGeneMap[state.specialTrait]}.`
    ]
  };
};

const getGametes = (genotype: Genotype): string[] => genotype.split("");

const sortGenotype = (a: string, b: string) => {
  if (a === "B" || b === "B") {
    return [a, b].sort((left, right) => {
      if (left === right) return 0;
      if (left === "B") return -1;
      if (right === "B") return 1;
      return 0;
    }).join("");
  }
  return [a, b].sort().join("");
};

export const simulateHeredity = (parentA: Genotype, parentB: Genotype): HeredityResult => {
  const gametesA = getGametes(parentA);
  const gametesB = getGametes(parentB);

  const children = gametesA.flatMap((a) => gametesB.map((b) => sortGenotype(a, b)));
  const brownCount = children.filter((child) => child.includes("B")).length;
  const blueCount = children.length - brownCount;

  return {
    children,
    probabilities: {
      brown: Math.round((brownCount / children.length) * 100),
      blue: Math.round((blueCount / children.length) * 100)
    }
  };
};

const purines = new Set(["A", "G"]);
const pyrimidines = new Set(["C", "T"]);

export const mutateSequence = (state: MutationState): MutationState => {
  const chars = state.current.split("");
  chars[state.selectedIndex] = state.replacement;
  return { ...state, current: chars.join("") };
};

export const mutationAnalysis = (state: MutationState): string => {
  const before = state.original[state.selectedIndex];
  const after = state.current[state.selectedIndex];

  if (before === after) {
    return "Nenhuma mutação aplicada ainda. Selecione uma base e substitua por outra para observar o efeito.";
  }

  const transition =
    (purines.has(before) && purines.has(after)) ||
    (pyrimidines.has(before) && pyrimidines.has(after));

  return transition
    ? `Mutação do tipo transição: a base ${before} foi trocada por ${after}. Mudanças pequenas ainda podem alterar a leitura da informação genética.`
    : `Mutação do tipo transversão: a base ${before} foi trocada por ${after}. Mudanças mais bruscas podem modificar significativamente a proteína formada.`;
};

export const defaultMutationState = {
  original: "ATGCCGTA",
  current: "ATGCCGTA",
  selectedIndex: 3,
  replacement: "T" as const
};

export const defaultProfile = buildOrganismProfile(creatorDefaults);
