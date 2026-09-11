export type EyeColor = "Azul" | "Verde" | "Castanho";
export type HairType = "Liso" | "Ondulado" | "Cacheado";
export type BloodType = "A" | "B" | "AB" | "O";
export type SpecialTrait =
  | "Maior resistência"
  | "Pigmentação diferenciada"
  | "Variação genética";

export type EnvironmentType =
  | "Temperatura elevada"
  | "Presença de medicamento"
  | "Pouco alimento";

export interface CreatorState {
  eyeColor: EyeColor;
  hairType: HairType;
  bloodType: BloodType;
  specialTrait: SpecialTrait;
}

export interface OrganismProfile extends CreatorState {
  code: string;
  genotypes: {
    eyes: string;
    hair: string;
    blood: string;
    special: string;
  };
  explanation: string[];
}

export type Genotype = "BB" | "Bb" | "bb";

export interface HeredityResult {
  children: string[];
  probabilities: {
    brown: number;
    blue: number;
  };
}

export interface MutationState {
  original: string;
  current: string;
  selectedIndex: number;
  replacement: "A" | "T" | "C" | "G";
}

export interface EvolutionPoint {
  generation: number;
  resistant: number;
  sensitive: number;
}

export interface ReportSummary {
  organism: OrganismProfile;
  heredity: HeredityResult;
  mutation: MutationState;
  environment: EnvironmentType;
  evolution: EvolutionPoint[];
}
